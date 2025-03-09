<template>
  <div class="home-container">
    <h1>Welcome to the Car Rental System</h1>
    <p>Your one-stop solution for renting cars with ease and convenience.</p>

    <div class="features">
      <div class="feature">
        <h2>Browse Available Cars</h2>
        <p>
          Explore a wide variety of cars to suit your needs. From economy to luxury, we've got it
          all.
        </p>
        <RouterLink to="/cars" class="cta-link">View Cars</RouterLink>
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

/* Media query for mobile responsiveness */
@media (max-width: 768px) {
  .home-container {
    margin: 20px;
    padding: 20px;
  }

  h1 {
    font-size: 28px;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .features {
    flex-direction: column; /* Stack features vertically */
    align-items: center; /* Center-align the feature items */
  }

  .feature {
    width: 100%;
    max-width: 350px;
    margin-bottom: 20px; /* Add space between feature items */
  }

  .cta-link {
    font-size: 14px; /* Slightly smaller text */
    padding: 8px 16px;
  }
}
</style>
