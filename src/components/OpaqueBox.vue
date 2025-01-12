<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="props.class" style="background-color: rgba(255, 255, 255, 0.7);">
    <slot />
  </div>
</template>
