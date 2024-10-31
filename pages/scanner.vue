<script setup lang="ts">
import type { Html5QrcodeResult } from "html5-qrcode/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

definePageMeta({
  middleware: [ 'auth' ],
  requiresAuth: true
});

const scanResult = ref('Nothing scan or something went to shit... We never know')
const showScanner = ref(false)

function onScan(decodedText: string, decodedResult: Html5QrcodeResult) {
  scanResult.value = decodedText
}

function toggleScan() {
  showScanner.value = !showScanner.value
}
</script>

<template>
  <div class="scanner-page mt-5 grid place-items-center gap-5">
    <div class="camera-header h-12 grid grid-cols-4 place-items-center w-[300px]">
      <div class="col-span-3 justify-self-start text-2xl font-bold">
        Scan a Barcode
      </div>
      <div class="col justify-self-end">
        <Button size="icon" @click="toggleScan">X</Button>
      </div>
    </div>
    <ClientOnly>
      <code-scanner
          :qrbox="200"
          :fps="10"
          style="width: 300px;height: 300px;"
          @result="onScan"
          v-if="showScanner"
      />
      <div
          class="scanner-placeholder rounded-xl shadow-2xl bg-gray-400 text-center text-2xl grid place-items-center p-3"
          v-else>
        {{ scanResult }}
      </div>
    </ClientOnly>
    <div class="article-options grid gap-4 p-4 rounded-xl shadow-2xl bg-neutral-100">

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
          <Input id="amount" type="Number" placeholder="1"/>
        </div>
      </div>
      <div class="save-container ">
        <Button class="w-full">Save Item</Button>
      </div>
    </div>
  </div>

</template>

<style scoped>
.scanner-placeholder {
  width: 300px;
  height: 300px;
}

</style>