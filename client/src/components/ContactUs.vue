<template>
  <div class="contact-us">
    <div class="contact-form">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to reach out to us. We are here to help you!</p>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>

        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const submitForm = () => {
  console.log('Form Submitted:', form.value)
  // Handle submission (API call, etc.)
}
</script>

<style scoped>
/* Main Container */
.contact-us {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('https://source.unsplash.com/1600x900/?cars,rental') no-repeat center center/cover;
  padding: 20px;
  margin-top: 30px;
}

/* Form Container */
.contact-form {
  background-color: rgba(0, 0, 0, 0.85);
  padding: 40px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  color: white;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Heading and Text */
.contact-form h2 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffd700;
}

.contact-form p {
  font-size: 16px;
  margin-bottom: 25px;
  color: #ccc;
}

/* Form Fields */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #ffd700;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  transition: border 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #ffd700;
  outline: none;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

/* Submit Button */
.submit-btn {
  padding: 12px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-form {
    padding: 30px;
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .contact-form {
    padding: 30px;
  }

  .contact-form h2 {
    font-size: 24px;
  }

  .contact-form p {
    font-size: 14px;
  }

  .form-group input,
  .form-group textarea {
    font-size: 14px;
    padding: 10px;
    margin-right: 10px;
  }

  .submit-btn {
    font-size: 14px;
    padding: 10px 18px;
  }
}
</style>
