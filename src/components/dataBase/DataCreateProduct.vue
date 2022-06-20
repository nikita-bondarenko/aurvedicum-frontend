<template lang="pug">
h2.modal__header Создание нового товара
form.form( @submit.prevent="sendForm()" )
  FormInput( v-model.trim="formData.name"
    :placeholder-text="'Введите название товара'"
    :label-text="'Название'"
)
  FormInput( v-model.string="formData.price"
    :placeholder-text="'Введите цену товара'"
    :label-text="'Название'"
)

  FormSelect(v-model="formData.categoryId" :items="categories"
:placeholder-text="'Выберите категорию товара'" :label-text="'Категория'")

  FormSelect(v-model="formData.brandId" :items="brands"
:placeholder-text="'Выберите бренд'" :label-text="'Бренд'")

  FormInput( v-model.trim="formData.imageUrl" :placeholder-text="'Вставьте ссылку на изображение товара'"
:label-text="'Изображение'"
)
  FormDescriptionBlock( v-model="formData.description")
  button(type="submit") Создать
  span(v-if="isEmptyError") Товар не помещен в хранилище. Необходимо заполнить все поля.

</template>
<script setup>
/* eslint-disable no-unused-vars */

import FormInput from '@/components/form/FormInput.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import FormDescriptionBlock from '@/components/form/FormDescriptionBlock.vue'

import useApi from '@/composible/useApi'
import { reactive, ref, isRef } from 'vue'
const formData = reactive({
  name: '',
  price: '',
  categoryId: '',
  brandId: '',
  imageUrl: ''
})
const { getCategories, getBrands, postProduct } = useApi()
const categories = ref([])
const brands = ref([])
const isEmptyError = ref(false)
const sendForm = () => {
  isEmptyError.value = false
  console.log(isEmptyError.value)
  const obj = formData
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      obj[key].forEach((item) => {
        if (Object.values(item).some((elem) => elem.length === 0)) {
          isEmptyError.value = true
        }
      })
    } else {
      if (!obj[key].length > 0) {
        isEmptyError.value = true
      }
    }
  })

  // if (isEmptyError.value) return

  console.log(obj)

  // postProduct(obj).then((res) => console.log(res.status))
}

getCategories().then((res) => (categories.value = res.data.items))
getBrands().then((res) => (brands.value = res.data.items))
</script>
<style lang="SCSS"></style>
