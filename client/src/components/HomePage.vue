<template>
  <div class="min-h-screen flex flex-col items-center justify-between bg-gray-800 px-6 py-12">
    <!-- Main Content Section -->
    <div class="max-w-6xl w-full text-center space-y-8">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
        Welcome to the Car Rental System
      </h1>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto">
        Your one-stop solution for renting cars with ease and convenience.
      </p>

      <!-- Features Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          class="bg-gray-900 border border-gray-700 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
        >
          <h2 class="text-2xl font-semibold text-white">Browse Available Cars</h2>
          <p class="text-gray-400 mt-2">Explore a variety of cars, from economy to luxury.</p>
          <RouterLink
            to="/home-view-cars"
            class="inline-block mt-4 bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            View Cars
          </RouterLink>
        </div>

        <div
          class="bg-gray-900 border border-gray-700 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
        >
          <h2 class="text-2xl font-semibold text-white">Make a Reservation</h2>
          <p class="text-gray-400 mt-2">Book a car securely and quickly.</p>
          <RouterLink
            to="/reserve"
            class="inline-block mt-4 bg-green-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-600 transition duration-300"
          >
            Book Now
          </RouterLink>
        </div>

        <div
          class="bg-gray-900 border border-gray-700 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
        >
          <h2 class="text-2xl font-semibold text-white">Manage Your Rentals</h2>
          <p class="text-gray-400 mt-2">Track, view history, and manage bookings.</p>
          <RouterLink
            to="/my-rentals"
            class="inline-block mt-4 bg-yellow-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-yellow-600 transition duration-300"
          >
            My Rentals
          </RouterLink>
        </div>

        <div
          class="bg-gray-900 border border-gray-700 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
        >
          <h2 class="text-2xl font-semibold text-white">Customer Support</h2>
          <p class="text-gray-400 mt-2">Get help with any questions or issues.</p>
          <RouterLink
            to="/support"
            class="inline-block mt-4 bg-red-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-600 transition duration-300"
          >
            Contact Support
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="bg-gray-900 text-white py-8 w-full">
      <div class="max-w-6xl mx-auto text-center">
        <div class="flex justify-center space-x-6">
          <a
            href="https://www.youtube.com/@AtakltiHanis"
            target="_blank"
            class="hover:text-blue-500 transition duration-300"
          >
            <i class="fab fa-youtube"></i>
          </a>
          <a
            href="https://github.com/Ataklti-Hanis"
            target="_blank"
            class="hover:text-gray-500 transition duration-300"
          >
            <i class="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/ataklti-hanis-a85163347/"
            target="_blank"
            class="hover:text-blue-700 transition duration-300"
          >
            <i class="fab fa-linkedin"></i>
          </a>
          <a
            href="https://web.facebook.com/AtakltiH14"
            target="_blank"
            class="hover:text-blue-700 transition duration-300"
          >
            <i class="fab fa-facebook"></i>
          </a>
          <a
            href="https://www.tiktok.com/@ataklti7"
            target="_blank"
            class="hover:text-black transition duration-300"
          >
            <i class="fab fa-tiktok"></i>
          </a>
        </div>
        <p class="text-gray-400 mt-4">&copy; 2025 Car Rental System. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Add any logic needed for the homepage, if applicable
</script>

<style scoped></style>
