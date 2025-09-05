import {
  changePasswordApi,
  editProfileApi,
  forgotPassApi,
  loginApi,
  resetPasswordApi,
  signupApi,
  verifyResetCodeApi,
  type IAuthResponse,
  type IChangePasswordPayload,
  type IEditProfilePayload,
  type IForgotPassPayload,
  type ILoginPayload,
  type IResetPasswordPayload,
  type ISignupPayload,
  type IVerifyResetCodePayload,
} from "@/apis/authApi";
import { cookieService } from "@/utils/cookieService";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const TOKEN_EXPIRY_HOURS = 3;
// ** Auth store for login, signup, logout
export const useAuthStore = defineStore(
  "auth",
  () => {
    const router = useRouter();
    const user = ref<IAuthResponse["data"]["user"] | null>(null);
    const signingLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const forgotPassMsg = ref<string | null>();
    const forgotPassStatus = ref<string | null>();
    const forgotLoading = ref<boolean>(false);
    const verifyResetCodeMsg = ref<string | null>();
    const verifyResetCodeLoading = ref<boolean>(false);
    const resetPasswordLoading = ref<boolean>(false);
    const editProfileLoading = ref<boolean>(false);
    const changePasswordLoading = ref<boolean>(false);

    const toast = useToast();
    async function handleAuthApi<
      TPayload extends ILoginPayload | ISignupPayload
    >(
      apiFunction: (payload: TPayload) => Promise<IAuthResponse>,
      payload: TPayload,
      errorMessage: string,
      successMessage: string
    ) {
      try {
        signingLoading.value = true;
        error.value = null;
        const res = await apiFunction(payload);
        cookieService.set("token", res.data.token, {
          expires: TOKEN_EXPIRY_HOURS / 24,
        });
        user.value = res.data.user;
        toast.success(successMessage, {
          timeout: 1500,
        });
        setTimeout(() => {
          if (user.value?.role === "admin") {
            router.push("/dashboard");
          }
          router.push("/");
        }, 1500);
      } catch (err) {
        const axiosError = err as AxiosError<{ message: string }>;
        error.value =
          axiosError?.response?.data?.message ||
          (err as Error).message ||
          errorMessage;
        toast.error(error.value);
      } finally {
        signingLoading.value = false;
      }
    }
    // ! Login action
    async function login(payload: ILoginPayload) {
      await handleAuthApi(
        loginApi,
        payload,
        "Login Failed",
        "Login successful!"
      );
    }
    // !  Signup action
    async function signup(payload: ISignupPayload) {
      await handleAuthApi(
        signupApi,
        payload,
        "Signup Failed",
        "Signup successful!"
      );
    }

    // !Logout action
    async function logout() {
      cookieService.remove("token");
      user.value = null;
      error.value = null;
      signingLoading.value = false;
      forgotLoading.value = false;
      localStorage.removeItem("auth");
      window.location.reload();
    }

    async function forgotPass(payload: IForgotPassPayload) {
      try {
        forgotLoading.value = true;
        const res = await forgotPassApi(payload);
        forgotPassMsg.value = res.message;
        forgotPassStatus.value = res.statusMsg;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";
        forgotPassMsg.value = message;
      } finally {
        forgotLoading.value = false;
      }
    }
    async function verifyResetCode(payload: IVerifyResetCodePayload) {
      try {
        verifyResetCodeLoading.value = true;
        const res = await verifyResetCodeApi(payload);
        verifyResetCodeMsg.value = res.status;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";
        verifyResetCodeMsg.value = message;
      } finally {
        verifyResetCodeLoading.value = false;
      }
    }
    async function resetPassword(payload: IResetPasswordPayload) {
      try {
        resetPasswordLoading.value = true;
        const res = await resetPasswordApi(payload);
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";
        throw new Error(message);
      } finally {
        resetPasswordLoading.value = false;
      }
    }

    async function editProfile(payload: IEditProfilePayload) {
      try {
        editProfileLoading.value = true;
        const res = await editProfileApi(payload);
        if (res.user) {
          user.value = res.user;
        }
        return res;
      } catch (error: any) {
        const message =
          error?.message || "Something went wrong, please try again.";
        throw new Error(message);
      } finally {
        editProfileLoading.value = false;
      }
    }
    async function changePassword(payload: IChangePasswordPayload) {
      try {
        changePasswordLoading.value = true;
        const res = await changePasswordApi(payload);
        cookieService.set("token", res.token);
        return res;
      } catch (error: any) {
        const message =
          error?.message || "Something went wrong, please try again.";
        throw new Error(message);
      } finally {
        changePasswordLoading.value = false;
      }
    }

    return {
      user,
      error,
      signingLoading,
      login,
      signup,
      logout,
      forgotPass,
      forgotPassMsg,
      forgotPassStatus,
      forgotLoading,
      verifyResetCode,
      verifyResetCodeMsg,
      verifyResetCodeLoading,
      resetPassword,
      resetPasswordLoading,
      editProfile,
      editProfileLoading,
      changePassword,
      changePasswordLoading,
    };
  },
  {
    persist: {
      pick: ["user"],
    },
  }
);
