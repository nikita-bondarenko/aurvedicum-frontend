<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item" v-for="item in product.categories" :key="item.id">
          <a class="breadcrumbs__link" href="#"> {{ item.title }} </a>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link" disabled> {{ product.name }} </span>
        </li>
      </ul>
    </div>

    <section class="item product">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="IMAGE_STATIC + image.filename" alt="Изображение товара" />
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="item in product.images" :key="item.id">
            <a href="" @click.prevent="image = item" class="pics__link"
              :class="{ 'pics__link--current': item === image }">
              <img width="98" height="98" :src="IMAGE_STATIC + item.filename" alt="Изображение товара" />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <h2 class="item__title">{{ product.name }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter counter">
                <button type="button" class="counter__button" aria-label="Убрать один товар">
                  <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 52.161 52.161"
                    style="enable-background: new 0 0 52.161 52.161" xml:space="preserve">
                    <g>
                      <path class="button__minus"
                        d="M52.161,26.081c0,3.246-2.63,5.875-5.875,5.875H5.875C2.63,31.956,0,29.327,0,26.081l0,0c0-3.245,2.63-5.875,5.875-5.875 h40.411C49.531,20.206,52.161,22.835,52.161,26.081L52.161,26.081z" />
                    </g>
                  </svg>
                </button>

                <input type="text" value="1" name="count" />

                <button type="button" aria-label="Добавить один товар" class="counter__button">
                  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="45.402px" height="45.402px"
                    viewBox="0 0 45.402 45.402" style="enable-background: new 0 0 45.402 45.402" xml:space="preserve">
                    <g>
                      <path class="button__plus"
                        d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                    </g>
                  </svg>
                </button>
              </div>

              <b class="item__price" :class="{ 'item__price--center': isSubprice }">
                {{ volume.price }} ₽
                <span v-if="volume.subprice" class="item__subprice">{{ volume.subprice[0].value }} ₽
                </span>
              </b>
            </div>
            <div class="item__row volume-row">
              <legend class="form__legend volume-row__item">Бренд:</legend>
              <ul class="brand-list">
                <li class="brand-list__item" v-for="item in product.brands" :key="item.id">
                  <span class="brand-list__text">
                    {{ item.title }}
                  </span>
                </li>
              </ul>
            </div>

            <div class="item__row volume-row">
              <legend class="form__legend volume-row__item">Объем/вес:</legend>

              <div class="select volume-row__item" ref="selectElement" @mouseenter="isSelectHover = true"
                @mouseleave="isSelectHover = false" @click.prevent="isSelectOpen = !isSelectOpen" :class="{
                  'select--open': isSelectOpen,
                  'select-one': isOneVolume
                }">
                {{ volume.volume }}
                <div class="select-arrow" :class="{
                  'select-arrow--hover': isSelectHover,
                  'select-arrow--open': isSelectOpen
                }">
                  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30.021px" height="30.021px"
                    viewBox="0 0 30.021 30.021" style="enable-background: new 0 0 30.021 30.021" xml:space="preserve">
                    <g>
                      <path d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151
  c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0
  l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z" />
                    </g>
                  </svg>
                </div>
                <div ref="dropBox" class="drop-box">
                  <div class="drop-box__body">
                    <ul class="drop-box__list">
                      <li class="drop-box__item" v-for="item in product.volumes" :key="item.id">
                        <button @click.prevent="volume = item" class="drop-box__button" :value="item.volume">
                          {{ item.volume }}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <PrimeBtn type="submit"> В корзину </PrimeBtn>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs uk-flex uk-flex-wrap uk-flex-center">
          <li class="tabs__item" v-for="item in product.description" :key="item.id">
            <a @click.prevent="changeContent(item.id)" class="tabs__link"
              :class="{ 'tabs__link--current': item.content === content }">
              {{ item.header }}
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p v-for="item in content" :key="item.id">
            {{ item.paragraph }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import useApi from '@/composible/useApi'
import PrimeBtn from '@/components/PrimeBtn.vue'
import { IMAGE_STATIC } from '@/config.js'
const productId = useRoute().params.id
const { getProduct } = useApi()
const product = ref({})
const content = ref([])
const volume = ref([])
const isLoading = ref(false)
const isLoadingFailed = ref(false)
const isSelectHover = ref(false)
const isSelectOpen = ref(false)
const selectElement = ref(null)
const dropBox = ref(null)
const isOneVolume = ref(false)
const isSubprice = ref(false)
const image = ref('')
const getData = async () => {
  try {
    isLoading.value = true
    isLoadingFailed.value = false
    const res = await getProduct({ id: productId })
    product.value = res.data
    if (await res.data) {
      isLoading.value = false
      if (product.value.description.length) {
        content.value = product.value.description[0].content
      }

      if (product.value.volumes[0]) {
        volume.value = product.value.volumes[0]
        isOneVolume.value = product.value.volumes.length === 1
      }

      if (product.value.images[0]) {
        image.value = product.value.images[0]
      }
    }
  } catch {
    isLoadingFailed.value = true
    isLoading.value = false
  }
}
getData()
const changeContent = (id) => {
  content.value = product.value.description.find(
    (item) => item.id === id
  ).content
}

document.body.addEventListener('click', () => {
  if (!isSelectHover.value) {
    isSelectOpen.value = false
  }
})

watch(
  () => isSelectOpen.value,
  (value) => {
    if (!value) {
      dropBox.value.classList.add('drop-box--hidden')
      dropBox.value.classList.remove('drop-box--open')

      setTimeout(() => dropBox.value.classList.remove('drop-box--hidden'), 600)
    } else {
      dropBox.value.classList.add('drop-box--open')
    }
  }
)

watch(
  () => volume.value,
  (value) => {
    if (value.subprice) {
      isSubprice.value = !!value.subprice[0].value
    }
  }
)
</script>
<style lang="scss">
@import '@/style/mixins.scss';
@import '@/style/variables.scss';

@mixin selectBorderColor {
  cursor: pointer;

  color: $colorText;
  background-color: $lightGray;
  border: 1px solid transparent;
  transition-property: border-color, color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &:hover {
    color: $green  !important;
    border-color: $green;
  }
}

.select {
  position: relative;
  display: inline-block;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  @include selectBorderColor;
  border-color: transparent;
  padding: 2px 30px 2px 10px;
  color: $dark  !important;
}

.select--open {
  border-color: $green;
}

.item__content {
  margin: 0 auto;

  p {
    @include textFont;
    display: block;
    margin-bottom: 10px;
  }
}

.container {
  width: auto;
}

.tabs__link {
  transition: color 0.2s ease-in-out;
}

.tabs__link:focus::after,
.tabs__link:hover::after,
.tabs__link--current::after {
  bottom: -1px;
  background-color: $green;
}

.uk-link-toggle:hover .uk-link,
.uk-link:hover,
a:hover {
  color: $green;
  text-decoration: underline;
}

.item__title {
  font-weight: 600;
}

.form__counter button {
  border: none;

  [class^='button__'] {
    transition: fill 0.2s ease-in-out;
  }

  &:hover {
    background-color: transparent;

    .button__plus {
      fill: $green;
    }

    .button__minus {
      fill: $red;
    }
  }
}

.form__block {
  position: relative;
}

.select-arrow {
  pointer-events: none;
  position: absolute;
  top: 16px;
  right: 8px;

  width: 15px;
  height: 15px;
  transform: rotate(180deg);
  transition: transform 0.5s ease-in-out, top 0.5s ease-in-out;

  path {
    fill: $dark;
    transition: fill 0.2s ease-in-out;
  }

  &--open {
    top: 8px;
    transform: rotate(0deg);
  }
}

.select-arrow--hover path {
  fill: $green;
}

.drop-box__body {
  transform: translateY(-100%);

  .drop-box__list {
    border-color: transparent;
  }
}

.drop-box--hidden {
  .drop-box__body {
    animation: closeBox 0.5s ease-in-out;
    transform: translateY(-100%);
  }
}

.drop-box--open {
  .drop-box__body {
    animation: dropBox 0.5s alternate ease-in-out;

    transform: translateY(0);

    .drop-box__list {
      border-color: $green;
    }
  }
}

.drop-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  transform: translateY(100%);

  &__body {
    position: relative;
  }

  &__list {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    top: 0;
    @include selectBorderColor;

    border-color: $green;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  &__item {
    line-height: 0;
    margin: 0;
    padding: 0;
  }

  &__button {
    color: $dark;
    background-color: $colorBright;
    transition-property: color, background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    cursor: pointer;
    border: none;
    width: 100%;

    &:hover {
      color: $green;
    }
  }
}

@keyframes dropBox {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes closeBox {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100%);
  }
}

