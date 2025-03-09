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
  <div class="auth-container">
    <div class="login-container" v-if="!showRegister">
      <h2>LogIn</h2>
      <form class="login-form" v-if="!showRegister">
        <input type="email" placeholder="Enter your email" v-model="email" required />
        <input type="password" placeholder="Enter your password" v-model="password" required />
        <button type="button" @click="handleLogin" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

        <p class="toggle-text">
          Don't have an account?
          <a href="#" @click.prevent="toggleRegister">Register here</a>
        </p>
      </form>
    </div>
    <!-- Registration Form -->
    <div class="register-container" v-else>
      <h1>Register</h1>
      <form class="register-form">
        <input
          v-model="registerUserFirstName"
          type="text"
          placeholder="Enter your first Name"
          required
        />
        <input
          v-model="registerUserLastName"
          type="text"
          placeholder="Enter your last Name"
          required
        />
        <input v-model="registerUserEmail" type="email" placeholder="Enter your email" required />
        <input v-model="registerUserPhone" type="tel" placeholder="Enter you phone number" />
        <input
          v-model="registerPassword"
          type="password"
          placeholder="Enter your password"
          required
        />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
        />
        <button @click="handleRegister" type="button" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p class="toggle-text">
          Already have an account?
          <a href="#" @click="toggleRegister">login here</a>
        </p>
      </form>
    </div>
  </div>
</template>
<style>
/* Global styling for full-screen background effect */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/adrien-vajas-DIOJmxKCA6c-unsplash.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: blur(8px);
  z-index: -1;
}

/* Shared form styling */
.login-container,
.register-container {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-in-out;
}

h2,
h1 {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 12px;
}

.success-message {
  color: #2ecc71;
  text-align: center;
  margin-top: 12px;
}

.toggle-text {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.toggle-text a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.toggle-text a:hover {
  text-decoration: underline;
}

/* Smooth fade-in effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
