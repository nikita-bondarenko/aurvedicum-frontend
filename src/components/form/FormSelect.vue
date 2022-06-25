<template lang="">
  <FormField :label-text="labelText">
    <select class="form__select" v-model="selected">
      <option class="select-placeholder" disabled selected hidden value="">
        {{ placeholderText }}
      </option>
      <option v-for="item in items" :key="item.id" :value="item.id">
        {{ item.title }}
      </option>
    </select>
  </FormField>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin'
import { defineComponent } from 'vue'
export default defineComponent({
  mixins: [formFieldMixin],
  props: ['items'],
  computed: {
    selected: {
      get() {
        return ''
      },
      set(value) {
        this.value = value
      }
    }
  }
})
</script>
