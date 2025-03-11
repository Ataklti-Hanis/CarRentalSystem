<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'
import { RouterLink, RouterView } from 'vue'

const authStore = useAuthStore()
const route = useRoute()

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

    <div class="router-view-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative; /* Added relative position for layering */
  overflow: hidden;
}

/* Background Styling with Filter */
.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/adrien-vajas-DIOJmxKCA6c-unsplash.jpg'); /* Your image */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: blur(10px); /* Apply blur effect only to the background */
  z-index: -1; /* Ensure the background is below the content */
}

header {
  width: 100%;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header nav {
  display: flex;
  gap: 20px;
}

header .logo {
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 18px;
}

header a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s;
}

header a:hover {
  color: #3498db;
}

.main-content {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px); /* Full height minus header */
  padding-top: 20px;
}

/* Sidebar Styling */
.sidebar {
  width: 250px;
  background-color: rgba(0, 0, 0, 0.7); /* Dark semi-transparent background */
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
  background-color: rgba(255, 255, 255, 0.85); /* Slightly transparent white background */
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

/* Mobile (Phones) */
@media (max-width: 480px) {
  header {
    padding: 10px;
  }

  header nav {
    flex-direction: column;
    gap: 10px;
  }

  .logo {
    font-size: 16px;
  }

  .logout-btn {
    padding: 8px 16px;
    font-size: 14px;
  }

  .main-content {
    flex-direction: column;
    height: auto;
  }

  .sidebar {
    width: 100%;
    padding: 10px;
    gap: 15px;
  }

  .content-area {
    padding: 15px;
  }
}

/* Tablet (Portrait) */
@media (max-width: 768px) {
  header {
    padding: 15px;
  }

  header nav {
    flex-direction: column;
    gap: 15px;
  }

  .logo {
    font-size: 18px;
  }

  .logout-btn {
    padding: 10px 18px;
    font-size: 15px;
  }

  .main-content {
    flex-direction: column;
    height: auto;
  }

  .sidebar {
    width: 80%;
    padding: 15px;
  }

  .content-area {
    padding: 20px;
  }
}

/* Small Laptop (Small desktop) */
@media (max-width: 1024px) {
  header {
    padding: 20px;
  }

  header nav {
    flex-direction: row;
    gap: 20px;
  }

  .logo {
    font-size: 20px;
  }

  .logout-btn {
    padding: 12px 20px;
    font-size: 16px;
  }

  .main-content {
    flex-direction: row;
    height: calc(100vh - 60px);
  }

  .sidebar {
    width: 250px;
    padding: 20px;
  }

  .content-area {
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  header {
    padding: 20px;
  }

  header nav {
    flex-direction: row;
    gap: 20px;
  }

  .logo {
    font-size: 20px;
  }

  .logout-btn {
    padding: 12px 20px;
    font-size: 16px;
  }

  .main-content {
    flex-direction: row;
    height: calc(100vh - 60px);
  }

  .sidebar {
    width: 250px;
    padding: 20px;
  }

  .content-area {
    padding: 20px;
  }
}
</style>
