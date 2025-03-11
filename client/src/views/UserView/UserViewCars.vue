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

<template>
  <div class="view-car-container">
    <div class="header">
      <h1>Our Cars</h1>
    </div>

    <div v-if="loading" class="loading">Loading Cars...</div>
    <div v-else-if="cars.length === 0" class="no-cars">No available cars</div>
    <div v-else class="cars-list">
      <div v-for="car in cars" :key="car.id" class="car-card" @click="handleCarClick(car)">
        <div class="car-info">
          <img :src="`http://localhost:3000/static/${car.image}`" alt="Car Image" />
          <h2>{{ car.make }}</h2>
          <!-- Show only make before clicking -->
        </div>
      </div>
    </div>

    <!-- Modal for car details -->
    <div v-if="selectedCar" class="car-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ selectedCar.make }}</h2>
          <span class="close-btn" @click="closeModal">&times;</span>
        </div>
        <img :src="`http://localhost:3000/static/${selectedCar.image}`" alt="Car Image" />
        <h2>{{ selectedCar.model }}</h2>
        <p><strong>Availability:</strong> {{ selectedCar.availability }}</p>
        <p><strong>Year:</strong> {{ selectedCar.year }}</p>
        <p><strong>Price per Day:</strong> ${{ selectedCar.pricePerDay }}</p>
        <p><strong>Status:</strong> {{ selectedCar.status }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General styles for the car view container */
.view-car-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

/* Header styles */
.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.5rem;
  color: #fff;
}

/* Loading and empty car message */
.loading,
.no-cars {
  font-size: 1.5rem;
  text-align: center;
  color: #0a0a23;
}

/* Cars list */
.cars-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.car-card {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 15px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
}

.car-card:hover {
  transform: translateY(-5px);
}

/* Car info */
.car-info {
  text-align: center;
}

.car-info img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.car-info h2 {
  font-size: 1.8rem;
  color: #f1f1f1;
  margin-top: 10px;
}

/* Styling for modal */
.car-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px; /* Reduce padding */
  border-radius: 10px;
  max-width: 400px; /* Reduce width */
  text-align: center;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  position: relative;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 10px;
}
.modal-header h2 {
  font-size: 1.4rem; /* Reduce font size */
  color: #f1f1f1;
  margin: 0;
}
.modal-content img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.modal-content h2 {
  font-size: 2rem;
  color: #f1f1f1;
}

.modal-content p {
  font-size: 0.9rem; /* Reduce text size */
  color: #f1f1f1;
  margin: 5px 0;
}

.close-btn {
  font-size: 1.8rem;
  cursor: pointer;
  color: #fff;
  background: #e74c3c;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition:
    background 0.3s ease-in-out,
    color 0.3s ease-in-out;
}

.close-btn:hover {
  background: #e74c3c;
  color: white;
}
</style>
