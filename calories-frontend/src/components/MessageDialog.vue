<template>
    <div>
      <v-dialog
        v-model="visible"
        width="500"
      >
        <v-card
          :title="title"
          color="#FCFCFC"
          rounded="lg"
          elevation="24"
        >
          <v-card-text>
            {{ message }}
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn
              text="關閉"
              @click="closeDialog"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:visible']);

const { title, visible, message } = toRefs(props);

const closeDialog = () => {
  emit('update:visible', false);
};

</script>
  <style>
  </style>
