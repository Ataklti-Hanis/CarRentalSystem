<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-800 px-6 py-12">
    <!-- Contact Us Section -->
    <div
      class="max-w-4xl w-full bg-gray-800 bg-opacity-90 rounded-lg border p-8 border-gray-500 shadow-lg"
    >
      <h2 class="text-3xl font-semibold text-white mb-4">Contact Us</h2>
      <p class="text-lg text-white mb-8">
        If you have any questions, feel free to reach out to us. We are here to help you!
      </p>

      <!-- Contact Form -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Name Input -->
        <div class="flex flex-col">
          <label for="name" class="text-lg text-white mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-900"
          />
        </div>

        <!-- Email Input -->
        <div class="flex flex-col">
          <label for="email" class="text-lg text-white mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-900"
          />
        </div>

        <!-- Message Textarea -->
        <div class="flex flex-col">
          <label for="message" class="text-lg text-white mb-2">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="4"
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-900"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Send Message
        </button>
      </form>
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

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const submitForm = () => {
  const { name, email, message } = form.value
  const subject = encodeURIComponent(`Message from ${name}`)
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)

  window.location.href = `mailto:atakltihanis14@gmail.com?subject=${subject}&body=${body}`
}
</script>

<style scoped>
/* You can further customize the form appearance here if needed. Tailwind handles most styling */
</style>
