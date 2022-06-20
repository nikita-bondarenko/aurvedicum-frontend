<template lang="pug">
DataHeader
router-view
div.back
  img(:src="BACK_IMG_URL")
</template>
<script setup>
/* eslint-disable no-unused-vars */
import DataHeader from '@/components/dataBase/DataHeader.vue'
import { BACK_IMG_URL } from '@/config'
</script>
<style lang="scss">
@import './style/style.scss';
</style>
