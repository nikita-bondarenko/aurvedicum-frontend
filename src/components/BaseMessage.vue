<template lang="pug">
BaseModal(v-model:open="isOpen")
  .error(v-if="type === 'error'") {{text}}
  .good-message(v-else) {{text}}
</template>
<script setup>
/* eslint-disable no-unused-vars */
import BaseModal from './BaseModal.vue'
import { defineProps, defineEmits, computed, watch, onMounted } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'error'
  }
})
const emit = defineEmits(['update:open'])
const isOpen = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
    return value
  }
})
</script>
<style lang="scss"></style>
