<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true
});

/*
const getProducts = async () => {
  let promise = databases.listDocuments("671fe58d001e645a7db6", "671fe5aa0019b0178339")
  promise.then(function (response) {
    products.value = response.documents
    console.log(response);
  }, function (error) {
    console.log(error);
  });
}*/


</script>

<template>
  <h1 class="text-center text-2xl">Stock Overview</h1>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Invoice
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Menge</TableHead>
        <TableHead class="text-right">
          Amount
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium">
          INV001
        </TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell class="text-right">
          $250.00
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style scoped>

</style>