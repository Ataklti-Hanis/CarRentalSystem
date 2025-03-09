<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated())
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

<style>
/* Full-Screen Background Effect */
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  /* position: fixed; */
  top: 0;
  left: 0;
  overflow: hidden;
  background-image: url('@/assets/adrien-vajas-DIOJmxKCA6c-unsplash.jpg');
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: top left; /* Makes sure the image is positioned at the top-left corner */
  /* background-attachment: fixed; */
  margin: 0; /* Ensure no margin on the container */
  padding: 0; /* Ensure no padding inside the container */
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
  background-position: top left; /* Same as the main container */
  background-attachment: fixed;
  filter: blur(8px);
  z-index: -1;
}

/* Header and Navigation Styles */
header {
  width: 100%;
  position: fixed; /* Fix header at the top */
  top: 0;
  right: 0; /* Align header to the right */
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 10; /* Ensure header stays above other content */
  display: flex;
  justify-content: flex-end; /* Align nav items to the right */
}

/* Other styles remain the same */

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
  position: fixed; /* Fix header at the top */
  top: 0;
  right: 0; /* Align header to the right */
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

/* Logo Styling */
.logo {
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

/* Content Area Below the Navigation */
.router-view {
  margin-top: 60px; /* Create space below the fixed header */
  flex: 1;
  width: 100%;
}

/* Form Container (Login/Register) */
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

/* Heading styles */
h1,
h2 {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

/* Input Fields */
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

/* Button Styling */
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

/* Error & Success Messages */
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

/* Toggle Text (for switching between login/register) */
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
