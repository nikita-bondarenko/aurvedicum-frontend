<template>
  <!-- <li class="catalog__item">
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

  </li> -->
  <tr class="uk-text-middle" :key="product.id">
    <td>
      <span class="data__name">{{ product.name }} </span>
    </td>
    <td>
      <div class="data-list">
        <div
          v-for="item in product.volumes"
          :key="item.id"
          class="data-list__item list"
          :class="{ 'quantity-error': isEmpty(item) }"
        >
          <div class="uk-text-center">
            <input
              class="price list__item"
              @input="patchProduct(product)"
              type="number"
              v-model="item.price"
            />
            ₽
          </div>
          <div v-if="isSubprice(item)" class="uk-text-center">
            <input
              @input="patchProduct(product)"
              class="subprice list__item"
              type="number"
              v-model="item.subprice[0].value"
            />
            ₽
          </div>
          <div class="volume list__item">{{ item.volume }}</div>
          <div class="counter list__item">
            <a
              href=""
              @click.prevent="
                item.quantity
                  ? ((item.quantity -= 1), patchProduct(product))
                  : 1
              "
              uk-icon="icon: minus-circle"
              class="counter__button counter__button-minus"
            ></a>

            <input
              class="counter__input uk-text-center uk-form-small"
              type="number"
              @input="patchProduct(product)"
              v-model="item.quantity"
            />
            <a
              href=""
              @click.prevent=";(item.quantity += 1), patchProduct(product)"
              uk-icon="icon: plus-circle"
              class="counter__button counter__button-plus"
            ></a>
          </div>
          <!-- <small v-else class="uk-text-danger uk-text-center">
            Нет в наличии
          </small> -->
        </div>
      </div>
    </td>
    <td>
      <ul class="data-list data-list--images">
        <li
          class="data-list__item"
          v-for="item in product.images"
          :key="item.id"
        >
          <!-- /* IMAGE_STATIC + item.filename */ -->

          <img
            class="uk-card uk-card-default"
            :src="IMAGE_STATIC + item.filename"
            alt=""
          />
        </li>
      </ul>
    </td>
    <td>
      <span class="uk-text-meta data-date">
        {{ formatTime(product.created) }}</span
      >
    </td>
    <td>
      <span class="uk-text-meta data-date">
        {{ formatTime(product.changed) }}</span
      >
    </td>
    <td style="position: relative">
      <div class="uk-flex uk-flex-column button-group">
        <button
          @click.prevent="openModal('change')"
          class="data__button uk-button uk-button-default uk-label-success"
        >
          Изменить
        </button>
        <button
          class="data__button uk-button uk-button-default uk-label-danger"
          @click="openModal('delete')"
        >
          Удалить
        </button>
        <router-link
          :to="{ name: 'product', params: { id: product.id } }"
          class="data__button uk-button uk-button-default uk-label-warning"
        >
          Посмотреть
        </router-link>
      </div>
      <DeleteConfirm
        :text="'Вы уверены, что хотите удалить товар?'"
        v-model:open="isDeleteOpen"
        @yes="deleteItem"
      ></DeleteConfirm>
      <DataCreateProduct
        v-if="isChangeOpen"
        v-model:is-modal-open="isChangeOpen"
        @change="emit('change')"
        :window="'change'"
      ></DataCreateProduct>
    </td>
  </tr>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import useApi from '@/composible/useApi'
import DeleteConfirm from '@/components/DeleteConfirm.vue'
import DeleteButton from '@/components/DeleteButton.vue'
import SubBtn from '@/components/SubBtn.vue'
import { ref, defineProps, defineEmits, watch } from 'vue'
import DataCreateProduct from '@/components/dataBase/DataCreateProduct.vue'
import useHelpers from '@/composible/useHelpers'
import DataProductsVue from '@/views/DataProducts.vue'
import { IMAGE_STATIC } from '@/config'
const { formatTime } = useHelpers()
const isChangeOpen = ref(false)
const isDeleteOpen = ref(false)
const emit = defineEmits(['change'])
const props = defineProps(['product'])
const openModal = (doing) => {
  if (doing === 'delete') {
    isDeleteOpen.value = true
  } else if (doing === 'change') {
    localStorage.setItem('changeFormData', JSON.stringify(props.product))
    isChangeOpen.value = true
  }
}
const { deleteProduct, patchProduct } = useApi()
const deleteItem = async () => {
  const res = await deleteProduct(props.product.id)
  emit('change')
}
const isSubprice = (volume) => {
  if (volume.subprice) {
    if (volume.subprice.length > 0) {
      return true
    }
  }
  return false
}

const isEmpty = (item) => {
  console.log(item.quantity)
  return item.quantity < 1
}
</script>
<style lang="scss">
@import '@/style/variables.scss';

.quantity-error {
  position: relative;
  &::after {
    pointer-events: none;
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.6;
    background-color: white;
    border-radius: 10px;
  }
}
.cart__item {
  position: relative;
}

.data-list {
  flex-wrap: nowrap;
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-auto-rows: minmax(auto, 80px);

  &__item {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    padding: 0 3px;
    margin-bottom: 5px;
    input {
      font-size: 12px;
    }
    .list__item {
      font-size: 12px;
      line-height: 1 !important;
    }
    .volume {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.7;
      text-align: center;
    }
  }
}

.data-list--images {
  grid-template-columns: repeat(2, auto);
  grid-template-rows: 80px;
  .data-list__item {
    grid-template-columns: auto;
    display: block;
    img {
      width: 100% !important;
      height: 100% !important;
    }
  }
}

@mixin normalizeInput {
  padding: 0 !important;
  display: inline-block;
  border: none;
  outline: none;
  max-width: 36px;
}

.price {
  @include normalizeInput;
  text-align: end;
  font-weight: 600;
}

.subprice {
  @include normalizeInput;
  text-align: end;

  text-decoration: line-through;
}

.data__name {
  max-width: 150px;
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
}

.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5px;
  margin-bottom: -5px;

  &__input {
    @include normalizeInput;
    max-width: 28px;
  }

  &__button {
    z-index: 2;
    position: relative;
    &::after {
      z-index: -1;
      position: absolute;
      content: '';
      top: 0;
      right: 0.5px;
      left: 0;
      bottom: 0.5px;
      border-radius: 50px;
      background-color: transparent;
      opacity: 0.5;
      transition: background-color 0.2s ease-in-out;
    }

    svg {
      width: 12px;
      height: 12px;
    }
  }
  &__button-minus:hover:after {
    background-color: $red;
  }
  &__button-plus:hover:after {
    background-color: $green;
  }
}

.data-date {
  display: block;
  max-width: 110px;
}

@media (max-width: 1100px) {
  .data-list {
    grid-template-columns: repeat(2, 80px);
  }
  td {
    padding: 8px 6px;
  }

  .data-container {
    padding-left: 15px;
    padding-right: 15px;
  }
  .container {
    padding: 20px 0px;
  }
}

@media (max-width: 960px) {
  .uk-table-responsive {
    max-width: 250px;
  }
}
</style>
