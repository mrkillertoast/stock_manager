<script setup lang="ts">
const scanResult = ref('')

function onScan(decodedText, decodedResult) {
  console.log(decodedText)
  scanResult.value = decodedText
}
</script>

<template>
  <ClientOnly>
    {{ scanResult }}
    <code-scanner
        :qrbox="250"
        :fps="10"
        style="width: 500px;"
        @result="onScan"
    />
  </ClientOnly>
</template>

<style scoped>

</style>