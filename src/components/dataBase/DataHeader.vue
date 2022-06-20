<template lang="pug">
section.header
  .container
    a.header__logo.logo(href="#")
      img.logo__img(:src="LOGO_URL")
    nav.header__nav.nav
      ul.nav__list.grid
        li.grid__item(v-for="item in collections")
          router-link.nav__link(:to="{ name: item.pageName}") {{ item.title }}
</template>
<script setup>
/* eslint-disable no-unused-vars */
import { LOGO_URL } from '@/config'

const collections = [
  { title: 'Товары', pageName: 'dataProducts' },
  { title: 'Категории', pageName: 'dataCategories' },
  { title: 'Размеры', pageName: 'dataVolumes' },
  { title: 'Информация', pageName: 'dataContent' }
]
</script>
<style lang="SCSS"></style>
