<template lang="pug">
li.form__item.form_danger( :class="{ 'form_danger--active': isDeleteHover }" )
  FormInput.form_danger(
  v-if="field === 'subprice'"
  :label-text="'Цена до акции'"
:placeholder-text="'Введите цену до акции'"
:input-type="'text'"
v-model.number="itemData.value"
)
  FormTextarea( :placeholder-text="'Введите текст'"
v-if="field === 'subcontent'", v-model="itemData.paragraph" )
  FormFieldset(  v-if="field === 'images'")
    teleport( v-if="isImageShown" to="#gallery")
      img.form__image(  :src="itemData.url")
    FormInput( :placeholder-text="'Введите адресс изображения'"
  v-model="itemData.url" )

  FormFieldset( v-if="field === 'description'")
    FormInput( :placeholder-text="'Введите зоголовок'"
  v-model.trim="itemData.header")
    FormMultiBlock( v-model="itemData.content" :btn-text="'Добавить абзац'" :field="'subcontent'" :isSubdivision="true" )
  FormFieldset(  v-if="field === 'volumes'" )
    FormInput(
  :label-text="'Объем/вес с единицой измерения'"
  :placeholder-text="'Введите объем/вес'"
  :input-type="'text'"
  v-model.trim="itemData.volume"
  )
    FormInput(
      :label-text="'Колличество товара указанного веса/объема в наличии'"
      :placeholder-text="'Введите колличество'"
      :input-type="'number'"
      v-model.number="itemData.quantity"
      )
    FormInput(
      :label-text="'Цена'"
  :placeholder-text="'Введите цену'"
  :input-type="'number'"
  v-model.number="itemData.price"
  )
    FormMultiBlock( v-model="itemData.subprice" :btn-text="'Добавить цену до скидки'" :item-limit="1" :field="'subprice'" :isSubdivision="true" )

  FormFieldset(  v-if="field === 'categories'")
    FormSelect(  v-model="itemData.categoryId" :items="categories"
:placeholder-text="'Выберите категорию товара'" )
  FormFieldset(  v-if="field === 'brands'")
    FormSelect(  v-model="itemData.brandId" :items="brands"
:placeholder-text="'Выберите бренд товара'" )
  DeleteButton.form__close.form__item-close( @click="deleteItem" @mouseenter="isDeleteHover = true" @mouseleave="isDeleteHover = false" )

</template>
<script setup>
/* eslint-disable no-unused-vars */
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue'
import FormInput from '@/components/form/FormInput.vue'
import FormTextarea from '@/components/form/FormTextarea.vue'
import FormFieldset from '@/components/form/FormFieldset.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import FormMultiBlock from '@/components/form/FormMultiBlock.vue'
import useHelpers from '@/composible/useHelpers'
import useApi from '@/composible/useApi'
import DeleteButton from '@/components/DeleteButton.vue'
const { getCategories, getBrands } = useApi()
const { validateImageUrl } = useHelpers()
const emit = defineEmits(['update:list'])
const props = defineProps(['list', 'id', 'field'])
const itemData = props.list.find((item) => item.id === props.id)
const index = props.list.indexOf(itemData)
const deleteItem = () => {
  const list = ref(props.list)
  if (list.value.length === 1) {
    list.value = []
  } else {
    list.value.splice(index, 1)
  }
  emit('update:list', list.value)
}

watch(
  () => Object.assign({}, itemData),
  () => {
    const list = props.list
    list.splice(index, 1, itemData)
    emit('update:list', list)
  }
)
const categories = ref([])
const brands = ref([])

if (props.field === 'categories') {
  getCategories().then((res) => (categories.value = res.data.items))
} else if (props.field === 'brands') {
  getBrands().then((res) => (brands.value = res.data.items))
}
const isImageShown = ref(false)
const updateIsImageShown = () => {
  if (props.field === 'images') {
    isImageShown.value = validateImageUrl(itemData.url)
  }
}

watch(
  () => itemData,
  () => updateIsImageShown(),
  { deep: true }
)

onMounted(() => updateIsImageShown())

const isDeleteHover = ref(false)
</script>
<style lang="scss"></style>
