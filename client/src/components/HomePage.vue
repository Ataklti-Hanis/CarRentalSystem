<template>
  <div class="home-container">
    <div class="home-content">
      <h1>Welcome to the Car Rental System</h1>
      <p>Your one-stop solution for renting cars with ease and convenience.</p>

      <div class="features">
        <div class="feature">
          <h2>Browse Available Cars</h2>
          <p>
            Explore a wide variety of cars to suit your needs. From economy to luxury, we've got it
            all.
          </p>
          <RouterLink to="/user-view-cars" class="cta-link">View Cars</RouterLink>
        </div>

        <div class="feature">
          <h2>Make a Reservation</h2>
          <p>Book a car for your trip today. Secure, simple, and fast!</p>
          <RouterLink to="/reserve" class="cta-link">Book Now</RouterLink>
        </div>
        <div class="feature">
          <h2>Manage Your Rentals</h2>
          <p>Track your rentals, view history, and manage upcoming bookings easily.</p>
          <RouterLink to="/my-rentals" class="cta-link">My Rentals</RouterLink>
        </div>
        <!-- New Feature Section -->
        <div class="feature">
          <h2>Customer Support</h2>
          <p>Get help with any questions or issues you have regarding your rentals.</p>
          <RouterLink to="/support" class="cta-link">Contact Support</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Add any logic needed for the homepage, if applicable
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 50px;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  margin: 90px;
}

.home-content {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #3498db;
}

p {
  font-size: 18px;
  margin-bottom: 40px;
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}

.feature {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  text-align: center;
  flex: 1 1 calc(33.333% - 20px); /* Flex items adjust based on screen width */
}

.feature h2 {
  font-size: 22px;
  color: #ecf0f1;
  margin-bottom: 10px;
}

.cta-link {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

.cta-link:hover {
  background-color: #2980b9;
}

/* Mobile (Phones) */
@media (max-width: 480px) {
  .home-container {
    margin-top: 50px;
    padding: 20px;
  }

  .home-content {
    padding: 20px;
  }

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    margin-bottom: 30px;
  }

  .features {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .feature {
    width: 100%;
    max-width: 350px;
    margin-bottom: 25px;
    padding: 25px;
  }

  .cta-link {
    font-size: 14px;
    padding: 12px 20px;
  }
}

/* Tablet (Portrait) */
@media (max-width: 768px) {
  .home-container {
    margin-top: 50px;
    padding: 20px;
  }

  .home-content {
    padding: 20px;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 15px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .features {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .feature {
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
  }

  .cta-link {
    font-size: 14px;
    padding: 12px 20px;
  }
}

/* Small Laptop (Small desktop) */
@media (max-width: 1024px) {
  .home-container {
    margin: 30px;
    padding: 30px;
  }

  .home-content {
    padding: 30px;
  }

  h1 {
    font-size: 34px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 25px;
  }

  .features {
    flex-direction: row;
    justify-content: space-evenly;
  }

  .feature {
    width: 250px;
    max-width: 250px;
    margin-bottom: 20px;
  }

  .cta-link {
    font-size: 16px;
    padding: 10px 20px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .home-container {
    margin: 50px;
    padding: 50px;
  }

  .home-content {
    padding: 50px;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 30px;
  }

  p {
    font-size: 20px;
    margin-bottom: 40px;
  }

  .features {
    flex-direction: row;
    justify-content: space-evenly;
  }

  .feature {
    width: 250px;
    max-width: 250px;
  }

  .cta-link {
    font-size: 16px;
    padding: 10px 20px;
  }
}
</style>
