<script setup lang="ts">
import { Html5Qrcode, Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import type { Html5QrcodeError, Html5QrcodeResult } from "html5-qrcode/core";

const props = defineProps({
  qrbox: {
    type: Number,
    default: 250
  },
  fps: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits([ 'result' ])
let html5QrCode: Html5Qrcode

function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
  console.log(decodedResult)
  emit('result', decodedText, decodedResult);
  html5QrCode.stop()
}

function handleError(errorMessage: string,) {
  console.log(errorMessage)
  //todo: Add proper Error handling
}

onMounted(() => {
  const config = {
    fps: props.fps,
    qrbox: props.qrbox,
    rememberLastUsedCamera: true,
    supportedScanTypes: [ Html5QrcodeScanType.SCAN_TYPE_CAMERA ],
    useBarCodeDetectorIfSupported: true
  };

  html5QrCode = new Html5Qrcode("qr-code-full-region");
  html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, handleError);
})

</script>

<template>
  <div id="qr-code-full-region"></div>
</template>

<style scoped>

</style>