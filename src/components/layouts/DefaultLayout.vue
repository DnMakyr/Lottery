<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div class="container mx-auto max-w-4xl">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>
