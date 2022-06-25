<template lang="pug">
h2.content__title Создание нового товара
form.form#create( @submit.prevent="sendForm()" )
  FormFieldset(:legend="'Название'")
    FormInput( v-model.trim="formData.name"
      :placeholder-text="'Введите название'"
      :input-type="'text'"
    )
  FormFieldset(:legend="'Цена за объем/вес'")
    FormMultiBlock( @change="updateInputGroup"  v-model="formData.volumes" :btn-text="'Добавить объем/вес'" :field="'volumes'" )

  FormFieldset(:legend="'Категория'")
    FormMultiBlock( @change="updateInputGroup"  v-model="formData.categories" :btn-text="'Добавить категорию'" :field="'categories'" )

  FormFieldset(:legend="'Бренд'")
    FormMultiBlock( @change="updateInputGroup"  v-model="formData.brands" :btn-text="'Добавить бренд'" :field="'brands'" )

  FormFieldset(:legend="'Изображения'")
    FormMultiBlock( @change="updateInputGroup"  v-model="formData.images" :btn-text="'Добавить изображение'" :field="'images'" )

  FormFieldset(:legend="'Описание товара'")
    FormMultiBlock( @change="updateInputGroup"  v-model="formData.description" :btn-text="'Добавить описание'"  :field="'description'" )

  PrimeBtn(:class="{'button--disabled': isSending}" :text="'Создать'")
    BaseLoader(v-if="isSending")
BaseModal(v-model:open="isEmptyError")
  .form__common-error Не удалось создать товар. Необходимо заполнить корректно все поля.
BaseModal(v-model:open="isSendingFailed")
  .form__common-error Не удалось создать товар. Проверьте интернет соединение и попробуйте еще раз.
BaseModal(v-model:open="isSendingSuccessfull")
  .form__label Товар успешно добавлен в хранилище.
</template>
<script setup>
/* eslint-disable no-unused-vars */

import FormInput from '@/components/form/FormInput.vue'
import FormMultiBlock from '@/components/form/FormMultiBlock.vue'
import PrimeBtn from '@/components/PrimeBtn.vue'

import FormFieldset from '../form/FormFieldset.vue'
import BaseModal from '../BaseModal.vue'
import useApi from '@/composible/useApi'
import useHelpers from '@/composible/useHelpers'
import BaseLoader from '@/components/BaseLoader.vue'

import { reactive, ref, isRef, onMounted, watch } from 'vue'
const formData = reactive(
  JSON.parse(localStorage.getItem('createFormData')) || {
    name: '',
    volumes: [],
    description: [],
    categories: [],
    brands: [],
    images: []
  }
)
const { postProduct } = useApi()
const { getInputGroup, validateImageUrl } = useHelpers()
const isEmptyError = ref(false)
const inputGroup = ref(null)
const addElementError = (item) => {
  item.nextElementSibling.textContent = 'Недопустимое значение'

  item.classList.add('form__label--error')
}
const removeElementError = (item) => {
  item.nextElementSibling.textContent = ''

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
    try {
      isSending.value = true
      isSendingFailed.value = false
      const res = await postProduct(formData)
      console.log(res)
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
  () => Object.assign({}, formData),
  () => updateInputGroup()
)

watch(
  () => inputGroup.value,
  (value) => {
    value.forEach((item) => (item.value ? removeElementError(item) : 1))
    localStorage.setItem('createFormData', JSON.stringify(formData))
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

.form {
  display: flex;
  justify-content: center;
  flex-direction: column;

  &__label--error {
    border: 4px solid #c73d00 !important;
    &:hover {
      border-color: #222;
    }
  }

  &__common-error {
    color: $red;
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
  }

  &__list {
    .form__block {
      margin-bottom: 13px;
    }
  }

  &__input {
    &::placeholder {
      color: $colorTextLight;
    }
  }

  &__select {
    color: $colorTextLight;
    background-color: $lightGray;
    border: 1px solid transparent;
    &:focus-visible {
      border-radius: 0;
      outline: none;
    }

    &:hover {
      border-color: #222;
    }
  }

  &__block {
    position: relative;
    width: 100%;
    &-title {
      text-transform: uppercase;
      color: $green;
      padding: 0;
      margin-top: 0;
      margin-bottom: 10px;
      text-align: center;
    }
  }

  &__close {
    position: absolute;
  }

  &__legend {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
