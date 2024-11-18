<script setup lang="ts">

import { Routes } from "~/enums/RoutesEnum";

const router = useRouter()

function navigateTo(to: string) {
  router.push(to)
}

</script>

<template>
  <div class="footer container h-16 w-full sticky bottom-0 border-t-2 bg-neutral-200">
    <div class="grid grid-cols-3 gap-2 justify-items-center content-center h-full">
      <div class="col h-full grid place-self-center" @click="navigateTo(Routes.OVERVIEW)">
        <Icon name="material-symbols:stockpot-outline" size="2rem"/>
      </div>
      <div class="col" @click="navigateTo(Routes.RECIPE_GENERATION)">
        <Button>
          <Icon name="material-symbols-light:add-circle-outline-rounded" size="2rem"/>
        </Button>
      </div>
      <div class="col">
        <Icon name="material-symbols:document-scanner-outline" size="2rem" @click="navigateTo(Routes.SCANNER)"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>