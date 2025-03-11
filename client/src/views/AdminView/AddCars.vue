<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const { accessToken, logout } = authStore
const router = useRouter()
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

  formData.append('make', cars.value.make)
  formData.append('model', cars.value.model)
  formData.append('availability', cars.value.availability)
  formData.append('year', cars.value.year)
  formData.append('pricePerDay', cars.value.pricePerDay)
  formData.append('status', cars.value.status)
  if (cars.value.image) {
    formData.append('image', cars.value.image)
  }

  try {
    const response = await fetch('http://localhost:3000/car', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
      credentials: 'include',
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
  router.push('/admin-dashboard')
}

//Logout
const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="insert-car-container">
    <h1>Add New Car</h1>
    <form @submit.prevent="addCar">
      <fieldset>
        <div class="form-row">
          <div class="form-item">
            <label for="make">Car Make:</label>
            <input
              type="text"
              id="make"
              v-model="cars.make"
              placeholder="Enter car make"
              required
            />
          </div>

          <div class="form-item">
            <label for="model">Car Model:</label>
            <input
              type="text"
              id="model"
              v-model="cars.model"
              placeholder="Enter car model"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-item">
            <label for="year">Year of Manufacture:</label>
            <input
              type="number"
              id="year"
              v-model="cars.year"
              placeholder="Enter year of manufacture"
              required
            />
          </div>

          <div class="form-item">
            <label for="pricePerDay">Price Per Day ($):</label>
            <input
              type="number"
              id="pricePerDay"
              v-model="cars.pricePerDay"
              placeholder="Enter price per day"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-item">
            <label for="status">Status:</label>
            <select id="status" v-model="cars.status" required>
              <option value="" disabled selected>Select Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="RENTED">Rented</option>
              <option value="UNDER_MAINTENANCE">Under Maintenance</option>
            </select>
          </div>

          <div class="form-item">
            <label for="availability">Availability:</label>
            <input
              type="text"
              id="availability"
              v-model="cars.availability"
              placeholder="Enter availability"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-item full-width">
            <label for="image">Upload Car Image:</label>
            <input
              type="file"
              id="image"
              @change="handleImageUpload"
              accept="image/*"
              required
              class="file-input"
            />
          </div>
        </div>

        <div class="button-row">
          <button type="submit" :disabled="loading" class="form-btn">
            {{ loading ? 'Adding...' : 'Add Car' }}
          </button>
        </div>

        <p class="success" v-if="success">{{ success }}</p>
        <p class="error" v-if="err">{{ err }}</p>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>
.insert-car-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #3498db;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0 auto;
}

.form-item {
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  margin-right: 45px;
}

label {
  color: white;
  margin-right: 10px;
  width: 30%;
  text-align: right;
}

input[type='text'],
input[type='number'],
select,
input[type='file'] {
  width: 60%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

input[type='file'] {
  background-color: #f0f0f0;
  cursor: pointer;
}

input[type='file']:hover {
  background-color: #e0e0e0;
}
.button-row {
  display: flex;
  justify-content: center; /* Center the button horizontally */
  width: 100%;
}
button.form-btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 80%;
  margin: 0 auto;
}

button.form-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.success,
.error {
  text-align: center;
  font-weight: bold;
}

.success {
  color: green;
}

.error {
  color: red;
}

/* Media Queries for responsiveness */
@media screen and (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .form-item {
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    text-align: left;
    width: 100%;
    margin-bottom: 5px;
  }

  input[type='text'],
  input[type='number'],
  select,
  input[type='file'] {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .insert-car-container {
    padding: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .form-item input,
  .form-item select {
    font-size: 1rem;
  }

  button.form-btn {
    font-size: 14px;
  }
}
</style>