.counter__button {
  &:focus {
    background-color: transparent !important;
  }

  svg {
    width: 20px;
  }
}

.item__price {
  display: block;
  position: relative;

  &--center {
    transform: translateY(-10px);
  }
}

.item__subprice {
  display: block;
  position: absolute;
  top: 40px;
  left: 10px;
  @include middleFont;
  text-decoration: line-through;
  color: $red;
  opacity: 0.8;
  width: auto;
}

.volume-row {
  display: flex;
  align-items: stretch;
  justify-content: start;
  grid-gap: 0px;

  .form__legend {
    max-width: 90px;
    margin: 0;
  }

  &__item {
    flex-grow: 0;
  }
}

.item__row:nth-child(3n) {
  margin-bottom: 50px;
}

.select-one {
  pointer-events: none;
  border: none;

  .select-arrow {
    display: none;
  }
}

.item__row--center {
  margin-bottom: 20px;
}

.product .button-primary {
  max-width: 180px;
}

.pics__link--current {
  pointer-events: none;
}

.pics__link {
  display: block;
  height: 100%;

  img {
    height: 100% !important;
  }
}

.pics__wrapper {
  img {
    height: 570px;
    width: 570px;
  }
}

.pics__link:focus,
.pics__link:hover,
.pics__link--current {
  border-color: $green;
}

.brand-list {
  display: flex;
  flex-wrap: wrap;

  &__item {
    padding: 2px 4px;
  }

  &__text {
    color: $colorTextLight;
  }
}

@media (max-width: 650px) {
  .item {
    display: flex;
    flex-direction: column;
  }

  .item__content {
    width: auto;
  }

  .tabs {
    flex-direction: column;
  }
}
</style>
