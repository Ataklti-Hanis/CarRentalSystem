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
    console.log('Car data to submit:', cars.value)

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
            <input type="text" id="make" v-model="cars.make" required />
          </div>

          <div class="form-item">
            <label for="model">Car Model:</label>
            <input type="text" id="model" v-model="cars.model" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-item">
            <label for="year">Year of Manufacture:</label>
            <input type="number" id="year" v-model="cars.year" required />
          </div>

          <div class="form-item">
            <label for="pricePerDay">Price Per Day ($):</label>
            <input type="number" id="pricePerDay" v-model="cars.pricePerDay" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-item">
            <label for="status">Status:</label>
            <select id="status" v-model="cars.status" required>
              <option value="AVAILABLE">Available</option>
              <option value="RENTED">Rented</option>
              <option value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</option>
            </select>
          </div>

          <div class="form-item">
            <label for="availability">Availability:</label>
            <input type="text" id="availability" v-model="cars.availability" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-item full-width">
            <label for="image">Upload Car Image:</label>
            <input type="file" id="image" @change="handleImageUpload" accept="image/*" required />
          </div>
        </div>

        <div class="button-row">
          <button type="submit" :disabled="loading" class="form-btn">
            {{ loading ? 'Adding...' : 'Add Car' }}
          </button>

          <!-- <button type="button" @click="navigateToDashboard" class="form-btn">
            Go to Dashboard
          </button> -->
        </div>

        <p class="success" v-if="success">{{ success }}</p>
        <p class="error" v-if="err">{{ err }}</p>
      </fieldset>
    </form>
  </div>
</template>
<style scoped>
.insert-car-container {
  width: 100%;
  max-width: 600px;
  margin: 5px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.nav-btn {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
select {
  padding: 10px;
  margin-top: 6px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
  appearance: none; /* Remove default browser styling */
}

select:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

select option {
  padding: 10px;
}

.nav-btn:hover {
  background-color: #0056b3;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

fieldset {
  border: none;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

legend {
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  text-align: center;
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  flex: 1 1 calc(50% - 15px);
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

input {
  padding: 10px;
  margin-top: 6px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

input[type='file'] {
  padding: 6px;
  font-size: 13px;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%; /* Make the button row span the full width */
}

.form-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Make buttons take the full width */
}

.form-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.form-btn:hover:not(:disabled) {
  background-color: #218838;
}

.success {
  color: #28a745;
  font-weight: bold;
  text-align: center;
  margin-top: 12px;
}

.error {
  color: #dc3545;
  font-weight: bold;
  text-align: center;
  margin-top: 12px;
}

.logout-btn {
  background-color: #dc3545;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .insert-car-container {
    padding: 20px;
    max-width: 450px;
  }

  .form-item {
    flex: 1 1 100%; /* Stack fields on smaller screens */
  }

  .form-btn {
    width: 100%; /* Make buttons take full width on small screens */
  }

  .button-row {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
