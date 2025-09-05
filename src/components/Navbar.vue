<template>
  <div
    class="navbar w-full h-16 flex items-center justify-between px-6 bg-white text-gray-800 shadow-md"
  >
    <div class="logo flex items-center gap-2 text-2xl font-bold">
      <ShoppingCart class="text-indigo-600" />
      <h1>MyShop</h1>
    </div>

    <ul class="nav-links flex items-center gap-6 list-none">
      <li>
        <router-link to="/" class="hover:text-indigo-600">Home</router-link>
      </li>
      <li>
        <router-link to="/products" class="hover:text-indigo-600"
          >Products</router-link
        >
      </li>
      <li>
        <router-link to="/cart" class="hover:text-indigo-600">Cart</router-link>
      </li>
    </ul>

    <div class="user-actions flex items-center gap-6">
      <div v-if="!token" class="auth-links flex items-center gap-4">
        <Btn to="/login">Login</Btn>

        <outline-btn to="/signup"> Signup </outline-btn>
      </div>
      <div v-else class="flex items-center space-x-5">
        <Btn @click="logout()">Logout</Btn>
        <div class="icons flex items-center gap-4 text-gray-600">
          <div class="relative">
            <ShoppingBasket class="cursor-pointer hover:text-indigo-600" />
            <span
              v-if="cartData?.numOfCartItems"
              class="text-[10px] text-white bg-red-600 rounded-full w-3 h-3 flex items-center justify-center absolute top-[-3px] left-1/2 transform -translate-x-1/2"
              >{{ cartData.numOfCartItems }}</span
            >
          </div>
          <router-link to="/profile">
            <CircleUserRound class="cursor-pointer hover:text-indigo-600"
          /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ShoppingBasket, CircleUserRound, ShoppingCart } from "lucide-vue-next";
import Btn from "./Btn.vue";
import OutlineBtn from "./OutlineBtn.vue";
import { useAuthStore } from "@/stores/auth/auth";
import { cookieService } from "@/utils/cookieService";
import { useCartStore } from "@/stores/cart/cart";
import { storeToRefs } from "pinia";
const token = cookieService.get("token");
const { logout } = useAuthStore();
const cartStore = useCartStore();
const { cartData } = storeToRefs(cartStore);
</script>
