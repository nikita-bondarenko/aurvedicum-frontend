<template lang="">
  <!-- eslint-disable-next-line -->
  <label class="form__label">
    <span class="form__value">{{ labelText }}</span>

    <slot />
    <span v-if="errorText" class="form__error">{{ errorText }}</span>
  </label>
</template>
<script setup>
/* eslint-disable no-unused-vars */

import { defineProps } from 'vue'
const props = defineProps(['labelText', 'errorText'])
</script>
<style lang=""></style>
