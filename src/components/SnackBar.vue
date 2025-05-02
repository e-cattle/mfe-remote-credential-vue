<template>
  <v-snackbar v-model="snackbar" :color="color" vertical>
    <div class="text-subtitle-1 pb-2">{{ title }}</div>

    <p>{{ text }}</p>

    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar = false"> Fechar </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  text: String,
  color: String,
  modelValue: { type: Boolean, required: true }
})
const snackbar = ref(props.modelValue)
</script>
