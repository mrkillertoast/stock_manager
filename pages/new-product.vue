<script setup lang="ts">

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Search } from "lucide-vue-next";
import FooterNavigation from "~/components/FooterNavigation.vue";
</script>

<template>
  <div class="grid place-items-center gap-0 variable-container">
    <PageHeader title="Add new Product" :show-abort="true"/>
    <div class="new-product grid justify-center">
    </div>
  </div>
  <FooterNavigation/>
</template>

<style scoped>
.variable-container {
  height: calc(100dvh - 4rem);
  overflow: auto;
}

</style>