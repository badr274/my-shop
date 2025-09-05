import {
  addToCartApi,
  clearCartApi,
  getCartApi,
  removeFromCartApi,
  updateCartQuantityApi,
  type ICartPayload,
  type IUpdateCartPayload,
} from "@/apis/cartApis";
import type { ICartResponse } from "@/interfaces";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useToast } from "vue-toastification";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartData = ref<ICartResponse | null>(null);
    const error = ref<string | null>(null);
    const loadingCart = ref<boolean>(false);
    const loadingAdd = ref<boolean>(false);
    const loadingUpdate = ref<boolean>(false);
    const loadingRemove = ref<boolean>(false);

    const toast = useToast();

    async function handleCartApi<
      TPayload extends ICartPayload | IUpdateCartPayload,
      TResponse extends ICartResponse
    >(
      apiFunction: (payload?: TPayload) => Promise<TResponse>,
      loadingRef: Ref<boolean>,
      successMessage?: string,
      payload?: TPayload
    ) {
      try {
        loadingRef.value = true;
        error.value = null;
        const res = await apiFunction(payload);
        cartData.value = res;
        if (successMessage) toast.success(successMessage);
      } catch (err: any) {
        error.value = err?.message ?? "Something went wrong";
        toast.error(error.value);
      } finally {
        loadingRef.value = false;
      }
    }

    async function getCartItems() {
      await handleCartApi(getCartApi, loadingCart);
    }

    async function addToCart(payload: ICartPayload) {
      await handleCartApi(
        () => addToCartApi(payload),
        loadingAdd,
        "Product Added Successfully!"
      );
      await getCartItems();
    }

    async function updateQuantity(payload: IUpdateCartPayload) {
      await handleCartApi(() => updateCartQuantityApi(payload), loadingUpdate);
    }

    async function removeFromCart(payload: ICartPayload) {
      await handleCartApi(
        () => removeFromCartApi(payload),
        loadingRemove,
        "Product Deleted Successfully!"
      );
    }

    async function clearCart() {
      await handleCartApi(clearCartApi, loadingRemove);
      await getCartItems();
    }

    return {
      cartData,
      loadingCart,
      loadingAdd,
      loadingUpdate,
      loadingRemove,
      error,
      getCartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["cartData"],
    },
  }
);
