<template lang="pug">
fieldset.form__block
  legend.form__legend
    h3.form__block-title {{legend}}
    slot
</template>
<script setup>
/* eslint-disable no-unused-vars */

import { defineProps } from 'vue'
const props = defineProps(['legend'])
</script>
