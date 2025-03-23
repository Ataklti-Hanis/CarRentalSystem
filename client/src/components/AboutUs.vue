<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-6 py-12">
    <!-- About Us Section -->
    <div
      class="max-w-3xl w-full text-center bg-opacity-80 bg-black p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <h2 class="text-3xl sm:text-4xl font-bold text-yellow-400 uppercase mb-4">About Us</h2>
      <p class="text-lg text-white mb-8">
        Welcome to our Car Rental System! We offer a wide range of vehicles for rent, providing
        excellent service and customer satisfaction. Our team is dedicated to making your car rental
        experience as smooth and easy as possible.
      </p>

      <!-- Address and Location -->
      <div class="mt-8">
        <h3 class="text-2xl font-semibold text-yellow-400 mb-2">Our Location</h3>
        <p class="text-lg text-white">Visit us at:</p>
        <p class="text-lg text-yellow-400 font-bold mt-2">
          1234 Car Rental St, Addis Abeba, ABC-123, Ethiopia
        </p>

        <!-- Map Embed Section -->
        <div class="mt-8 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159726.19162618193!2d38.7500846!3d9.1453744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b84454a9e8ed9%3A0x43a2b395dc345404!2sAddis%20Abeba%2C%20Ethiopia!5e0!3m2!1sen!2sin!4v1625743789743!5m2!1sen!2sin"
            class="w-full h-72 sm:h-80 lg:h-96 border-none"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
      </div>
    </div>
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

<script setup></script>

<style scoped>
/* Tailwind CSS classes handle most styling, so no custom styles are needed here */
</style>
