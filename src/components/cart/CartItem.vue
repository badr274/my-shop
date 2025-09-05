<template>
  <tr
    v-for="item in props.products"
    :key="item.product._id"
    class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
  >
    <!-- Image -->
    <td class="px-6 py-4">
      <div
        class="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden"
      >
        <img
          :src="item.product.imageCover"
          :alt="item.product.title"
          class="w-full h-full object-cover"
        />
      </div>
    </td>

    <!-- Title -->
    <td class="px-6 py-4">
      <span class="font-medium text-gray-800">
        {{ item.product.title }}
      </span>
    </td>

    <!-- Quantity -->
    <td class="px-6 py-4 text-center">
      <QuantityController :item-id="item.product._id" :quantity="item.count" />
    </td>

    <!-- Price -->
    <td class="px-6 py-4 text-center font-semibold text-indigo-600">
      ${{ item.price }}
    </td>

    <!-- Delete Button or Spinner -->
    <td class="px-6 py-4 text-center">
      <button
        v-if="deletingId !== item.product._id"
        class="p-2 rounded-full bg-red-50 cursor-pointer hover:bg-red-100 text-red-600 transition"
        @click="() => handleDelete(item.product._id)"
      >
        <Trash2 class="w-5 h-5" />
      </button>

      <!-- spinner when deleting this item -->
      <div v-else class="flex justify-center">
        <svg
          class="animate-spin h-5 w-5 text-red-600"
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
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { ICartResponse } from "@/interfaces";
import { Trash2 } from "lucide-vue-next";
import QuantityController from "./QuantityController.vue";
import { ref } from "vue";

const props = defineProps<{
  products: ICartResponse["data"]["products"];
}>();
console.log(props.products);

const emits = defineEmits<{
  (e: "deleteCartItem", value: string): void;
}>();

const deletingId = ref<string | null>(null);

function handleDelete(productId: string) {
  deletingId.value = productId;
  emits("deleteCartItem", productId);
}
</script>
