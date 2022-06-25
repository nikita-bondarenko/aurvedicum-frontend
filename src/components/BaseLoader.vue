<template lang="pug">
.spinner
  .spinner__body
    .spinner__limb
</template>
<script setup>
/* eslint-disable no-unused-vars */
</script>
<style lang="scss">
@import '@/style/variables.scss';
.spinner {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $black;
  &__body {
    position: relative;
    height: 64px;
    width: 64px;
  }

  &__limb {
    position: absolute;

    border: 10px solid transparent;
    border-top-color: $green;
    border-radius: 50%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    animation: rotate 0.5s linear reverse infinite;
  }
}

@keyframes rotate {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
}
</style>
