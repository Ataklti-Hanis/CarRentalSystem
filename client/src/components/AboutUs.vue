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
            class="map-frame"
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
.about-us-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  flex-direction: column;
  width: 100%;
}

/* About Us content card */
.about-us {
  padding: 30px;
  text-align: center;
  color: white;
  border-radius: 15px;
  max-width: 900px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  transition: transform 0.3s ease;
  margin-top: 30px;
}

.about-us:hover {
  transform: translateY(-5px);
}

.about-us h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffd700;
  text-transform: uppercase;
}

.about-us p {
  font-size: 1rem;
  line-height: 1.7;
  color: #fff;
  max-width: 800px;
  margin: 0 auto;
}

/* Address Section */
.address-section {
  margin-top: 30px;
}

.address-section h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 10px;
}

.address-section p {
  font-size: 1rem;
  color: #fff;
}

.address {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffd700;
  margin-top: 10px;
}

/* Map Container */
.map-container {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.map-frame {
  width: 100%;
  height: 300px;
  border: none;
  border-radius: 8px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-us {
    padding: 25px;
    max-width: 80%;
  }

  .about-us h2 {
    font-size: 1.8rem;
  }

  .about-us p,
  .address-section p {
    font-size: 0.95rem;
  }

  .address {
    font-size: 1.1rem;
  }

  .map-frame {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .about-us {
    padding: 20px;
    max-width: 90%;
  }

  .about-us h2 {
    font-size: 1.5rem;
  }

  .about-us p,
  .address-section p {
    font-size: 0.9rem;
  }

  .address {
    font-size: 1rem;
  }

  .map-frame {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .about-us {
    padding: 15px;
    max-width: 95%;
    margin-top: 30px;
  }

  .about-us h2 {
    font-size: 1.4rem;
  }

  .about-us p,
  .address-section p {
    font-size: 0.85rem;
  }

  .address {
    font-size: 0.95rem;
  }

  .map-frame {
    height: 180px;
  }
}
</style>
