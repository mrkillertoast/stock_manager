<script setup lang="ts">
import { Routes } from "~/enums/RoutesEnum";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showAbort: Boolean
})

const router = useRouter()

</script>

<template>
  <section class="camera-header h-12 grid grid-cols-4 content-center w-[300px]">
    <div class="text-2xl font-bold col-span-3">
      {{ props.title }}
    </div>
    <div class="abort-button place-self-end" v-show="props.showAbort">
      <Button size="icon" @click="router.push(Routes.OVERVIEW)">X</Button>
    </div>
  </section>
</template>

<style scoped>

</style>