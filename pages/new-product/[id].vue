<script setup lang="ts">
import FooterNavigation from "~/components/FooterNavigation.vue";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '~/components/ui/number-field'

import { toast } from '~/components/ui/toast'
import { Label } from "~/components/ui/label";
import createNewDbItem from "~/utils/database/createNewDbItem";
import updateDocument from "~/utils/database/updateDocument";

const route = useRoute()
const product_id: string = route.params.id

let productData = ref({
  name: '',
  amount: 1,
  ean: ''
})


const getProductData = (async () => {
  const data: any = await getProductOpenFoodApi(product_id)
  if (data.status === 'failure') {
    toast({
      title: 'Error',
      description: `${ data.result.name }`,
      variant: "destructive"
    })
    return
  }
  return data
})

getProductData().then((data) => {
  productData.value.name = data.product.product_name + ' ' + data.product.product_quantity + ' ' + data.product.product_quantity_unit
  productData.value.ean = data.code
})

async function handleSave() {

  if (productData.value.name.length < 1) {
    toast({
      title: 'Error',
      description: `No name provided`,
      variant: "destructive"
    })
    return
  }

  if (productData.value.ean.length < 1) {
    toast({
      title: 'Error',
      description: `No EAN-Code provided`,
      variant: "destructive"
    })
    return
  }


  try {
    await createNewDbItem(productData.value)
        .then((res) => {
          console.log(res)
          toast({
            title: 'New Item added!',
            description: `${res.name} was added`,
            variant: "success"
          })
        });
  } catch (error) {
    toast({
      title: 'ERROR',
      description: `${ error }`,
      variant: "destructive"
    })
  }
}


</script>

<template>
  <div class="flex flex-col place-items-center gap-2 variable-container mt-1">
    <PageHeader title="Add new Product" :show-abort="true"/>
    <div class="new-product grid justify-center w-[300px] gap-3 mt-5">
      <p class="w-full">
        <Label for="name">Name</Label>
        <Input id="name" type="text" placeholder="Milch 1l" v-model="productData.name" class="w-full"/>
      </p>
      <p>
        <Label for="amount">Amount</Label>
        <NumberField id="amount" :default-value="1" :min="1" v-model="productData.amount">
          <NumberFieldContent>
            <NumberFieldDecrement/>
            <NumberFieldInput/>
            <NumberFieldIncrement/>
          </NumberFieldContent>
        </NumberField>
      </p>
      <p>
        <Label for="ean">EAN-Code</Label>
        <Input id="ean" type="text" placeholder="13-digits" v-model="productData.ean"/>
      </p>
      <Button @click="handleSave">
        Submit
      </Button>
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