<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
<template>
  <div class="dashboard-container">
    <!-- Header -->
    <header>
      <h1>Admin Dashboard</h1>
      <div class="logout-container">
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
    </header>

    <div class="main-content">
      <!-- Sidebar Navigation -->
      <nav class="sidebar">
        <ul>
          <li><router-link to="add-cars">Add Cars</router-link></li>
          <li><router-link to="view-cars">View Cars</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
/* Dashboard Container */
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding-top: 80px; /* Add padding for the header */
}

/* Header Styles */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e3d58;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

header h1 {
  margin: 0;
}

.logout-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.logout-btn {
  background-color: #f56c42;
  color: white;
  padding: 10px 30px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #d45a2e;
}

/* Main Content */
.main-content {
  display: flex;
  flex: 1;
  margin-top: 20px; /* Ensure the main content starts below the header */
}

/* Sidebar Styles */
.sidebar {
  width: 150px; /* Set a fixed width for the sidebar */
  background-color: #2c3e50;
  padding: 10px;
  color: white;
  position: fixed;
  top: 60px; /* Start below the header */
  left: 0;
  bottom: 0;
  z-index: 500;
  overflow-y: auto; /* Make sidebar scrollable if content overflows */
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 20px 0; /* Adjust the margin for spacing */
}

.sidebar li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: block;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sidebar li a:hover {
  background-color: #34495e;
}

/* Page Content */
.content {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-left: 2px solid #dcdcdc;
  margin-left: 240px; /* Ensure space for the sidebar */
}
</style>
