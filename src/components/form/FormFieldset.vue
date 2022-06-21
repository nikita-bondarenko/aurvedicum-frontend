<template lang="pug">
fieldset.form__block
  legend.form__legend {{legend}}
    slot
</template>
<script setup>
/* eslint-disable no-unused-vars */

import { defineProps } from 'vue'
const props = defineProps(['legend'])
</script>
