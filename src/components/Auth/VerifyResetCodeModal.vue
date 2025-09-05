<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30 backdrop-blur-lg" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Verify Reset Password
              </DialogTitle>

              <!-- OTP Input -->
              <div class="otp-container my-3 flex justify-center">
                <Vue3OtpInput
                  v-model="otp"
                  :num-inputs="numInputs"
                  input-type="text"
                  :is-input-num="true"
                  input-classes="w-12 h-12 text-center mx-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  @on-complete="(value:string) => emits('submitVerifyResetCode', {resetCode:value})"
                />
              </div>

              <!-- Loading Overlay -->
              <div
                v-if="loading"
                class="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl z-20"
              >
                <svg
                  class="animate-spin h-8 w-8 text-indigo-600"
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
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import type { IVerifyResetCodePayload } from "@/apis/authApi";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import Vue3OtpInput from "vue3-otp-input";
import { ref } from "vue";
const otp = ref("");
const numInputs = 6;

defineProps<{
  isOpen: boolean;
  closeModal(): void;
  loading: boolean;
}>();

const emits = defineEmits<{
  (e: "submitVerifyResetCode", value: IVerifyResetCodePayload): void;
}>();
</script>
