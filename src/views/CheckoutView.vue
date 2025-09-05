<template>
  <div class="container flex items-center mt-6 flex-col space-y-5">
    <h2 class="text-2xl font-bold text-gray-800 text-center mb-5">Checkout</h2>
    <Form
      v-slot="{ values, validate }"
      @submit="
        (values: any) =>
          handleCashOrderSubmit({
            shippingAddress: {
                    details: values.details,
                    city: values.city,
                    phone: values.phone,
                  },
            cartId: cartData?.cartId as string,
          })
      "
      :validation-schema="shippingAddressSchema"
      :initial-values="initialValues"
      class="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-100"
    >
      <Input :inputs="shippingAddressInputs" />
      <div class="mt-3">
        <label
          for="details"
          class="block text-sm text-gray-700 mb-1 font-medium"
        >
          Address Details
        </label>
        <Field
          as="textarea"
          rows="3"
          name="details"
          id="details"
          placeholder="Apartment, floor, building, or nearby landmark."
          class="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-0 rounded-lg resize-none"
        />
        <ErrorMessage as="small" name="details" class="text-red-500 text-sm" />
      </div>

      <div
        class="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center"
      >
        <span class="text-lg font-semibold text-gray-700">Total:</span>
        <span class="text-2xl font-bold text-indigo-600">
          ${{ totalPrice }}
        </span>
      </div>

      <div class="space-y-3">
        <!-- Cash Order -->
        <Btn
          type="submit"
          class="w-full flex justify-center items-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition"
        >
          <span>Place Cash Order</span>
        </Btn>

        <button
          type="button"
          @click="
            async () => {
              const { valid } = await validate();
              if (valid) {
                handleOnlinePayment({
                  shippingAddress: {
                    details: values.details,
                    city: values.city,
                    phone: values.phone,
                  },
                  cartId: cartData?.cartId as string,
                });
              }
            }
          "
          class="w-full flex justify-center items-center py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition"
          :disabled="payOnlineLoading"
        >
          <span v-if="!payOnlineLoading">Pay Online</span>
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
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import type { IOrderPayload, IShippingAddress } from "@/apis/orderApi";
import Btn from "@/components/Btn.vue";
import Input from "@/components/Input.vue";
import { useCartStore } from "@/stores/cart/cart";
import { userOrderStore } from "@/stores/order/order";
import { storeToRefs } from "pinia";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
import { ref } from "vue";
import { shippingAddressInputs } from "@/constant";
const route = useRoute();
const router = useRouter();
const totalPrice = route.query?.totalPrice;
const payOnlineLoading = ref(false);
const shippingAddressSchema = yup.object({
  details: yup.string().required("Details are required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  city: yup.string().required("City is required"),
});

const initialValues: IShippingAddress = {
  details: "",
  phone: "",
  city: "",
};

const orderStore = userOrderStore();
const { createCashOrder, createCheckoutSession } = orderStore;
const cartStore = useCartStore();
const { getCartItems } = cartStore;
const { cartData } = storeToRefs(cartStore);
const toast = useToast();
const handleCashOrderSubmit = async (payload: IOrderPayload) => {
  Swal.fire({
    title: "Confirm Your Order",
    text: "Are you sure you want to place this order with Cash on Delivery?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, place order",
    cancelButtonText: "Cancel",
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        await confirmOrder(payload);
      } catch (err: any) {
        Swal.showValidationMessage(
          `Request failed: ${err?.message || "Something went wrong"}`
        );
        return false;
      }
    },
  }).then((result: any) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been successfully placed and will be delivered soon.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    }
  });
};

const confirmOrder = async (payload: IOrderPayload) => {
  try {
    await createCashOrder(payload);
    router.push("/allOrders");
  } catch (error: any) {
    console.log(error);
    toast.error(error?.message || "Something went wrong, please try again.");
  }
};

const handleOnlinePayment = async (payload: IOrderPayload) => {
  try {
    payOnlineLoading.value = true;
    const res = await createCheckoutSession(payload);
    if (res.session) {
      window.location.href = res.session.url;
    }
    await getCartItems();
  } catch (error: any) {
    console.log(error);
    toast.error(error?.message || "Something went wrong, please try again.");
  } finally {
    payOnlineLoading.value = false;
  }
};
</script>
