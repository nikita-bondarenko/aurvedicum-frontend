<template lang="pug">
li.form__item.form_danger( :class="{'form_danger--active': isDeleteHover}" )
  FormFieldset(  v-if="field === 'images'")
    teleport( v-if="isImageShown" to="#gallery")
      img.form__image(  :src="itemData.url")
    FormInput( :placeholder-text="'Введите адресс изображения'"
  v-model.trim="itemData.url" )

  FormFieldset( v-if="field === 'description'")
    FormInput( :placeholder-text="'Введите зоголовок'"
  v-model.trim="itemData.header")
    FormTextarea( :placeholder-text="'Введите текст'"
  v-model.trim="itemData.text" )
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
  v-model.number="itemData.actual"
  )

    .form__label(v-if="isCeilPrice")
        FormInput.form_danger(
          :class="{'form_danger--active':isDeletePrice}"
          :label-text="'Цена до акции'"
      :placeholder-text="'Введите цену до акции'"
      :input-type="'number'"
      v-model.number="itemData.beforeCeil"
      )
        DeleteButton.form__subitem-close(  @click="deleteCeil" @mouseenter="isDeletePrice = true" @mouseleave="isDeletePrice = false"  )

    button.form__button.button.form__button-ceil( v-if="!isCeilPrice" type="button" @click="isCeilPrice = true") Добавить цену до скидки
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
import {
  reactive,
  ref,
  defineProps,
  defineEmits,
  watch,
  computed,
  onMounted
} from 'vue'
import FormInput from '@/components/form/FormInput.vue'
import FormTextarea from '@/components/form/FormTextarea.vue'
import FormFieldset from '@/components/form/FormFieldset.vue'
import FormSelect from '@/components/form/FormSelect.vue'
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

const isCeilPrice = ref(false)
const deleteCeil = () => {
  isCeilPrice.value = false
  Reflect.deleteProperty(itemData, 'beforeCeil')
}

const isDeleteHover = ref(false)
const isDeletePrice = ref(false)

const categories = ref([])
const brands = ref([])

if (props.field === 'categories') {
  getCategories().then((res) => (categories.value = res.data.items))
} else if (props.field === 'brands') {
  getBrands().then((res) => (brands.value = res.data.items))
}
if (props.field === 'images') {
  const isImageShown = ref(false)
  onMounted(() => (isImageShown.value = validateImageUrl(itemData.url)))
  watch(
    () => itemData.url,
    () => (isImageShown.value = validateImageUrl(itemData.url))
  )
}
</script>
<style lang="scss">
@import '@/style/variables.scss';
@import '@/style/mixins.scss';

.form {
  &__gallery {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    padding: 2px;
    max-width: 390px;
    margin: -5px -5px;
  }
  &__image {
    padding: 5px;
    max-width: calc(100% / 3);
    max-height: 120px;
    object-fit: contain;
  }

  &__subitem-close {
    right: -32px;
  }

  &__item {
    position: relative;
  }

  &__label {
    .form_danger {
      &::after {
        right: -5px;
        left: -5px;
      }
    }
  }

  &_danger {
    position: relative;

    &::after {
      pointer-events: none;
      content: '';
      top: -5px;
      right: -10px;
      left: -10px;
      bottom: -5px;
      position: absolute;
      opacity: 0.05;
      background-color: transparent;
      @include btnTransition;
    }
  }

  &_danger--active {
    &::after {
      background-color: $red;
    }
  }

  &__item-close {
    top: 25px;
    right: -30px;

    &::after {
      background-color: $green;
    }
  }

  &__subitem-close {
    &::after {
      opacity: 0.6;
      background-color: $green;
    }
  }
}
</style>
