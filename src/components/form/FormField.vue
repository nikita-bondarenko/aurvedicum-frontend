<template lang="">
  <!-- eslint-disable-next-line -->
  <label class="form__label">
    <span v-if="!!labelText" class="form__value">{{ labelText }}</span>

    <slot />
    <span  class="form__error"></span>
  </label>
</template>
<script setup>
/* eslint-disable no-unused-vars */

import { defineProps } from 'vue'
const props = defineProps(['labelText'])

</script>
<style lang="scss"></style>
