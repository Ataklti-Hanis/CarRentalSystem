<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
const cars = ref([])
const authStore = useAuthStore()
const router = useRouter()
const loading = ref(true)

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

    cars.value = [...cars.value, ...data.items]
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

onMounted(() => {
  fetchCars()
})
</script>
<template>
  <div class="view-car-container">
    <div class="header"></div>
    <div v-if="loading" class="loading">Loading Cars...</div>
    <div v-else-if="cars.length === 0" class="no-cars">No available cars</div>
    <div v-else class="cars-list">
      <div v-for="car in cars" :key="car.id" class="car-card">
        <div class="car-info">
          <img :src="`http://localhost:3000/static/${car.image}`" alt="Car Image" />

          <h2>{{ car.make }}</h2>
          <h3>{{ car.model }}</h3>
          <p>Availability: {{ car.availability }}</p>
          <p>Year: {{ car.year }}</p>
          <p>Price per Day: {{ car.pricePerDay }}</p>
          <p>
            <strong> {{ car.status }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Global styles for the car view container */
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
  color: #333;
}

/* Loading and empty car message */
.loading,
.no-cars {
  font-size: 1.5rem;
  text-align: center;
  color: #888;
}

.error {
  font-size: 1.2rem;
  text-align: center;
  color: red;
  margin-top: 10px;
}

/* Cars list */
.cars-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.car-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 15px;
  transition: transform 0.2s ease-in-out;
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
  color: #333;
  margin-top: 10px;
}

.car-info h3 {
  font-size: 1.4rem;
  color: #666;
}

.car-info p {
  font-size: 1rem;
  color: #444;
  margin: 5px 0;
}

.car-info p strong {
  color: #e74c3c;
}

/* Styling for availability */
.car-info p {
  font-weight: bold;
}
</style>
