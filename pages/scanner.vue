<script setup lang="ts">
import type { Html5QrcodeResult } from "html5-qrcode/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Query } from "appwrite";

definePageMeta({
  middleware: [ 'auth' ],
  requiresAuth: true
});

const scanResult = ref('Nothing scan or something went to shit... We never know')

async function onScan(decodedText: string, decodedResult: Html5QrcodeResult) {
  scanResult.value = decodedText
  const res = await getProduct(decodedText)
  console.log(res)
}

async function handleData (){}

//get Data from API
const { $appwrite } = useNuxtApp();

const getProduct = async (eanToFind: string) => {
  let promise = $appwrite.databases.listDocuments("671fe58d001e645a7db6", "671fe5aa0019b0178339", [ Query.equal('ean', eanToFind) ])
  promise.then(function (response) {
    return response
  }, function (error) {
    console.log(error);
  });
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
                <Input id="ean-search" type="text" placeholder="Enter EAN-Number"/>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ClientOnly>
    </section>
    <section class="article-options grid gap-4 p-4 rounded-xl shadow-2xl bg-neutral-100">
      <div class="mode-switcher">
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
        <div class="grid w-[268px] items-center gap-1.5">
          <Label for="amount">Amount</Label>
          <Input id="amount" type="Number" placeholder="Enter Amount"/>
        </div>
      </div>
      <div class="save-container ">
        <Button class="w-full">Save Item</Button>
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