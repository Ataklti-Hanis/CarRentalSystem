<script setup lang="ts">
// import { computed } from 'vue'
// import { RouterLink, RouterView } from 'vue-router'
// import { useAuthStore } from '@/stores/authStore'

// const authStore = useAuthStore()
// const isAuthenticated = computed(() => authStore.isAuthenticated())
</script>

<template>
  <div class="auth-container">
    <header>
      <nav>
        <RouterLink to="/" class="logo">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/aboutUs">About Us</RouterLink>
        <RouterLink to="/contactUs">Contact Us</RouterLink>
      </nav>
    </header>

    <!-- Content of the page -->
    <RouterView />
  </div>
</template>

<!-- <style scoped>
.auth-container {
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

.auth-container::before {
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

header {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: flex-end;
}

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

header {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: flex-end;
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
  color: #3498db;
}

.logo {
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

.router-view {
  margin-top: 60px;
  flex: 1;
  width: 100%;
}

.login-container,
.register-container {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  position: relative;
  margin: auto;
  transition: opacity 0.3s ease-in-out;
}

h1,
h2 {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
.auth-container {
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

.auth-container::before {
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

header {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: flex-end;
}

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

header {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: flex-end;
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
  color: #3498db;
}

.logo {
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

.router-view {
  margin-top: 60px;
  flex: 1;
  width: 100%;
}

.login-container,
.register-container {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  position: relative;
  margin: auto;
  transition: opacity 0.3s ease-in-out;
}

h1,
h2 {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 12px;
}

.success-message {
  color: #2ecc71;
  text-align: center;
  margin-top: 12px;
}

.toggle-text {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.toggle-text a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.toggle-text a:hover {
  text-decoration: underline;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 12px;
}

.success-message {
  color: #2ecc71;
  text-align: center;
  margin-top: 12px;
}

.toggle-text {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.toggle-text a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.toggle-text a:hover {
  text-decoration: underline;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style> -->

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Full-Screen Background Effect */
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  position: relative;
  margin: 0;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}

/* Background Blur Effect */
.auth-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/adrien-vajas-DIOJmxKCA6c-unsplash.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: blur(10px);
  z-index: -1;
}

/* Header and Navigation Styles */
header {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: flex-end;
}

/* Navigation */
nav {
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
}

nav a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s;
}

nav a:hover {
  color: #3498db;
}

/* Logo styling */
.logo {
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

/* Content Area Below the Navigation */
.router-view {
  margin-top: 80px;
  flex: 1;
  width: 100%;
  padding-bottom: 20px;
}

/* Responsive Design for Devices */
@media (max-width: 1024px) {
  nav a {
    font-size: 14px;
  }

  .logo {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  header {
    padding: 15px;
  }

  nav {
    gap: 10px;
  }

  nav a {
    font-size: 14px;
  }

  .logo {
    font-size: 14px;
  }

  .auth-container::before {
    filter: blur(8px); /* Reduce blur on smaller screens */
  }
}

@media (max-width: 480px) {
  header {
    padding: 10px;
  }

  nav a {
    font-size: 12px;
  }

  .logo {
    font-size: 12px;
  }

  .router-view {
    margin-top: 60px; /* Adjust margin for small screens */
  }

  .auth-container::before {
    filter: blur(5px); /* Further reduce blur for smaller screens */
  }
}

/* Login/Registration Form Styling */
.login-container,
.register-container {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  position: relative;
  margin: auto;
  transition: opacity 0.3s ease-in-out;
}

h1,
h2 {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

/* Error and Success Messages */
.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 12px;
}

.success-message {
  color: #2ecc71;
  text-align: center;
  margin-top: 12px;
}

/* Toggle Text Link */
.toggle-text {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.toggle-text a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.toggle-text a:hover {
  text-decoration: underline;
}

/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
