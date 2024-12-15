<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WeatherComponent from '@/components/WeatherComponent.vue'
</script>

<template>
  <WeatherComponent></WeatherComponent>
  <RouterView />
</template>

<style scoped>

</style>
