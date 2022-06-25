<template lang="pug">
div(style=" display: flex;justify-content: center;flex-direction: column;")
  .form__gallery#gallery(v-if="field === 'images'")
  ul.form__list
    FormMultiItem(  v-for="(item, index) in items" v-model:is-delete-hover="isDeleteHover" :id="item.id" :key="item.id"  v-model:list="items" :field="field" )
  SubBtn(  @click="addItem" :text="btnText")
</template>
<script setup>
/* eslint-disable no-unused-vars */
import FormMultiItem from '@/components/form/FormMultiItem.vue'
import { reactive, ref, defineEmits, defineProps, watch, computed } from 'vue'

import SubBtn from '@/components/SubBtn.vue'

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps(['field', 'btnText', 'modelValue'])
const items = ref([])
const addItem = () => {
  const id =
    items.value.reduce((acc, item) => (item.id > acc ? item.id : acc), 0) + 1
  const item = reactive({ id })
  items.value.push(item)
}
props.modelValue.forEach((item) => items.value.push(item))

watch(
  () => items.value,
  (value, oldValue) => {
    emit('update:modelValue', items.value)
    emit('change')
  },
  { deep: true }
)

const isDeleteHover = ref(false)
</script>
<style lang="SCSS"></style>
