<script setup>
import { useAuthStore } from '@/stores/authStore' // Import Pinia Auth Store
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  await authStore.logout() // Clear Auth State
  router.push('/login') // Redirect to Login Page
}
</script>

<template>
  <div class="dashboard-container">
    <header>
      <h1>User Dashboard</h1>
      <div class="logout-container">
        <button class="logout-btn" @click="logout">🚪 Logout</button>
      </div>
    </header>

    <div class="main-content">
      <!-- Sidebar -->
      <nav class="sidebar">
        <ul>
          <li><router-link to="user-view-cars">🚘 View Cars</router-link></li>
          <!-- <li><router-link to="search-cars">🔍 Search Cars</router-link></li> -->
        </ul>
      </nav>

      <!-- Content Area -->
      <div class="content-area">
        <!-- Welcome Message -->
        <div class="welcome-message">
          <h2>Explore Available Cars</h2>
        </div>

        <!-- Display content for 'user-view-cars' route -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ✅ General Dashboard Styling (Same as Admin) */
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
  filter: blur(8px);
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

/* ✅ Main Content */
.main-content {
  display: flex;
  margin-top: 60px;
  width: 100%;
  height: calc(100vh - 60px);
}

/* ✅ Sidebar (Same as Admin) */
.sidebar {
  width: 220px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  margin-top: -1px;
}

.sidebar:hover {
  transform: translateX(0);
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 12px;
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

/* ✅ Content Area */
.content-area {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

/* ✅ Welcome Message */
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
</style>
