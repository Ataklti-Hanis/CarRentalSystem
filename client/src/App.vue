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

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-image: url('@/assets/adrien-vajas-DIOJmxKCA6c-unsplash.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* Background Blur Effect */
.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/adrien-vajas-DIOJmxKCA6c-unsplash.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: blur(8px);
  z-index: -1;
}

/* Header and Navigation Styles */
header {
  width: 100%;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 10; /* Ensure header stays above other content */
  display: flex;
  justify-content: flex-end; /* Align nav items to the right */
}

nav {
  display: flex;
  gap: 20px;
  padding: 10px 0;
}

nav a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s;
}

nav a:hover {
  color: #3498db; /* Blue color on hover */
}

/* Content Area Below the Navigation */
.router-view {
  margin-top: 60px; /* Create space below the fixed header */
  flex: 1;
  width: 100%;
}
</style>
