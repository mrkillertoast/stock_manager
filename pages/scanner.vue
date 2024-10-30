<script setup lang="ts">
import type { Html5QrcodeResult } from "html5-qrcode/core";

const scanResult = ref('')

function onScan(decodedText: string, decodedResult: Html5QrcodeResult) {
  scanResult.value = decodedText
}
</script>

<template>
  <ClientOnly>
    {{ scanResult }}
    <code-scanner
        :qrbox="200"
        :fps="10"
        style="width: 300px;"
        @result="onScan"
    />
  </ClientOnly>
</template>

<style scoped>

</style>