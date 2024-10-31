<script setup lang="ts">
import type { Html5QrcodeResult } from "html5-qrcode/core";

definePageMeta({
  middleware: [ 'auth' ],
  requiresAuth: true
});

const scanResult = ref('')

function onScan(decodedText: string, decodedResult: Html5QrcodeResult) {
  scanResult.value = decodedText
}
</script>

<template>
  <ClientOnly>
    {{ scanResult }}
    <!--<code-scanner
        class="scanner-bo"
        :qrbox="200"
        :fps="10"
        style="width: 300px;height: 300px"
        @result="onScan"
    />-->
    <div class="camera-area"></div>
  </ClientOnly>
</template>

<style scoped>
.camera-area {
  width: 300px;
  height: 300px;
  background-color: #0047e1;
}

</style>