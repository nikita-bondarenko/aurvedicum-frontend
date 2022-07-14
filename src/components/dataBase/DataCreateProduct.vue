<template lang="pug">
BaseModal(v-model:open="isOpen")
  h2.content__title {{ window === 'create' ? 'Создание нового товара' : 'Изменение товара' }}
  form.form#create( @submit.prevent="sendForm()"
 )
    FormFieldset(:legend="'Название'")
      FormInput( v-model.trim="formData.name"
        :placeholder-text="'Введите название'"
        :input-type="'text'"
      )
    FormFieldset(v-for="item in sections" :legend="item.legend")
      FormMultiBlock( @change="updateInputGroup" v-model="formData[item.section]"
:btn-text="item.btnText" :field="item.section" )
    PrimeBtn(:class="{ 'button--disabled': isSending }"
 :text="window === 'create' ? 'Создать' : 'Сохранить'")
      BaseLoader(v-if="isSending")
      BaseMessage(v-if="isEmptyError" v-model:open ="isEmptyError" :text="FILL_MESSAGE")
      BaseMessage(v-if="isSendingFailed" v-model:open ="isSendingFailed" :text="CONNECT_MESSAGE")
      BaseMessage(v-if="isSendingSuccessfull" v-model:open ="isSendingSuccessfull" :text="SUCCESS_MESSAGE" :type="'success'")

</template>
<script setup>
/* eslint-disable no-unused-vars  */
/* eslint-disable indent */

import FormInput from '@/components/form/FormInput.vue'
import FormMultiBlock from '@/components/form/FormMultiBlock.vue'
import PrimeBtn from '@/components/PrimeBtn.vue'

import FormFieldset from '../form/FormFieldset.vue'
import useApi from '@/composible/useApi'
import useHelpers from '@/composible/useHelpers'
import BaseLoader from '@/components/BaseLoader.vue'
import BaseMessage from '@/components/BaseMessage.vue'
import {
  reactive,
  ref,
  onMounted,
  watch,
  defineEmits,
  defineProps,
  computed
} from 'vue'
import { FILL_MESSAGE, CONNECT_MESSAGE, SUCCESS_MESSAGE } from '@/config'
import BaseModal from '../BaseModal.vue'

const emit = defineEmits(['update:isModalOpen', 'change'])
const props = defineProps({
  window: {
    type: String,
    default: 'create'
  },
  isModalOpen: Boolean
})
const defaultProperties = {
  name: '',
  volumes: [],
  categories: [],
  brands: [],
  images: [],
  description: []
}

const formData =
  props.window === 'create'
    ? reactive(
        JSON.parse(localStorage.getItem('createFormData')) || defaultProperties
      )
    : reactive(
        JSON.parse(localStorage.getItem('changeFormData')) || defaultProperties
      )

const sectionsData = {
  section: ['volumes', 'categories', 'brands', 'images', 'description'],
  btnText: [
    'Добавить объем/вес',
    'Добавить категорию',
    'Добавить бренд',
    'Добавить изображение',
    'Добавить раздел'
  ],
  legend: [
    'Цена за объем/вес',
    'Категория',
    'Бренд',
    'Изображения',
    'Описание товара'
  ]
}

const { postProduct, patchProduct } = useApi()
const { getInputGroup, validateImageUrl, parseObject } = useHelpers()
const sections = parseObject(sectionsData)
const isEmptyError = ref(false)
const inputGroup = ref(null)
const isOpen = computed({
  get() {
    return props.isModalOpen
  },
  set(value) {
    emit('update:isModalOpen', value)
    return value
  }
})
const addElementError = (item) => {
  item.nextElementSibling.textContent = 'Недопустимое значение'
  item.classList.add('form__label--error')
}
const removeElementError = (item) => {
  if (item.nextElementSibling) {
    item.nextElementSibling.textContent = ''
  }

  item.classList.remove('form__label--error')
}
const updateInputGroup = () => {
  inputGroup.value = getInputGroup('create')
}

const isSending = ref(false)
const isSendingFailed = ref(false)
const isSendingSuccessfull = ref(false)

const sendForm = async () => {
  isEmptyError.value = false

  if (
    getInputGroup('create')
      .reduce((array, element) => [...array, element.value], [])
      .some((item) => item === '')
  ) {
    getInputGroup('create').forEach((item) => {
      if (item.placeholder) {
        if (
          item.placeholder.includes('изображ') &&
          !validateImageUrl(item.value)
        ) {
          addElementError(item)
        }
      }
      if (!item.value) addElementError(item)
    })
    isEmptyError.value = true
  }

  if (!isEmptyError.value) {
    isSending.value = true
    isSendingFailed.value = false

    formData.volumes = formData.volumes.sort((a, b) =>
      a.price < b.price ? -1 : 1
    )

    try {
      const res =
        props.window === 'create'
          ? postProduct(formData)
          : patchProduct(formData)
      if (res) {
        isSendingSuccessfull.value = true
        isSending.value = false
      }
    } catch (err) {
      isSendingFailed.value = true
      isSending.value = false
    }
  }
}

onMounted(() => updateInputGroup())

watch(
  () => formData,
  (value) => {
    // console.log(value)
    if (value.volumes.length > 0) {
      value.volumes.forEach((item) => {
        if (item.subprice && item.subprice.length < 1) {
          delete item.subprice
          console.log(item)
        }
      })
    }
    updateInputGroup()
    props.window === 'create'
      ? localStorage.setItem('createFormData', JSON.stringify(formData))
      : localStorage.setItem('changeFormData', JSON.stringify(formData))
  },
  { deep: true }
)

watch(
  () => inputGroup.value,
  (value) => {
    value.forEach((item) => (item.value ? removeElementError(item) : 1))
  }
)

watch(
  () => isSendingSuccessfull.value,
  (value) => {
    if (value === false) {
      isOpen.value = value
      document.body.style.overflow = 'scroll'
      document.body.style.paddingRight = 'inherit'

      props.window === 'create'
        ? localStorage.removeItem('createFormData')
        : localStorage.removeItem('changeFormData')
      emit('change')
    }
  }
)
</script>
<style lang="scss">
@import '@/style/variables.scss';
@import '@/style/mixins.scss';

.button {
  position: relative;

  &--disabled {
    pointer-events: none;
    cursor: none;
  }
}
</style>
