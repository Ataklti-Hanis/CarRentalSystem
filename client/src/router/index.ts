import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import Login from '@/views/Login.vue'
import AdminDashboard from '@/views/AdminView/AdminDashboard.vue'
import AddCars from '@/views/AdminView/AddCars.vue'
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '@/stores/authStore'
import HomePage from '@/components/HomePage.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import AboutUs from '@/components/AboutUs.vue'
import ContactUs from '@/components/ContactUs.vue'

const isTokenExpired = (token: string) => {
  try {
    const decodedToken: any = jwtDecode(token)
    return decodedToken.exp * 1000 < Date.now()
  } catch (err) {
    return true
  }
}
const authGuard =
  (role: string[] = []) =>
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken

    if (!token || isTokenExpired(token)) {
      next('/')
    }

    const decodedToken: any = jwtDecode(token as string)
    if (role.length && !role.includes(decodedToken.role)) {
      return next('/')
    }
    next()
  }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    children: [
      { path: '', component: HomePage },
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/aboutUs', // New About Us route
        name: 'AboutUs', // Route name
        component: AboutUs, // Component for the About Us page
      },
      {
        path: '/contactUs',
        name: 'ContactUs',
        component: ContactUs,
      },
    ],
  },

  {
    path: '/dashboard',
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const authStore = useAuthStore()
      const token = authStore.accessToken

      if (!token || isTokenExpired(token)) {
        return next('/')
      }
      const decodedToken: any = jwtDecode(token)
      if (decodedToken.role === 'admin') {
        return next('/admin-dashboard')
      } else {
        return next('/user-dashboard')
      }
    },
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    beforeEnter: authGuard(['admin']),
    children: [
      {
        path: '/add-cars',
        component: AddCars,
      },
    ],
  },
  {
    path: '/add-cars',
    component: AddCars,
    beforeEnter: authGuard(['admin']),
  },
  // {
  //   path: '/user-dashboard',
  //   component: UserDashboard,
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
