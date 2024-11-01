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
import findEanInDB from "~/utils/database/findEanInDB";
import updateDocument from "~/utils/database/updateDocument";
import { useToast } from "~/components/ui/toast";
import PageHeader from "~/components/PageHeader.vue";
import { Routes } from "~/enums/RoutesEnum";

definePageMeta({
  middleware: [ 'auth' ],
  requiresAuth: true
});

const { toast } = useToast()
const router = useRouter()

const scanResult = ref('')
const tabAddRemove = ref('add')
const newAmount = ref(0)

async function onScan(decodedText: string, decodedResult: Html5QrcodeResult) {
  scanResult.value = decodedText
}

async function handleData() {
  const res = await findEanInDB(scanResult.value)

  if (res?.total === 0) {
    await router.push(`${ Routes.NEW_ITEM }/${ scanResult.value }`)
    return
  }

  if (res?.total > 1) {
    toast({
      title: 'Error',
      description: `Database contains more than 1 document with this EAN Code`,
      variant: "destructive"
    })
    return
  }

  const document = res.documents[ 0 ];

  let amount = document.amount
  switch (tabAddRemove.value) {
    case 'add':
      amount = amount + newAmount.value
      break
    case 'remove':
      amount = amount - newAmount.value
      break
  }

  if (amount < 0) {
    amount = 0
    toast({
      title: 'Amount Changed',
      description: `The amount was changed to 0`,
      variant: "default"
    })
  }

  try {
    await updateDocument(document.$id, { 'amount': amount })
        .then((res) => {
          console.log(res)
          toast({
            title: 'Change successful',
            description: `Database was updated new amount ${ res.amount }`,
            variant: "success"
          })
        });
  } catch (error) {
    console.log(error)
    toast({
      title: 'ERROR',
      description: `${ error }`,
      variant: "destructive"
    })
  }
}


</script>

<template>
  <div class="scanner-page grid place-items-center gap-0 variable-container">
    <PageHeader title="Scan Barcode"/>
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
                :qrbox="150"
                :fps="10"
                style="width: 300px;height: 400px;"
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
        <Tabs v-model="tabAddRemove" class="w-[268px] shadow rounded-xl">
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
        <NumberField id="amount" :default-value="0" v-model="newAmount">
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
  height: 400px;
}

.variable-container {
  height: calc(100dvh - 4rem);
  overflow: auto;
}

</style>