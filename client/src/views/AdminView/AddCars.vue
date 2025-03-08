<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const { accessToken, logout } = authStore
const router = useRouter
const cars = ref({
  make: '',
  model: '',
  availability: '',
  year: '',
  pricePerDay: '',
  status: '',
  image: null,
})
const err = ref('')
const success = ref('')
const loading = ref(false)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    cars.value.image = file
  }
}

//function to add cars
const addCar = async () => {
  err.value = ''
  success.value = ''
  if (!accessToken) {
    Swal.fire({
      icon: 'error',
      title: 'Unauthorized',
      text: 'You are not logged in',
    })
    return
  }
  loading.value = true
  const formData = new FormData()

  formData.append('make', cars.value, make)
  formData.append('model', cars.value.model)
  formData.append('availability', cars.value.availability)
  formData.append('year', cars.value.year)
  formData.append('pricePerDay', cars.value.pricePerDay)
  formData.append('status', cars.value.status)
  if (cars.value.image) {
    formData.append('image', cars.value.image)
  }

  try {
    const response = await fetch('http://localhost:3000/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to add car')
    }
    Swal.fire({
      icon: 'success',
      title: 'Car Added',
      text: 'Car added successfully!',
      timer: 2000,
      timerProgressBar: true,
    })
    //if cars create successfully reset the form
    cars.value = {
      make: '',
      model: '',
      availability: '',
      year: '',
      pricePerDay: '',
      status: '',
      image: '',
    }

    success.value = 'Car added successfully'
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.message || 'Something went wrong!',
    })
  } finally {
    loading.value = false
  }
}

//Navigate to Dashboard
const navigateToDashboard = () => {
  router.push('/dashboard')
}

//Logout
const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="insert-car-container">
    <div class="nav-links">
      <router-link to="view-cars" class="nav-btn">View Cars List</router-link>
    </div>
    <h1>Add New Cars</h1>
    <form @submit.prevent="addCar">
      <input type="text" placeholder="Company of the car" v-model="cars.make" required />
      <input type="text" placeholder="Model of the car" v-model="cars.model" required />
      <input type="number" placeholder="Year of the car made" v-model="cars.year" required />
      <input
        type="number"
        placeholder="Price per day the car rented"
        v-model="cars.pricePerDay"
        required
      />
      <input type="text" placeholder="Status of the car" v-model="cars.status" required />
      <input
        type="text"
        placeholder="Availability of the car"
        v-model="cars.availability"
        required
      />
      <!-- upload image -->
      <input type="file" @change="handleImageUpload" accept="image/*" required />

      <button type="submit" :disabled="loading">{{ loading ? 'Adding...' : 'Add Car' }}</button>

      <p class="success" v-if="success">{{ success }}</p>
      <p class="error" v-if="err">{{ err }}</p>
    </form>
    <button class="logout-btn" @click="handleLogout">Logout</button>
  </div>
</template>
