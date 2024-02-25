<template>
  <v-card
    class="mx-auto"
    height="150"
    rounded="lg"
    color="blue-grey-lighten-4"
    variant="flat"
    hover
    :style="isSelected ? 'border : 3px solid #616161' : ''"
    :elevation="isSelected ? 8 : 0"
  > 
    <v-img class="mt-5" height="45" :src="data.imagePath"></v-img>
    <v-card-title
      >{{ data.title }}
      <v-tooltip  location="bottom"  width="250" :text="data.content">
        <template v-slot:activator="{ props }">
            <v-icon :size=17 v-bind="props" color="grey-darken-2" icon="mdi-information-outline">
            </v-icon>
        </template>
      </v-tooltip>
    </v-card-title>

    <v-card-subtitle>{{ data.subTitle }}</v-card-subtitle>
    <v-card-text>
      <div>{{ data.content }}</div>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

const { data,isSelected } = toRefs(props)

console.log(data)
</script>
<style>
</style>
