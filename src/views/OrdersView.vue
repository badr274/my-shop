<template>
  <div class="text-4xl text-center mt-8">Welcom To orders page</div>
</template>

<script lang="ts" setup>
import { useCartStore } from "@/stores/cart/cart";
import { onMounted } from "vue";

const cartStore = useCartStore();
const { getCartItems } = cartStore;
onMounted(async () => await getCartItems());
</script>

<style></style>
