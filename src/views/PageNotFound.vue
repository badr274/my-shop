<script setup lang="ts">
import Btn from "@/components/Btn.vue";
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center gap-6">
    <h1 class="text-6xl font-bold text-gray-800">404</h1>
    <p class="text-xl text-gray-600">Page Not Found</p>
    <Btn to="/" extra-class="text-indigo-600 hover:underline"
      >Go back to Home</Btn
    >
  </div>
</template>
