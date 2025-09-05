<template>
  <div
    :key="product._id"
    class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
  >
    <div class="relative">
      <img
        loading="lazy"
        :src="product.imageCover"
        :alt="product.title"
        class="object-cover w-full h-60 group-hover:scale-105 transition-transform duration-300 cursor-pointer"
        @click="
          $router.push({
            name: 'ProductDetails',
            params: { productId: product._id },
          })
        "
      />
      <button
        class="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
      >
        <Heart class="w-5 h-5 text-gray-600 hover:text-red-600" />
      </button>
    </div>

    <div class="flex flex-col flex-1 p-4 space-y-3">
      <h4 class="text-lg font-semibold text-gray-800 line-clamp-1">
        {{ product.title }}
      </h4>
      <p class="text-sm text-gray-500 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="mt-auto flex items-center justify-between">
        <span class="text-indigo-600 font-bold text-lg">
          ${{ product.price }}
        </span>
        <Btn
          size="sm"
          @click="emits('addItemToCart', product._id)"
          :disabled="loading"
          ><span v-if="!loading">Add to Cart</span>
          <svg
            v-else
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            />
          </svg>
        </Btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IProduct } from "@/interfaces";
import Btn from "./Btn.vue";
import { Heart } from "lucide-vue-next";

defineProps<{
  product: IProduct;
  loading: boolean;
}>();

const emits = defineEmits<{
  (e: "addItemToCart", value: string): void;
}>();
</script>
