<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute() // Access current route

console.log('Current route name:', route.name)
console.log('Current route path:', route.path)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="dashboard-container">
    <header>
      <h1>Admin Dashboard</h1>
      <div class="logout-container">
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
    </header>

    <div class="main-content">
      <nav class="sidebar">
        <ul>
          <li><router-link to="admin-dashboard">Admin Dashboard</router-link></li>
          <li><router-link to="add-cars">➕Add Cars</router-link></li>
          <li><router-link to="view-cars">🚘View Cars</router-link></li>
        </ul>
      </nav>

      <!-- Main Content Area -->
      <div class="content-area">
        <div v-if="route.path === '/admin-dashboard'" class="welcome-message">
          <h2>Welcome to Car Rental System Admin Dashboard</h2>
        </div>

        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background-image: url('@/assets/adrien-vajas-DIOJmxKCA6c-unsplash.jpg');
  background-size: cover;
  background-position: top left;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
}

/* Background Blur Effect */
.dashboard-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/adrien-vajas-DIOJmxKCA6c-unsplash.jpg');
  background-size: cover;
  background-position: top left;
  background-attachment: fixed;
  filter: blur(20px);
  z-index: -1;
}

.welcome-message {
  text-align: center;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
}

.welcome-message h2 {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

/* Header and Navigation Styles */
header {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 0 23px;
}

.logout-container {
  display: flex;
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
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

/* Main Content Area Below the Header */
.main-content {
  display: flex;
  margin-top: 60px;
  width: 100%;
  height: calc(100vh - 60px);
}

.sidebar {
  width: 220px; /* Increase width for better spacing */
  background-color: rgba(0, 0, 0, 0.4); /* Dark background */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
  border-top-right-radius: 12px; /* Rounded top-right corner */
  border-bottom-right-radius: 12px; /* Rounded bottom-right corner */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Shadow for depth */
  margin-top: -2px;
  transition: all 0.3s ease;
}

.sidebar:hover {
  transform: translateX(0); /* Slight hover effect to give depth */
}

.sidebar ul {
  list-style-type: none; /* Remove default bullet points */
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 12px; /* Adds space between the list items */
}

.sidebar a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s;
}

.sidebar a:hover {
  color: #3498db;
}

/* Content Area (Main Area for Router View) */
.content-area {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}

/* Smooth Fade-In Transition for Forms */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
