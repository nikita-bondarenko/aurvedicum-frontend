<template lang="pug">
div.form__block
  FormInput( :placeholder-text="'Введите заголовок'"
v-model.trim="descData.header")
  FormTextarea( :placeholder-text="'Введите текст'"
v-model.trim="descData.text" )
  DeleteButton.form__close( v-if="list.length > 1" @click="deleteItem" )

</template>
<script setup>
/* eslint-disable no-unused-vars */
import { reactive, ref, defineProps, defineEmits, watch } from 'vue'
import FormInput from '@/components/form/FormInput.vue'
import FormTextarea from '@/components/form/FormTextarea.vue'
import DeleteButton from '@/components/DeleteButton.vue'

const emit = defineEmits(['update:list'])
const props = defineProps(['list', 'id'])
const descData = props.list.find((item) => item.id === props.id)
const index = props.list.indexOf(descData)

const deleteItem = () => {
  const list = props.list

  list.splice(index, 1)
  emit('update:list', list)
}

watch(
  () => Object.assign({}, descData),
  () => {
    const list = props.list

    list.splice(index, 1, descData)
    emit('update:list', list)
  }
)
</script>
<style lang="scss"></style>
