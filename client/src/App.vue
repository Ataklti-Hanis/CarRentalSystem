<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/authStore'
const authStore = useAuthStore()
const isAdmin = computed(() => authStore.user?.role === 'Admin')
const isAuthenticated = computed(() => authStore.isAuthenticated())
</script>

<template>
  <div class="auth-container">
    <RouterView />
  </div>
</template>
