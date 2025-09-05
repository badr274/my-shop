<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-md rounded-xl p-6">
      <h2 class="text-center mb-6 text-2xl font-bold text-gray-800">Signup</h2>
      <Form
        @submit="onSubmit"
        :validation-schema="signupSchema"
        :initial-values="{} as ISignupPayload"
        class="space-y-4"
      >
        <div v-for="input in signupInputs" :key="input.name">
          <label
            :for="input.name"
            class="block mb-1 text-gray-700 text-sm font-medium"
          >
            {{ input.label }}
          </label>
          <Field
            :name="input.name"
            :type="input.type"
            :id="input.name"
            :placeholder="input.placeholder"
            validate-on-input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-0"
          />
          <ErrorMessage
            as="small"
            :name="input.name"
            class="text-red-500 text-sm"
          />
        </div>
        <Btn
          type="submit"
          :disabled="signingLoading"
          extra-class="w-full
        "
        >
          {{ signingLoading ? "Loading..." : "Signup" }}</Btn
        >
      </Form>
      <p class="text-center text-gray-600 mt-4">
        Already have an account!
        <RouterLink
          to="/login"
          class="text-blue-500 font-medium hover:underline"
        >
          Login
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from "vee-validate";
import { signupInputs } from "@/constant";
import { signupSchema } from "@/validations";
import type { ISignupPayload } from "@/apis/authApi";
import { useAuthStore } from "@/stores/auth/auth";
import Btn from "@/components/Btn.vue";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { signingLoading } = storeToRefs(authStore);
const { signup } = authStore;
const onSubmit = async (values: ISignupPayload) => {
  await signup(values);
};
</script>
