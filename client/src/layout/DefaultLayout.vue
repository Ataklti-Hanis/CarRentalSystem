<template>
  <div class="min-h-screen bg-gray-900 text-gray-300">
    <!-- Header / Navbar -->
    <header class="bg-gray-800 shadow-md fixed w-full top-0 left-0 z-50">
      <nav class="container mx-auto flex justify-end items-center py-4 px-6">
        <!-- Navigation Links (All aligned to Right) -->
        <div class="flex gap-6">
          <RouterLink to="/" class="hover:text-blue-400 transition duration-300 font-medium">
            Home
          </RouterLink>
          <RouterLink to="/login" class="hover:text-blue-400 transition duration-300 font-medium">
            Login
          </RouterLink>
          <RouterLink to="/aboutUs" class="hover:text-blue-400 transition duration-300 font-medium">
            About Us
          </RouterLink>
          <RouterLink
            to="/contactUs"
            class="hover:text-blue-400 transition duration-300 font-medium"
          >
            Contact Us
          </RouterLink>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <main class="pt-16">
      <RouterView />
    </main>
  </div>
</template>
