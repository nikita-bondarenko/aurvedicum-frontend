<template lang="pug">
FormField(:label-text="'Информация о товаре'" ref="parentElement")
  ul
    li( v-for="(item, index) in descArray" )
      FormDescription(  :id="item.id" :key="item.id"
   v-model:list="descArray")

  button( v-if="descArray.length < 11" type="button" @click="addDesc") Добавить описание
</template>
<script setup>
/* eslint-disable no-unused-vars */
import FormDescription from '@/components/form/FormDescription.vue'
import FormField from '@/components/form/FormField.vue'
import { reactive, ref, defineEmits, watch, computed } from 'vue'
const emit = defineEmits(['update:modelValue'])
const descArray = ref([])
const addDesc = () => {
  const id =
    descArray.value.reduce((acc, item) => (item.id > acc ? item.id : acc), 0) +
    1
  console.log(id)
  const desc = reactive({ text: '', header: '', id })
  descArray.value.push(desc)
}

watch(descArray.value, (value, oldValue) => {
  emit('update:modelValue', descArray.value)
})

const value = (id) =>
  computed({
    get() {
      this.item = descArray.value.find((item) => item.id === id)
      return this.item
    },
    set(value) {
      const index = descArray.value.indexOf(this.item)
      descArray.value[index] = value
    }
  })
addDesc()
</script>
<style lang="SCSS"></style>
