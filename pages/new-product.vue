<script setup lang="ts">
import FooterNavigation from "~/components/FooterNavigation.vue";
import { Form } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { vAutoAnimate } from '@formkit/auto-animate/vue'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

import { toast } from '@/components/ui/toast'

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  amount: z.number().min(1),
  ean: z.string().min(13)
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})


const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})


</script>

<template>
  <div class="flex flex-col place-items-center gap-2 variable-container mt-1">
    <PageHeader title="Add new Product" :show-abort="true"/>
    <div class="new-product grid justify-center">
      <form class="w-[300px] space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Product name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Milch 1l" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="amount">
          <FormItem v-auto-animate>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <NumberField id="amount" :default-value="0" v-bind="componentField">
                <NumberFieldContent>
                  <NumberFieldDecrement/>
                  <NumberFieldInput/>
                  <NumberFieldIncrement/>
                </NumberFieldContent>
              </NumberField>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="ean">
          <FormItem v-auto-animate>
            <FormLabel>EAN-Code</FormLabel>
            <FormControl>
              <Input type="text" placeholder="13-digits" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
        <Button type="submit">
          Submit
        </Button>
      </form>
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