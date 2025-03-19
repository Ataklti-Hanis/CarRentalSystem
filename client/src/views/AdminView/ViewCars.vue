<script setup>
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { accessToken, logout } = authStore
const router = useRouter()
const cars = ref([])
const loading = ref(true)

const fetchCars = async () => {
  try {
    const response = await fetch('http://localhost:3000/car', {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch cars')
    }

    const data = await response.json()
    if (Array.isArray(data.items)) {
      cars.value = data.items.map((car) => {
        console.log('Car image path:', car.image)
        return { ...car, image: `http://localhost:3000/static/${car.image}`, isEditing: false }
      })
    }
  } catch (err) {
    console.error('Error Fetching courses', err)
  } finally {
    loading.value = false
  }
}
const editCar = (car) => {
  car.isEditing = !car.isEditing
}
const handleImageUpload = (car, event) => {
  const file = event.target.files[0] // Get the file selected by the user
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      // Set the image as base64 temporarily for display
      car.image = reader.result
    }
    reader.readAsDataURL(file) // Convert the file to base64 (for preview)
    car.imageFile = file // Store the file itself for uploading
  }
}

const saveCar = async (car) => {
  try {
    const formData = new FormData()
    formData.append('make', car.make)
    formData.append('model', car.model)
    formData.append('availability', car.availability)
    formData.append('year', car.year)
    formData.append('pricePerDay', car.pricePerDay)
    formData.append('status', car.status)

    if (car.imageFile) {
      formData.append('image', car.imageFile)
    }

    const response = await fetch(`http://localhost:3000/car/${car.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to update car')
    }

    car.isEditing = false
  } catch (err) {
    throw new Error('Error updating Car', err)
  }
}

const deleteCar = async (carId) => {
  const confirmDelete = await Swal.fire({
    title: 'Are you sure you want to delete this car?',
    icon: 'warning',
    showCancelButton: true,
    confirmButton: 'Yes, delete it!',
    cancelButtonText: 'No, keep it!',
  })

  if (!confirmDelete.isConfirmed) return

  try {
    const response = await fetch(`http://localhost:3000/car/${carId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete car')
    }

    cars.value = cars.value.filter((car) => car.id !== carId)
  } catch (err) {
    throw new Error('Error deleting car', err)
  }
}
const handleLogout = () => {
  logout()
  router.push('/')
}

onMounted(() => {
  fetchCars()
})
</script>

<template>
  <div class="view-cars-container">
    <h1>View Cars list</h1>
    <div v-if="loading" class="loading">Loading Cars...</div>
    <div v-else-if="cars.length === 0" class="no-cars">No Cars Found</div>
    <ul v-else>
      <li v-for="car in cars" :key="car.id" class="car-card">
        <div v-if="!car.isEditing">
          <img :src="car.image" alt="Car Image" />
          <div class="car-info">
            <h2>{{ car.make }}</h2>
            <p>Model: {{ car.model }}</p>
            <p>Availability: {{ car.availability }}</p>
            <p>Year: {{ car.year }}</p>
            <p>Price per Day: {{ car.pricePerDay }}</p>
            <p>
              <strong> {{ car.status }}</strong>
            </p>
          </div>
          <div class="button-group">
            <button @click="editCar(car)" class="update-btn">Update</button>
            <button @click="deleteCar(car.id)" class="delete-btn">Delete</button>
          </div>
        </div>
        <!-- Update car form -->
        <div class="edit-form" v-else>
          <div class="car-card">
            <div v-if="car.isEditing">
              <input v-model="car.make" placeholder="car make" />
              <input v-model="car.model" placeholder="car model" />
              <input v-model="car.availability" placeholder="car availability" />
              <input v-model="car.year" placeholder="car year" />
              <input v-model="car.pricePerDay" placeholder="car price per day" />
              <select id="status" class="status-select" v-model="car.status" required>
                <option value="AVAILABLE">Available</option>
                <option value="RENTED">Rented</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
              </select>
              <input type="file" @change="handleImageUpload($event, car)" accept="image/*" />
              <div class="btn-group">
                <button @click="saveCar(car)" class="update-btn">Save</button>
                <button @click="car.isEditing = false" class="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.view-cars-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 1.75rem;
  color: #007bff;
  margin-bottom: 20px;
  text-align: center;
}

.loading,
.no-cars {
  font-size: 1rem;
  color: #555;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding: 0;
  list-style-type: none;
}

.car-card {
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 8px;
  padding: 15px;
  width: calc(50% - 20px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.car-card img {
  width: 100%;
  height: 180px; /* Set a fixed height */
  object-fit: cover; /* Ensures the image fits within the area */
  border-radius: 8px;
  margin-bottom: 15px;
}

.car-card h2 {
  font-size: 1.4rem; /* Slightly bigger font for car title */
  color: #f1f1f1;
  margin: 10px 0;
  line-height: 1.4; /* Adds space between lines */
}

.car-card p {
  font-size: 1rem;
  color: #f1f1f1;
  margin: 5px 0;
  line-height: 1.4; /* Improve spacing between paragraphs */
}
.car-info {
  text-align: center;
}
.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
}
.status-select {
  width: 100%;
  max-width: 400px; /* Maximum width */
  padding: 12px 15px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #e3e6c3;
  border: 1px solid #ccc;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.status-select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.update-btn,
.delete-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 45%;
}

.update-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}

/* Edit Form Styling */
.edit-form {
  width: 100%; /* Full width */
  max-width: 500px; /* Max width to keep the form responsive */
  margin: 0 auto; /* Center align the form */
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loading {
  font-size: 1.5rem; /* Adjust the font size */
  color: #24031b; /* Set the color to a blue shade */
  text-align: center; /* Center the text horizontally */
  margin-top: 20px; /* Add some space above the loading text */
}

.edit-form input {
  width: 100%;
  max-width: 400px; /* Maximum width for input fields */
  padding: 12px 15px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #e3e6c3;
  transition: all 0.3s ease;
  box-sizing: border-box;
  outline: none;
}

.edit-form input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a blue shadow effect */
}

.edit-form input::placeholder {
  color: #888;
  font-style: italic;
}

.edit-form .btn-group {
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
}

.cancel-btn,
.update-btn {
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  width: 45%;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  border: none;
}

.cancel-btn:hover {
  background-color: #d32f2f;
}

.btn-group button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 45%;
}

.btn-group button:hover {
  background-color: #218838;
}

/* Media Queries for Responsiveness */
@media screen and (max-width: 768px) {
  .car-card {
    width: calc(50% - 20px); /* Adjust card width */
  }

  .edit-form {
    width: 100%;
    max-width: 100%; /* Ensure form fills the available space */
  }

  .car-card img {
    max-width: 150px; /* Resize the car image */
  }

  .button-group {
    flex-direction: column;
    align-items: stretch;
  }

  .update-btn,
  .delete-btn,
  .cancel-btn,
  .btn-group button {
    width: 100%; /* Full width buttons for smaller screens */
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 480px) {
  h1 {
    font-size: 1.5rem; /* Adjust heading font size for smaller screens */
  }

  .car-card {
    width: 100%; /* Full width cards on very small screens */
  }

  .car-card h2 {
    font-size: 1.1rem; /* Adjust car title size */
  }

  .car-card p {
    font-size: 0.9rem; /* Adjust paragraph font size */
  }

  .edit-form input {
    font-size: 0.9rem; /* Smaller font for form inputs */
  }

  .update-btn,
  .delete-btn {
    padding: 8px 15px; /* Adjust padding for smaller buttons */
  }

  .cancel-btn,
  .btn-group button {
    padding: 8px 15px;
  }
}
</style>
