<template lang="pug">
button.button.button-primary( type="submit") {{text}}
  slot
</template>
<script setup>
/* eslint-disable no-unused-vars */
import { defineProps } from 'vue'
const props = defineProps(['text'])
</script>
<style lang="scss"></style>
