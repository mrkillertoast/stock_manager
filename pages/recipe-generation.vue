<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { Label } from '@/components/ui/label'
import PageHeader from "~/components/PageHeader.vue";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import ThreeOptionSwitch from "~/components/ui/ThreeOptionSwitch.vue";

const mode = ref('new')
const portionSize = ref(2)
const cookingTime = ref(30)

//Cooking Experience Handling
const cookingExperienceOptions = [ 'Easy', 'Medium', 'Hard' ]
const cookingExperience = ref(0)

</script>

<template>
  <div class="scanner-page grid place-items-center gap-0 variable-container">
    <PageHeader title="Recipe Generation"/>
    <Card class="bg-neutral-100 shadow-2xl w-96 p-4">
      <CardHeader>
        <CardTitle>Recipe Generation</CardTitle>
        <CardDescription>What do we create today?</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="article-options">
          <div class="mode-switcher">
            <div class="ean-code">
              <Label for="found-ean" class="align-self-start">Generation Mode</Label>
              <Tabs v-model="mode" class="shadow rounded-xl">
                <TabsList class="w-full">
                  <TabsTrigger value="new" class="w-full">
                    New Recipe
                  </TabsTrigger>
                  <TabsTrigger value="stock" class="w-full">
                    Create from stock
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        <NumberField id="amount" :default-value="0" v-model="portionSize" class="gird grid-cols-2 items-center mt-3">
          <Label for="amount">Desired portion-size</Label>
          <NumberFieldContent>
            <NumberFieldDecrement/>
            <NumberFieldInput/>
            <NumberFieldIncrement/>
          </NumberFieldContent>
        </NumberField>
        <NumberField id="amount" :default-value="0" v-model="cookingTime" class="gird grid-cols-2 items-center mt-2">
          <Label for="amount">Desired Cooking Time (min)</Label>
          <NumberFieldContent>
            <NumberFieldDecrement/>
            <NumberFieldInput/>
            <NumberFieldIncrement/>
          </NumberFieldContent>
        </NumberField>
        <div class="flex flex-col mt-2">
          <Label for="cooking-experience">Cooking Experience</Label>
          <ThreeOptionSwitch id="cooking-experience" :options="cookingExperienceOptions" v-model="cookingExperience"/>
        </div>
        <div class="excluded-nutrients mt-2 flex flex-col">
          <Label for="cooking-experience">Select Diet</Label>
          <p>Placeholder</p>
        </div>
        <div class="additional-prompt">
          <Label for="additional-notes">Additional notes / remarques </Label>
          <Textarea id="additional-notes" class="w-full rounded-2xl p-1 text-sm"
                    placeholder="ex. I would like something fruity."/>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Create Recipe</Button>
      </CardFooter>
    </Card>
  </div>
  <FooterNavigation/>
</template>

<style scoped>
.variable-container {
  height: calc(100dvh - 4rem);
  overflow: auto;
}

</style>