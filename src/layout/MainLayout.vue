<template>
  <div class="main-layout min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 py-4">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<style></style>
