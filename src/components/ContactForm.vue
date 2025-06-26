<template>
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">نموذج الاتصال</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4 max-w-xl">
      <div>
        <label for="name" class="block text-lg font-medium mb-2">الاسم</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          placeholder="أدخل اسمك"
          class="w-full px-3 py-2 border border-gray-300 rounded border-secondary"
          required
        />
      </div>

      <div>
        <label for="email" class="block text-lg font-medium mb-2">البريد الإلكتروني</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          placeholder="أدخل بريدك الإلكتروني"
          class="w-full px-3 py-2 border border-gray-300 rounded border-secondary"
          required
        />
      </div>

      <div>
        <label for="message" class="block text-lg font-medium mb-2">الرسالة</label>
        <textarea
          v-model="form.message"
          id="message"
          rows="4"
          placeholder="اكتب رسالتك هنا"
          class="w-full px-3 py-2 border border-gray-300 rounded border-secondary"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        إرسال
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const handleSubmit = () => {
  console.log('Form submitted:', form.value);
  alert('تم إرسال الرسالة بنجاح!');
  form.value = { name: '', email: '', message: '' };
};
</script>