<script setup lang="ts">
import { Html5QrcodeScanner } from "html5-qrcode";
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

function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
  emit('result', decodedText, decodedResult);
}

function handleError(errorMessage: string, error: Html5QrcodeError) {
  console.log(errorMessage)
}

onMounted(() => {
  const config = {
    fps: props.fps,
    qrbox: props.qrbox,
  };
  const scanner = new Html5QrcodeScanner('qr-code-full-region', config, true)
  scanner.render(onScanSuccess, handleError);
})
</script>

<template>
  <div id="qr-code-full-region"></div>
</template>

<style scoped>

</style>