<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search } from 'lucide-vue-next'
import type { Ref } from "vue";
import type { IStockItem } from "~/interfaces/IStockItem";
import type { Models } from "appwrite";

definePageMeta({
  middleware: [ 'auth' ],
  requiresAuth: true
});

const { $appwrite } = useNuxtApp();
const products: Ref<IStockItem[] | undefined[]> = ref([])

const getProducts = async () => {
  let promise = $appwrite.databases.listDocuments("671fe58d001e645a7db6", "671fe5aa0019b0178339")
  promise.then(function (response) {
    products.value = response.documents.map((doc: Models.Document): IStockItem => {
      return { $id: doc.$id, name: doc.name, amount: doc.amount, ean: doc.ean };
    })
  }, function (error) {
    console.log(error);
  });
}

getProducts()

const searchString: Ref<string> = ref('')

const filteredItems = computed(() => {
  return products.value.filter((item: IStockItem | undefined) => {
    return item?.name.toLowerCase().match(searchString.value.toLowerCase());
  })
})


</script>

<template>
  <div class="container">
    <div class="page-header m-3">
      <h1 class="text-center text-3xl font-bold">Stock Overview</h1>
    </div>
    <div class="search-container">

      <div class="relative w-full max-w-sm items-center">
        <Input id="search" type="text" placeholder="Search Product" class="pl-10" v-model="searchString"/>
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Search class="size-6 text-muted-foreground"/>
        </span>
      </div>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in filteredItems" :key="item?.$id">
          <TableCell>{{ item?.name }}</TableCell>
          <TableCell>{{ item?.amount }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped>

</style>
