<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const props = defineProps({
  options: {
    type: Array<string>,
    required: true,
    default: ['Option1','Option2','Option3']
  }
})
const selected = ref('option1')
</script>

<template>
  <RadioGroup v-model="selected" class="custom-switch">
    <div class="flex space-x-1 p-1 bg-gray-200 rounded-full">
      <Label
          v-for="option in props.options"
          :key="props.options.indexOf(option)"
          :for="option"
          class="flex items-center justify-center w-1/3 py-2 rounded-full cursor-pointer transition-colors"
          :class="{ 'bg-white shadow-sm': selected === option }"
      >
        <RadioGroupItem :value="option" :id="option" class="sr-only"/>
        {{ option }}
      </Label>
    </div>
  </RadioGroup>
</template>

<style scoped>
.custom-switch {
  display: inline-block;
  ;
}
</style>