<template lang="pug">
.container.main
  .main__left
    button.create-btn(@click="openModal('create')") Создать новый елемент
    .filter
        .input.filter__input
  section.catalog.main__right
    li.catalog__item( v-for="item in products.items")
      h3.catalog__title {{item.name}}
      button.catalog__btn(@click="openModal('change')") Изменить
      button.catalog__delete(@click="openModal('delelte')")
        img(:src="DELETE_IMG_URL")
  .catalog__pagination
  BaseModal(v-model:open="isModalOpen")
    DataCreateProduct(v-if="isCreateOpen")
    DataChangeProduct(v-if="isChangeOpen")
    DataDeleteProduct(v-if="isDeleteOpen")
</template>
<script setup>
/* eslint-disable no-unused-vars */
import useApi from '@/composible/useApi'
import { DELETE_IMG_URL } from '@/config'
import { ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import DataCreateProduct from '@/components/dataBase/DataCreateProduct.vue'
import DataChangeProduct from '@/components/dataBase/DataChangeProduct.vue'
import DataDeleteProduct from '@/components/dataBase/DataDeleteProduct.vue'

const { getProducts } = useApi()
const products = ref({ items: [] })
const isModalOpen = ref(false)
const isCreateOpen = ref(false)
const isChangeOpen = ref(false)
const isDeleteOpen = ref(false)

const openModal = (doing) => {
  if (doing === 'create') {
    isCreateOpen.value = true
  } else if (doing === 'change') {
    isChangeOpen.value = true
  } else if (doing === 'delete') {
    isDeleteOpen.value = true
  }
  isModalOpen.value = true
}

watch(
  () => isModalOpen.value,
  (value) => {
    if (!value) {
      isCreateOpen.value = false
      isChangeOpen.value = false
      isDeleteOpen.value = false
    }
  }
)

getProducts().then((res) => (products.value = res.data))

watch(() => products.value, () => console.log(products.value))
</script>
<style lang="SCSS"></style>
