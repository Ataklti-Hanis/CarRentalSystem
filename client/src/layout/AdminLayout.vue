<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'
import { RouterLink, RouterView } from 'vue'

const authStore = useAuthStore()
const route = useRoute() // Access current route

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <div class="auth-container">
    <header>
      <nav>
        <RouterLink to="/admin-dashboard" class="logo">Admin Dashboard</RouterLink>
        <RouterLink to="/admin-dashboard/add-car">Add Car</RouterLink>
        <RouterLink to="/admin-dashboard/view-cars">View Cars</RouterLink>
        <RouterLink to="/logout" @click="logout">Logout</RouterLink>
      </nav>
    </header>

    <!-- Conditional Welcome Message for Admin Dashboard -->

    <div class="router-view-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
/* Admin Dashboard Container */
.auth-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

header {
  width: 100%;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.main-content {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px); /* Full height minus header */
}

/* Sidebar Styling */
.sidebar {
  width: 250px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 12px;
}

.sidebar a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.sidebar a:hover {
  color: #3498db;
}

/* Content Area Styling */
.content-area {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Welcome Message Styling */
.welcome-message {
  margin-top: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
