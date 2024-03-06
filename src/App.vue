<script setup>
import navLink from './layout/nav.vue'
</script>

<template>
  <div class="wrap">
    <nav-link />
    <router-view />
  </div>

</template>

<style scoped>
.wrap {
  display: flex;
}

.right {
  flex: 1;
}
</style>
