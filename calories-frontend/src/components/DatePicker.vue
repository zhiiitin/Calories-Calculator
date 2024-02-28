<template>
  <v-menu
    ref="menu"
    v-model="menuActive"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
    offset-y
  >
    <template v-slot:activator="{ props }"> 
      <v-text-field
        v-model="_selectedDate"
        readonly
        label="出生日期"
        prepend-inner-icon="mdi-calendar"
        v-bind="props"
        variant="outlined"
        density="comfortable"
      >
      </v-text-field>
    </template>
    <v-date-picker
      v-model="selectedDate"
      @update:modelValue="updateDate()"
      :hide-header="true"
      color="grey-lighten-2"
      elevation="12"
      header="出生日期"
      viewMode="year"
      rounded="lg"
      :max="
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
      "
      min="1950-01-01"
    >
    </v-date-picker>
  </v-menu>
</template>
<script setup>
import { ref, computed, toRefs } from "vue";
import dayjs from 'dayjs'

const props = defineProps({
    selectedDate : {
        type: String,
        default: '',
    }
})

const emit = defineEmits(['update:selectedDate'])

const selectedDate = ref();
const _selectedDate = computed(() => selectedDate.value ? dayjs(selectedDate.value).format('YYYY-MM-DD') : '');

const menuActive = ref(false);

const updateDate = () => {
    menuActive.value = false
    const updatedDate = _selectedDate.value; 
    emit('update:selectedDate', updatedDate) 
};

</script>
<style></style>
