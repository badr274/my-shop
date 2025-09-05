<template>
  <div class="flex items-center justify-center gap-2">
    <button
      @click="decrease"
      class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-bold"
    >
      -
    </button>
    <input
      type="number"
      class="min-w-[30px] max-w-[100px] text-center"
      v-model.number="localQuantity"
      @input="handleInput"
      min="1"
    />
    <button
      @click="increase"
      class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-bold"
    >
      +
    </button>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from "vue";

const props = defineProps<{
  quantity: number;
  itemId: string;
}>();
const localQuantity = ref(props.quantity);

watch(
  () => props.quantity,
  (newVal) => {
    localQuantity.value = newVal;
  }
);
const cartActions = inject("cartActions") as {
  increaseQuantity: (count: number, productId: string) => Promise<void>;
  decreaseQuantity: (count: number, productId: string) => Promise<void>;
  handleQuantityChange: (productId: string, count: number) => Promise<void>;
};
const decrease = () => {
  if (localQuantity.value > 1) {
    localQuantity.value--;
    cartActions.decreaseQuantity(localQuantity.value, props.itemId);
  }
};
const increase = () => {
  localQuantity.value++;
  cartActions.increaseQuantity(localQuantity.value, props.itemId);
};
const handleInput = () => {
  if (!localQuantity.value || localQuantity.value < 1) {
    localQuantity.value = 1;
  }
  cartActions.handleQuantityChange(props.itemId, localQuantity.value);
};
</script>
