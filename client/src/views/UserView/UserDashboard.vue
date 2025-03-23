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
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <nav class="bg-gray-800 text-white w-64 p-6">
      <h2 class="text-2xl font-bold mb-8">Dashboard</h2>
      <ul class="space-y-4">
        <li>
          <router-link
            to="user-view-cars"
            class="text-lg text-gray-300 hover:text-yellow-500 transition duration-300"
            >🚘 View Cars</router-link
          >
        </li>
      </ul>
      <div class="mt-auto">
        <!-- Logout button is now positioned at the top right -->
      </div>
    </nav>

    <!-- Main Content Area -->
    <div class="flex-1 p-8 relative">
      <!-- Logout Button -->
      <button
        @click="logout"
        class="absolute top-6 right-6 w-24 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
      >
        🚪 Logout
      </button>

      <header class="mb-6">
        <h1 class="text-3xl font-semibold text-gray-800">User Dashboard</h1>
      </header>

      <!-- Welcome Message -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-700">Explore Available Cars</h2>
      </section>

      <!-- Display content for 'user-view-cars' route -->
      <router-view />
    </div>
  </div>
</template>

<style scoped>
/* You can further customize specific styles here if needed */
</style>
