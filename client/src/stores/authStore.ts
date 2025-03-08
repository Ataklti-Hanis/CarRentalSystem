import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('accessToken') || null)
  const user = ref<any>(null)

  //method to Login
  const login = (token: string, userDetails: any) => {
    accessToken.value = token
    user.value = userDetails
    localStorage.setItem('accessToken', token)
  }
  //Method logout
  const logout = () => {
    accessToken.value = ''
    user.value = ''
    localStorage.removeItem('accessToken')
  }

  //check if user is authenticated
  const isAuthenticated = () => {
    return accessToken.value !== ''
  }

  return { accessToken, user, login, logout, isAuthenticated }
})
