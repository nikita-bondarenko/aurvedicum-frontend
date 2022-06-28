<template>
  <!-- .container.main
  .main__left
    button.create-btn(@click="openModal('create')") Создать новый елемент
    .filter
      .input.filter__input
  BaseModal(v-model:open="isLoadingFailed")
    .error Не удалось получить список товаров. Попробуйте перезагрузить страницу.
  BaseLoader(v-if="isLoading")
  form.cart__form(v-else)
    .cart__field
      ul.cart__list
        DataListItem(@change="getData()" v-for="item in products.items" :product="item")
  .catalog__pagination
  DataCreateProduct(v-if="isModalOpen" v-model:is-modal-open="isModalOpen" :window="'create'") -->
  <main class="main">
    <div class="content container">
      <DataCreateProduct
        v-if="isModalOpen"
        v-model:is-modal-open="isModalOpen"
        :window="'create'"
      ></DataCreateProduct>

      <div class="content__top">
        <div class="content__row">
          <h1 class="content__title">Каталог</h1>
          <SubBtn class="content__create-btn" @click="openModal('create')"
            >Создать новый товар</SubBtn
          >

          <span class="content__info">
            <!-- {{ totalProductQuantity }} -->
          </span>
        </div>
      </div>

      <div class="content__catalog">
        <!-- <CatalogFilter :categoryId="pageSettings.categoryId" v-model:pageSettings="pageSettings" /> -->
        <section class="catalog">
          <!-- <BaseBigLoader
          v-if="loading || failed"
          class="catalog__list loader"
          :loading="loading"
          :failed="failed"
        >
          Не удалось загрузить список товаров, попробуйте перезагрузить
          страницу.
        </BaseBigLoader> -->

          <ul class="catalog__list uk-margin-bottom">
            <DataListItem
              @change="getData()"
              v-for="item in products.items"
              :product="item"
              :key="item.id"
            />
          </ul>
          <!-- <BasePagination :pages="pagesNumber" v-model:page="pageSettings.page" /> -->
        </section>
      </div>
    </div>
  </main>
</template>
<script setup>
/* eslint-disable no-unused-vars */
import useApi from '@/composible/useApi'
import { ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import DataCreateProduct from '@/components/dataBase/DataCreateProduct.vue'
import BaseLoader from '@/components/BaseLoader.vue'
import DataListItem from '@/components/dataBase/DataListItem.vue'
import SubBtn from '@/components/SubBtn.vue'
const { getProducts } = useApi()
const products = ref({ items: [] })
const isModalOpen = ref(false)
const isLoading = ref(false)
const isLoadingFailed = ref(false)
const getData = async () => {
  isLoading.value = true
  isLoadingFailed.value = false

  try {
    const res = await getProducts()

    products.value = await res.data
    if (res) {
      isLoading.value = false
    }
  } catch (err) {
    isLoadingFailed.value = true
    isLoading.value = false
  }
}

const openModal = () => {
  isModalOpen.value = true
}

watch(
  () => isModalOpen.value,
  (value) => {
    if (!value) {
      getData()
    }
  }
)

watch(
  () => products.value,
  () => console.log(products.value)
)

getData()
</script>
<style lang="scss">
.catalog__item {
  position: relative;
  max-width: 320px;
}

.main {
  background-color: white;
}

.content__create-btn {
  margin-right: calc(100% / 2);
  margin-left: auto;
  transform: translateX(50%);
}
</style>
