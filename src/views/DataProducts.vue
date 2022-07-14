<template>
  <main class="main">
    <div class="content container">
      <DataCreateProduct
        v-if="isModalOpen"
        v-model:is-modal-open="isModalOpen"
        :window="'create'"
        @change="getData()"
      ></DataCreateProduct>

      <div class="content__top">
        <div class="content__row uk-flex-column">
          <h1 class="content__title">База данных</h1>

          <span class="content__info">
            <button
              class="uk-button uk-button-primary"
              @click="openModal('create')"
            >
              Создать новый товар
            </button>
          </span>
          <div class="uk-margin">
            <form
              @submit.prevent="getData({ page: 1 })"
              class="uk-search uk-search-default"
            >
              <button class="uk-search-icon-flip" uk-search-icon></button>
              <input
                name="search"
                class="uk-search-input"
                type="search"
                v-model.trim="searchValue"
                placeholder="Поиск..."
              />
            </form>
          </div>
        </div>
      </div>

      <div class="uk-container data-container">
        <table class="uk-table uk-table-divider uk-table-responsive">
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Цена/В наличии</th>
              <th>Изображения</th>
              <th>Созданно</th>
              <th>Измененно</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <DataListItem
              @change="getData()"
              v-for="product in products.items"
              :key="product.id"
              :product="product"
            />
          </tbody>
        </table>
      </div>

      <ul
        v-if="products.pagination"
        class="uk-pagination uk-flex-center"
        uk-margin
      >
        <li :class="{ 'uk-disabled': products.pagination.page === 1 }">
          <a
            @click.prevent="getData({ page: products.pagination.page - 1 })"
            href="#"
            ><span uk-pagination-previous></span
          ></a>
        </li>
        <li
          v-for="page in products.pagination.pages"
          :key="page"
          :class="{ 'uk-active': page === products.pagination.page }"
        >
          <a @click.prevent="getData({ page })" href="#">{{ page }} </a>
        </li>
        <li
          :class="{
            'uk-disabled':
              products.pagination.page === products.pagination.pages
          }"
        >
          <a
            @click.prevent="getData({ page: products.pagination.page + 1 })"
            href="#"
            ><span uk-pagination-next></span
          ></a>
        </li>
      </ul>
    </div>
  </main>
</template>
<script setup>
/* eslint-disable no-unused-vars */
import useApi from '@/composible/useApi'
import { ref, watch, reactive } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import DataCreateProduct from '@/components/dataBase/DataCreateProduct.vue'
import BaseLoader from '@/components/BaseLoader.vue'
import DataListItem from '@/components/dataBase/DataListItem.vue'
import SubBtn from '@/components/SubBtn.vue'
import DeleteButton from '@/components/DeleteButton.vue'
const { getProducts } = useApi()
const products = ref({ items: [] })
const isModalOpen = ref(false)
const isLoading = ref(false)
const isLoadingFailed = ref(false)
const pageConfig = reactive({
  limit: 10
})
const searchValue = ref('')
const getCurrentProducts = (obj = {}) => {
  return getProducts(
    Object.assign(pageConfig, { name: searchValue.value }, obj)
  ).then((res) => res)
}

const getData = async (body) => {
  isLoading.value = true
  isLoadingFailed.value = false

  try {
    const res = await getCurrentProducts(body)

    products.value = await res.data
    if (res) {
      isLoading.value = false
    }
  } catch (err) {
    isLoadingFailed.value = true
    isLoading.value = false
  }
  console.log(products.value.pagination)
}

const openModal = () => {
  isModalOpen.value = true
}

getData()

setInterval(() => getData(), 100)
</script>
<style lang="scss">
.catalog__item {
  position: relative;
  max-width: 320px;
}

.container {
  width: auto;
}

.main {
  background-color: white;
}

.content__create-btn {
  margin-right: calc(100% / 2);
  margin-left: auto;
  transform: translateX(50%);
}

.content__info {
  margin: 0;
}

.data-container {
  display: flex;
  justify-content: center;
}
</style>
