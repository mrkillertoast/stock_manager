<script setup lang="ts">
import type { Html5QrcodeResult } from "html5-qrcode/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Query } from "appwrite";
import type { Ref } from "vue";
import type { IStockItem } from "~/interfaces/IStockItem";

definePageMeta({
  middleware: [ 'auth' ],
  requiresAuth: true
});

const scanResult = ref('')

async function onScan(decodedText: string, decodedResult: Html5QrcodeResult) {
  scanResult.value = decodedText
}

async function handleData() {
  const res = await getProduct(scanResult.value)

  if(res?.total === 0){
    //TODO: Add function to get from Openfood API
  }

  if(res?.total > 1){
    //TODO: ADD Toast: "ERROR: More than one item found"
  }


  //TODO: Implement function on chase that only 1 is found.

}

//get Data from API
const { $appwrite } = useNuxtApp();

const getProduct = async (eanToFind: string) => {
  return $appwrite.databases.listDocuments("671fe58d001e645a7db6", "671fe5aa0019b0178339", [ Query.equal('ean', eanToFind) ])
}


</script>

<template>
  <div class="scanner-page grid place-items-center gap-0 variable-container">
    <section class="camera-header h-12 grid place-items-center w-[300px]">
      <div class="text-2xl font-bold">
        Scan a Barcode
      </div>
    </section>
    <section class="camera-body">
      <ClientOnly>
        <Tabs default-value="camera" class="w-[300px] shadow rounded-xl">
          <TabsList class="w-full">
            <TabsTrigger value="camera" class="w-full">
              Camera
            </TabsTrigger>
            <TabsTrigger value="manual" class="w-full">
              Manual
            </TabsTrigger>
          </TabsList>
          <TabsContent value="camera">
            <code-scanner
                :qrbox="200"
                :fps="10"
                style="width: 300px;height: 300px;"
                @result="onScan"
            />
          </TabsContent>
          <TabsContent value="manual">
            <div
                class="scanner-placeholder rounded-xl shadow-2xl bg-gray-400 text-center text-2xl grid place-items-center p-3">
              <div class="manual-search">
                <Label for="ean-search" class="align-self-start">EAN-Search</Label>
                <Input id="ean-search" type="text" placeholder="Enter EAN-Number" v-model="scanResult"/>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ClientOnly>
    </section>
    <section class="article-options grid gap-4 p-4 rounded-xl shadow-2xl bg-neutral-100">
      <div class="mode-switcher">
        <div class="ean-code">
          <Label for="found-ean" class="align-self-start">EAN-Code</Label>
          <Input disabled id="found-ean" type="text" placeholder="Enter code or scan using cam" v-model="scanResult"/>
        </div>
        <br>
        <Tabs default-value="add" class="w-[268px] shadow rounded-xl">
          <TabsList class="w-full">
            <TabsTrigger value="add" class="w-full">
              Add
            </TabsTrigger>
            <TabsTrigger value="remove" class="w-full">
              Remove
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div class="amount-selector">
        <NumberField id="amount" :default-value="0">
          <Label for="amount">Amount</Label>
          <NumberFieldContent>
            <NumberFieldDecrement/>
            <NumberFieldInput/>
            <NumberFieldIncrement/>
          </NumberFieldContent>
        </NumberField>
      </div>
      <div class="save-container ">
        <Button class="w-full" @click="handleData">Save Item</Button>
      </div>
    </section>
  </div>
  <FooterNavigation/>
</template>

<style scoped>
.scanner-placeholder {
  width: 300px;
  height: 300px;
}

.variable-container {
  height: calc(100dvh - 4rem);
  overflow: auto;
}

</style>