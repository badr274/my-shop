<template>
  <div class="flex flex-col justify-center items-center mt-8 w-full">
    <h1 class="text-3xl font-semibold mb-7 text-gray-800">
      Cart Items: [{{ cartData?.numOfCartItems || 0 }}]
    </h1>

    <!-- Loading Spinner -->
    <div
      v-if="loadingCart"
      class="py-12 flex flex-col items-center justify-center"
    >
      <svg
        class="animate-spin h-10 w-10 text-indigo-600"
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
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
        ></path>
      </svg>
      <p class="mt-4 text-gray-500">Loading cart items...</p>
    </div>

    <!-- Empty Cart -->
    <div
      v-else-if="!cartData?.data?.products?.length"
      class="flex flex-col items-center justify-center py-12"
    >
      <p class="text-gray-500 text-lg mb-4">Your cart is empty 🛒</p>
      <RouterLink
        to="/products"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Continue Shopping
      </RouterLink>
    </div>

    <!-- Cart Table -->
    <div v-else class="w-full max-w-5xl overflow-x-auto">
      <table
        class="min-w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden"
      >
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-3 text-left">Image</th>
            <th class="px-6 py-3 text-left">Title</th>
            <th class="px-6 py-3 text-center">Quantity</th>
            <th class="px-6 py-3 text-center">Price</th>
            <th class="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <CartItem
            :products="cartData?.data.products ?? []"
            @delete-cart-item="handleDeleteFromCart"
          />
        </tbody>
      </table>
    </div>

    <div
      v-if="cartData?.data?.products?.length"
      class="mt-6 flex justify-between items-center w-full max-w-5xl bg-gray-50 border-t pt-4 px-4 rounded-md"
    >
      <div class="flex items-center gap-3">
        <span class="font-semibold text-lg text-gray-700">Total:</span>
        <span class="text-2xl font-bold text-indigo-600">
          ${{ cartData.data.totalCartPrice }}
        </span>
      </div>

      <RouterLink
        :to="{
          name: 'Checkout',
          query: { totalPrice: cartData.data.totalCartPrice },
        }"
        class="px-6 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
      >
        Proceed to Checkout
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CartItem from "@/components/cart/CartItem.vue";
import { useCartStore } from "@/stores/cart/cart";
import { storeToRefs } from "pinia";
import { onMounted, provide } from "vue";

const cartStore = useCartStore();
const { cartData, loadingCart } = storeToRefs(cartStore);
const { getCartItems, updateQuantity, removeFromCart } = cartStore;
console.log(cartData.value);
async function increaseQuantity(count: number, productId: string) {
  await updateQuantity({ productId, count });
  console.log(cartData.value);
}
async function decreaseQuantity(count: number, productId: string) {
  await updateQuantity({ productId, count });
}

const handleQuantityChange = async (productId: string, count: number) => {
  await updateQuantity({ productId, count });
};

const handleDeleteFromCart = async (value: string) => {
  await removeFromCart({ productId: value });
};

onMounted(async () => {
  await getCartItems();
});

provide("cartActions", {
  increaseQuantity,
  decreaseQuantity,
  handleQuantityChange,
});
</script>
