<template lang="pug">
button.small-button.button( type="button") {{ text }}
  slot
</template>
<script setup>
/* eslint-disable no-unused-vars */
import { defineProps } from 'vue'
const props = defineProps(['text'])
</script>
<style lang="scss"></style>
