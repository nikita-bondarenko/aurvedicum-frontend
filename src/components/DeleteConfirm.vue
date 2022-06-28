<template lang="pug">
BaseModal(v-model:open="isOpen")
  .form
    h3.form__title {{ text }}
    PrimeBtn.button-delete(@click="confirm") Да
    SubBtn.button-cancel(@click="close") Отмена
</template>
<script setup>
/* eslint-disable no-unused-vars */
import PrimeBtn from '@/components/PrimeBtn.vue'
import SubBtn from '@/components/SubBtn.vue'
import BaseModal from './BaseModal.vue'
import { defineProps, defineEmits, computed } from 'vue'
const props = defineProps(['text', 'open'])
const emit = defineEmits(['update:open', 'yes'])
const isOpen = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  }
})
const close = () => {
  isOpen.value = false
}
const confirm = () => {
  emit('yes')
  close()
}
</script>
<style lang="scss"></style>
