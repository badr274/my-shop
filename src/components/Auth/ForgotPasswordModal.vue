<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <!-- Overlay مع Blur -->
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Forgot Password
              </DialogTitle>
              <Form
                @submit="
                  (values:any) => emits('submitForgotPass', { email: values.email })
                "
                :validation-schema="forgotPassSchema"
                :initial-values="initialValues"
                class="mt-2 space-y-4"
              >
                <Input :inputs="[inputData]" />
                <div class="mt-4 flex justify-end items-center space-x-1">
                  <OutlineBtn
                    type="button"
                    extra-class="!bg-gray-500 !text-white hover:!bg-gray-600 focus:border-0"
                    @click="closeModal"
                  >
                    Cancel
                  </OutlineBtn>
                  <Btn type="submit" :disabled="loading"
                    ><span v-if="!loading">Submit</span>
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
              </Form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import type { IForgotPassPayload } from "@/apis/authApi";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { Form } from "vee-validate";
import Btn from "../Btn.vue";
import OutlineBtn from "../OutlineBtn.vue";
import Input from "../Input.vue";
import { forgotPassSchema } from "@/validations";
import { inputData } from "@/constant";

defineProps<{
  isOpen: boolean;
  closeModal(): void;
  loading: boolean;
}>();
const initialValues = {
  forgotEmail: "",
};
const emits = defineEmits<{
  (e: "submitForgotPass", value: IForgotPassPayload): void;
}>();
</script>
