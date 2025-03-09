<template>
  <div class="contact-us">
    <h2>Contact Us</h2>
    <p>If you have any questions, feel free to reach out to us. We are here to help you!</p>

    <div class="contact-form">
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
  // Here you can add logic to handle the form submission (e.g., sending it to an API)
}
</script>

<style scoped>
.contact-us {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
  margin: 70px;
}

.contact-us h2 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.contact-us p {
  font-size: 18px;
  margin-bottom: 30px;
  color: #333;
}

.contact-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

.form-group label {
  font-size: 18px;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.submit-btn {
  padding: 12px 25px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .contact-us {
    padding: 20px;
    max-width: 100%;
    margin: 10px;
  }

  .contact-us h2 {
    font-size: 28px;
  }

  .contact-us p {
    font-size: 16px;
  }
}
</style>
