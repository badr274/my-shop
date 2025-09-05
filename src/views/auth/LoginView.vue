<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-6">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

      <Form
        @submit="handleLoginSubmit"
        :validation-schema="loginSchema"
        :initial-values="initialValues"
        class="space-y-4"
      >
        <Input :inputs="loginInputs" />

        <Btn type="submit" :disabled="signingLoading" extra-class="w-full">
          {{ signingLoading ? "Loading..." : "Login" }}
        </Btn>
      </Form>

      <p
        class="text-center cursor-pointer mt-4 text-blue-500 font-medium hover:underline"
        @click="openForgotPassModal"
      >
        Forgot Password?
      </p>

      <p class="text-center text-gray-600 mt-2">
        Don't have an account?
        <RouterLink
          to="/signup"
          class="text-blue-500 font-medium hover:underline"
        >
          Sign up
        </RouterLink>
      </p>
    </div>
    <ForgotPasswordModal
      :is-open="isForgotPassOpen"
      :close-modal="closeForgotPassModal"
      @submit-forgot-pass="handleForgotPassSubmit"
      :loading="forgotLoading"
    />
    <VerifyResetCodeModal
      :is-open="isVerifyResetCodeOpen"
      :close-modal="closeVerifyResetCodeModal"
      @submit-verify-reset-code="handleVerifyResetCodeSubmit"
      :loading="verifyResetCodeLoading"
    />
    <ResetPasswordModal
      :is-open="isResetPasswordOpen"
      :close-modal="closeResetPasswordModal"
      @submit-reset-password="handleResetPasswordSubmit"
      :loading="resetPasswordLoading"
    />
  </div>
</template>

<script lang="ts" setup>
import { Form } from "vee-validate";
import { useAuthStore } from "@/stores/auth/auth";
import { loginInputs } from "@/constant";
import type {
  ILoginPayload,
  IResetPasswordPayload,
  IVerifyResetCodePayload,
} from "@/apis/authApi";
import { loginSchema } from "@/validations";
import Btn from "@/components/Btn.vue";
import Input from "@/components/Input.vue";
import { ref } from "vue";
import ForgotPasswordModal from "@/components/Auth/ForgotPasswordModal.vue";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import VerifyResetCodeModal from "@/components/Auth/VerifyResetCodeModal.vue";
import ResetPasswordModal from "@/components/Auth/ResetPasswordModal.vue";
const toast = useToast();
const authStore = useAuthStore();
const { login, forgotPass, verifyResetCode, resetPassword } = authStore;
const {
  signingLoading,
  forgotLoading,
  forgotPassMsg,
  forgotPassStatus,
  verifyResetCodeLoading,
  verifyResetCodeMsg,
  resetPasswordLoading,
} = storeToRefs(authStore);
const initialValues: ILoginPayload = {
  email: "",
  password: "",
};
const isForgotPassOpen = ref(false);
const isVerifyResetCodeOpen = ref(false);
const isResetPasswordOpen = ref(false);

const handleLoginSubmit = async (values: ILoginPayload) => {
  await login(values);
};
const handleForgotPassSubmit = async (values: any) => {
  await forgotPass({ email: values.forgotEmail });
  if (forgotPassStatus.value === "success") {
    toast.success(forgotPassMsg.value, { timeout: 2000 });
    setTimeout(() => {
      closeForgotPassModal();
      openVerifyResetCodeModal();
    }, 1500);
  } else {
    toast.error(forgotPassMsg.value, { timeout: 2000 });
  }
};

const handleVerifyResetCodeSubmit = async (value: IVerifyResetCodePayload) => {
  await verifyResetCode(value);
  if (verifyResetCodeMsg.value === "Success") {
    closeVerifyResetCodeModal();
    openResetPasswordModal();
  } else {
    toast.error(verifyResetCodeMsg.value, { timeout: 2000 });
  }
};

const handleResetPasswordSubmit = async (value: IResetPasswordPayload) => {
  try {
    const res = await resetPassword(value);
    if (res.token) {
      toast.success("Password reseted successfully!", { timeout: 2000 });
      closeResetPasswordModal();
    }
  } catch (error: any) {
    toast.error(error.message, { timeout: 2000 });
  }
};

const closeForgotPassModal = () => (isForgotPassOpen.value = false);
const openForgotPassModal = () => (isForgotPassOpen.value = true);
const closeVerifyResetCodeModal = () => (isVerifyResetCodeOpen.value = false);
const openVerifyResetCodeModal = () => (isVerifyResetCodeOpen.value = true);
const closeResetPasswordModal = () => (isResetPasswordOpen.value = false);
const openResetPasswordModal = () => (isResetPasswordOpen.value = true);
</script>
