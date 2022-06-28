<template lang="pug">
div(style=" display: flex;justify-content: center;flex-direction: column;")
  .form__gallery#gallery(v-if="field === 'images'")
  ul.form__list
    FormMultiItem(  v-for="item in items" :id="item.id" :key="item.id"  v-model:list="items" :field="field" )
  SubBtn(v-if="!isSubdivision" v-show="items.length <= itemLimit"  @click="addItem" :text="btnText")
  SmallBtn(v-else @click="addItem" v-show="items.length < itemLimit" :text="btnText")

</template>
<script setup>
/* eslint-disable no-unused-vars */
import FormMultiItem from '@/components/form/FormMultiItem.vue'
import { reactive, ref, defineEmits, defineProps, watch, computed } from 'vue'

import SubBtn from '@/components/SubBtn.vue'
import SmallBtn from '@/components/SmallBtn.vue'

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  field: String,
  btnText: String,
  modelValue: {
    default: []
  },
  isSubdivision: {
    type: Boolean,
    default: false
  },
  itemLimit: {
    type: Number,
    default: 10
  }

})
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
</script>
<style lang="SCSS"></style>
