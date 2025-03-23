<template>
  <div class="min-h-screen bg-gray-800 text-white py-12 px-6">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold">Our Cars</h1>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-xl text-gray-300 text-center">Loading Cars...</div>

    <!-- No cars available state -->
    <div v-else-if="cars.length === 0" class="text-xl text-gray-300 text-center">
      No available cars
    </div>

    <!-- Cars List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="car in cars"
        :key="car.id"
        class="bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
        @click="handleCarClick(car)"
      >
        <img
          :src="`http://localhost:3000/static/${car.image}`"
          alt="Car Image"
          class="w-full h-56 object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold text-yellow-500">{{ car.make }}</h2>
        </div>
      </div>
    </div>

    <!-- Modal for Car Details -->
    <div
      v-if="selectedCar"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-900 rounded-lg overflow-hidden w-11/12 md:w-1/2 p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl text-yellow-500">{{ selectedCar.make }} - {{ selectedCar.model }}</h2>
          <span @click="closeModal" class="text-2xl cursor-pointer text-white">&times;</span>
        </div>
        <img
          :src="`http://localhost:3000/static/${selectedCar.image}`"
          alt="Car Image"
          class="w-full h-64 object-cover my-4"
        />
        <div>
          <p class="text-lg"><strong>Availability:</strong> {{ selectedCar.availability }}</p>
          <p class="text-lg"><strong>Year:</strong> {{ selectedCar.year }}</p>
          <p class="text-lg"><strong>Price per Day:</strong> ${{ selectedCar.pricePerDay }}</p>
          <p class="text-lg"><strong>Status:</strong> {{ selectedCar.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const cars = ref([])
const authStore = useAuthStore()
const router = useRouter()
const loading = ref(true)
const selectedCar = ref(null)

const fetchCars = async () => {
  try {
    const response = await fetch('http://localhost:3000/car', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch cars')
    }

    const data = await response.json()
    cars.value = data.items
    await nextTick()
  } catch (err) {
    console.error('Error Fetching cars', err)
  } finally {
    loading.value = false
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const handleCarClick = (car) => {
  selectedCar.value = car
}

const closeModal = () => {
  selectedCar.value = null
}

onMounted(() => {
  fetchCars()
})
</script>

<style scoped>
/* You can further customize the form appearance here if needed. Tailwind handles most styling */
</style>
