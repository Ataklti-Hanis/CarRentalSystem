<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'

//login state
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showRegister = ref(false)

//registration state
const registerUserFirstName = ref('')
const registerUserLastName = ref('')
const registerUserEmail = ref('')
const registerUserPhone = ref('')
const registerPassword = ref('')
const confirmPassword = ref('')

const authStore = useAuthStore()
const router = useRouter()

//toggle between login and register
const toggleRegister = () => {
  showRegister.value = !showRegister.value
  errorMessage.value = ''
  successMessage.value = ''
}

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  //check if email and password are provided
  if (!email.value || !password.value) {
    Swal.fire('Oops!', 'Please Enter your email and password', 'error')
    loading.value = false
    return
  }

  try {
    const response = await fetch('http://localhost:3000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
    const data = await response.json()
    console.log('API Response:', data)
    console.log('Access Token:', data.accessToken)

    if (!response.ok) {
      if (data.message.includes('Invalid email') && data.message.includes('Invalid password')) {
        Swal.fire('Login Failed', 'Both email and password are incorrect', 'error')
      } else if (data.message.includes('Invalid email')) {
        Swal.fire('Login Failed', 'The email is incorrect', 'error')
      } else if (data.message.includes('Invalid password')) {
        Swal.fire('Login Failed', 'The password is incorrect', 'error')
      } else {
        Swal.fire('Login Failed', data.message || 'Invalid credentials', 'error')
      }
      throw new Error(data.message || 'Login failed')
    }
    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }
    if (!data.accessToken) {
      Swal.fire('Login Failed', 'No access token received', 'error')
      loading.value = false
      console.log('!data.access_token')
      return
    }

    //decoding the jwt token
    const decodedToken = jwtDecode(data.accessToken)

    // save the token and user details in the store
    authStore.login(data.accessToken, { email: email.value, role: decodedToken.role })

    console.log('Token and User Details:', data.accessToken, {
      email: email.value,
      role: decodedToken.role,
    })

    // clear inputs
    email.value = ''
    password.value = ''

    // redirect based on role

    if (decodedToken.role === 'admin') {
      router.push('/admin-dashboard')
    } else if (decodedToken.role === 'customer') {
      router.push('/customer-dashboard')
    } else {
      router.push('/')
    }
  } catch (err) {
    errorMessage.value = err.message
    console.log('Login Error:', err)
  } finally {
    loading.value = false
  }
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
// Handle Registration
const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  if (
    !registerUserFirstName.value ||
    !registerUserLastName.value ||
    !registerUserEmail.value ||
    !registerUserPhone.value ||
    !registerPassword.value ||
    !confirmPassword.value
  ) {
    Swal.fire('Oops!', 'Please fill in all fields', 'error')
    loading.value = false
    return
  }

  if (!isValidEmail(registerUserEmail.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address!',
    })
    loading.value = false
    return
  }

  if (registerPassword.value !== confirmPassword.value) {
    Swal.fire('Oops!', "Passwords don't match", 'error')
    loading.value = false
    return
  }
  try {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: registerUserFirstName.value,
        lastName: registerUserLastName.value,
        email: registerUserEmail.value,
        phone: registerUserPhone.value,
        password: registerPassword.value,
        confirmPassword: confirmPassword.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }
    Swal.fire({
      title: 'success',
      text: 'You have registered successfully, You can now login!',
      icon: 'success',
      confirmButtonText: 'OK',
    })

    successMessage.value = 'Registration Successful'

    // await handleLogin()
  } catch (err) {
    errorMessage.value = err.message
    console.error('Registration Error', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-800">
    <!-- Outer container, full screen background -->
    <div class="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
      <!-- Login form container -->
      <div
        v-if="!showRegister"
        class="bg-gray-800 bg-opacity-90 p-6 rounded-lg border border-gray-500"
      >
        <h2 class="text-2xl font-semibold text-center mb-6 text-white">Login</h2>
        <form @submit.prevent="handleLogin">
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mb-4 text-white placeholder-white"
            required
          />
          <input
            type="password"
            v-model="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mb-4 text-white placeholder-white"
            required
          />
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
          <p v-if="errorMessage" class="text-red-500 text-center mt-3">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-green-500 text-center mt-3">{{ successMessage }}</p>
          <p class="text-center mt-4 text-white">
            Don't have an account?
            <a href="#" class="text-blue-600 hover:underline" @click.prevent="toggleRegister">
              Register here
            </a>
          </p>
        </form>
      </div>

      <!-- Registration form container -->
      <div v-else>
        <h2 class="text-2xl font-semibold text-center mb-6 text-white">Register</h2>
        <form
          @submit.prevent="handleRegister"
          class="bg-gray-800 bg-opacity-90 p-6 rounded-lg border border-gray-500"
        >
          <input
            v-model="registerUserFirstName"
            type="text"
            placeholder="First Name"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mb-4 text-white placeholder-white"
            required
          />
          <input
            v-model="registerUserLastName"
            type="text"
            placeholder="Last Name"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mb-4 text-white placeholder-white"
            required
          />
          <input
            v-model="registerUserEmail"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mb-4 text-white placeholder-white"
            required
          />
          <input
            v-model="registerUserPhone"
            type="tel"
            placeholder="Phone Number"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mb-4 text-white placeholder-white"
          />
          <input
            v-model="registerPassword"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mb-4 text-white placeholder-white"
            required
          />
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mb-4 text-white placeholder-white"
            required
          />
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
          <p v-if="errorMessage" class="text-red-500 text-center mt-3">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-green-500 text-center mt-3">{{ successMessage }}</p>
          <p class="text-center mt-4 text-white">
            Already have an account?
            <a href="#" class="text-blue-600 hover:underline" @click="toggleRegister">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: You can further adjust the placeholder text color globally here if needed */
</style>

<style scoped>
/* You can also add custom styles here if needed */
</style>

<style scoped>
/* You can also add custom styles here if needed */
</style>

<style scoped></style>
