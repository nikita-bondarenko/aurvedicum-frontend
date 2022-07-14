<template lang="pug">
li.form__item.form_danger( :class="{ 'form_danger--active': isDeleteHover }" )
  FormInput.form_danger(
  v-if="field === 'subprice'"
  :label-text="'Цена до акции'"
:placeholder-text="'Введите цену до акции'"
:input-type="'number'"
v-model.number="itemData.value"
)
  FormTextarea( :placeholder-text="'Введите текст'"
v-if="field === 'subcontent'", v-model="itemData.paragraph" )
  FormFieldset(  v-if="field === 'images'")
    teleport( v-if="isImageShown" to="#gallery")
      img.form__image(  :src="IMAGE_STATIC + itemData.filename")
    FormField
      input.form__file-input(:class="{'form__file-input--filled': isImageShown}" ref="imageInput" @input="uploadImage" type="file")
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
  DeleteButton.form__close.form__item-close( @click="deleteItem" @mouseenter="isDeleteHover = true" @mouseleave="isDeleteHover = false" :class="{'form__image-delete': field === 'images'}" )
BaseMessage(v-if="isUploadingFailed" v-model:open ="isUploadingFailed"
:text="IMAGE_UPLOAD_ERROR")

</template>
<script setup>
/* eslint-disable no-unused-vars */
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue'
import FormInput from '@/components/form/FormInput.vue'
import FormTextarea from '@/components/form/FormTextarea.vue'
import FormFieldset from '@/components/form/FormFieldset.vue'
import FormField from '@/components/form/FormField.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import FormMultiBlock from '@/components/form/FormMultiBlock.vue'
import BaseMessage from '@/components/BaseMessage.vue'
import useHelpers from '@/composible/useHelpers'
import useApi from '@/composible/useApi'
import DeleteButton from '@/components/DeleteButton.vue'
import { API_URL, IMAGE_UPLOAD_ERROR, IMAGE_STATIC } from '@/config'
const { getCategories, getBrands, postImage, deleteImage } = useApi()
const { validateImageUrl } = useHelpers()
const emit = defineEmits(['update:list'])
const props = defineProps(['list', 'id', 'field'])
const itemData = props.list.find((item) => item.id === props.id)
const index = props.list.indexOf(itemData)
const deleteItem = () => {
  if (props.field === 'images') {
    deleteImage(itemData.filename)
  }
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
    isImageShown.value = !!itemData.filename
  }
}

watch(
  () => itemData,
  () => {
    updateIsImageShown()
    if (props.field === 'categories') {
      itemData.title = categories.value.find(
        (item) => item.id === itemData.categoryId
      ).title
    } else if (props.field === 'brands') {
      itemData.title = brands.value.find(
        (item) => item.id === itemData.brandId
      ).title
    }
  },
  { deep: true }
)
const imageInput = ref(null)
onMounted(() => {
  updateIsImageShown()
})
const isUploadingFailed = ref(false)
const uploadImage = (e) => {
  isUploadingFailed.value = false
  const formData = new FormData()
  formData.append('image', e.target.files[0])
  postImage(formData)
    .then((res) => (itemData.filename = res.data))
    .catch(() => (isUploadingFailed.value = true))
}

const isDeleteHover = ref(false)
</script>
<style lang="scss">
@import '@/style/variables.scss';
@import '@/style/mixins.scss';
.form__file-input {
  display: block;
  height: 60px;
  width: 300px;
  position: relative;
  &::after {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    content: 'Выбрать изображение';
    background-color: $green;
    transition: background-color 0.2s ease-in-out;
    @include textFont;
    color: $colorBright;
    background: no-repeat left 23px center/30px
      url('@/../public/img/upload.png') $green;
    padding-left: 35px;
  }
  &.form__label--error {
    border: none !important;
    &::after {
      background-color: $red;
    }
  }
  &.form__file-input--filled {
    &::after {
      content: 'Поменять изображение';
      background-color: $blue;
    }
  }

  &:hover:after {
    background-color: $black;
  }
}

.form__image-delete {
  right: 12px !important;
  top: 30px !important;
}

.image {
  position: relative;
  &__content {
    width: 100%;
    height: 100%;
  }
  &__delete {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
