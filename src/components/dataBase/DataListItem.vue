<template>
  <li class="catalog__item">
    <img
      v-if="product.images.length"
      :src="product.images[0].url || ''"
      :alt="product.title"
    />
    <h3 class="catalog__title">
      <a @click.prevent=""> {{ product.name }} </a>
    </h3>

    <ul class="catalog__group">
      <li class="item" v-for="item in product.volumes" :key="item.id">
        <span class="catalog__price"> {{ item.price }} ₽ </span>
        <span v-if="item.subprice" class="catalog__subprice">
          {{ item.subprice[0].value }} ₽</span
        >
        <span class="catalog__volume"> {{ item.volume }} </span>
      </li>
    </ul>
    <h2 class="catalog__title">
      <a @click.prevent="openModal('change')"> Изменить </a>
    </h2>

    <DeleteButton @click="openModal('delete')"></DeleteButton>
    <DeleteConfirm
      :text="'Вы уверены, что хотите удалить товар?'"
      v-model:open="isDeleteOpen"
      @yes="deleteItem"
    ></DeleteConfirm>
    <DataCreateProduct
      v-if="isChangeOpen"
      v-model:is-modal-open="isChangeOpen"
      :window="'change'"
    ></DataCreateProduct>
  </li>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import useApi from '@/composible/useApi'
import DeleteConfirm from '@/components/DeleteConfirm.vue'
import DeleteButton from '@/components/DeleteButton.vue'
import SubBtn from '@/components/SubBtn.vue'
import { ref, defineProps, defineEmits, watch } from 'vue'
import DataCreateProduct from '@/components/dataBase/DataCreateProduct.vue'

const isChangeOpen = ref(false)
const isDeleteOpen = ref(false)
const emit = defineEmits(['change'])
const props = defineProps(['product'])
console.log(props.product.volumes)
const openModal = (doing) => {
  if (doing === 'delete') {
    isDeleteOpen.value = true
  } else if (doing === 'change') {
    localStorage.setItem('changeFormData', JSON.stringify(props.product))
    isChangeOpen.value = true
  }
}
const { deleteProduct } = useApi()

const deleteItem = async () => {
  const res = await deleteProduct(props.product.id)
  emit('change')
}
watch(
  () => isChangeOpen.value,
  (value) => (value === false ? emit('change') : 1)
)
</script>
<style lang="scss">
.cart__item {
  position: relative;
}
</style>
