<template>
  <div class="about-us-container">
    <div class="about-us">
      <h2>About Us</h2>
      <p>
        Welcome to our Car Rental System! We offer a wide range of vehicles for rent, providing
        excellent service and customer satisfaction. Our team is dedicated to making your car rental
        experience as smooth and easy as possible.
      </p>

      <!-- Address and Location -->
      <div class="address-section">
        <h3>Our Location</h3>
        <p>Visit us at:</p>
        <p class="address">1234 Car Rental St, Addis Abeba, ABC-123, Ethiopia</p>

        <!-- Map Embed Section -->
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159726.19162618193!2d38.7500846!3d9.1453744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b84454a9e8ed9%3A0x43a2b395dc345404!2sAddis%20Abeba%2C%20Ethiopia!5e0!3m2!1sen!2sin!4v1625743789743!5m2!1sen!2sin"
            width="100%"
            height="300"
            frameborder="0"
            style="border: 0"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Make the whole page scrollable */
.about-us-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh; /* Make sure it takes up the whole screen */
  padding: 20px;
  /* overflow-y: auto; Allows vertical scrolling */
  flex-direction: column;
  max-height: 100vh; /* Limit to screen height */
}

/* About Us content card */
.about-us {
  padding: 30px;
  text-align: center;
  color: white;
  border-radius: 15px;
  margin: 0;
  max-width: 900px;
  width: 100%;
  overflow: hidden; /* Prevent content overflow */
  margin-top: 50px; /* Add top margin */
  transition: transform 0.3s ease;
  background-color: rgba(0, 0, 0, 0.7); /* Make content background darker */
}

.about-us:hover {
  transform: translateY(-10px); /* Hover effect to raise the content */
}

.about-us h2 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffd700;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.about-us p {
  font-size: 18px;
  line-height: 1.7;
  color: #fff;
  max-width: 800px;
  margin: 0 auto;
}

.address-section {
  margin-top: 40px;
}

.address-section h3 {
  font-size: 28px;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 10px;
}

.address-section p {
  font-size: 18px;
  color: #fff;
}

.address {
  font-size: 20px;
  font-weight: bold;
  color: #ffd700;
  margin-top: 10px;
}

.map-container {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.map-container iframe {
  border-radius: 8px;
}

@media (max-width: 768px) {
  .about-us-container {
    padding: 10px;
  }

  .about-us {
    padding: 20px;
    max-width: 100%;
  }

  .about-us h2 {
    font-size: 32px;
  }

  .about-us p {
    font-size: 16px;
  }

  .address-section h3 {
    font-size: 24px;
  }

  .address {
    font-size: 18px;
  }
}
</style>
