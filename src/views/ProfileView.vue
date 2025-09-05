<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4"
  >
    <div class="max-w-sm w-full bg-white shadow-lg rounded-2xl overflow-hidden">
      <div class="h-28 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

      <div class="relative -mt-14 flex justify-center">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="User Avatar"
          class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>

      <div class="px-6 py-6 text-center">
        <h2 class="text-xl font-bold text-gray-800">
          {{ user?.name || "Guest User" }}
        </h2>
        <p class="text-gray-500">{{ user?.email || "No email available" }}</p>
        <p class="mt-2 text-sm font-medium text-indigo-600">
          Role: {{ user?.role || "User" }}
        </p>
      </div>

      <!-- Actions -->
      <div class="px-6 pb-6 flex justify-center gap-3">
        <!-- Edit Profile -->
        <button
          class="flex items-center cursor-pointer gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-700 transition"
          @click="openEditProfileModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652l-8.25 8.25a4.5 4.5 0 01-1.896 1.13L8.25 15.75l.919-2.055a4.5 4.5 0 011.13-1.896l6.563-6.562z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 7.125L16.862 4.487M10.5 18.75h9a1.5 1.5 0 001.5-1.5v-6.75"
            />
          </svg>
          Edit Profile
        </button>

        <!-- Change Password -->
        <button
          class="flex items-center cursor-pointer gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg shadow-md hover:bg-gray-200 transition"
          @click="openChangePasswordModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 10.5V7.125a4.125 4.125 0 10-8.25 0V10.5m-.75 3.75h9.75m-9.75 0a2.25 2.25 0 01-2.25-2.25V9.75A2.25 2.25 0 017.5 7.5h9a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25m-9.75 0v4.125c0 .621.504 1.125 1.125 1.125h7.5c.621 0 1.125-.504 1.125-1.125V14.25"
            />
          </svg>
          Change Password
        </button>
      </div>
    </div>
    <UpdateProfileModal
      @submit-edit-profile="handleEditProfileSubmit"
      :close-modal="closeEditProfileModal"
      :is-open="isEditProfileOpen"
      :loading="editProfileLoading"
      :initialValues="user as IAuthResponse['data']['user']"
    />
    <ChangePasswordModal
      @submit-change-passord="handleChangePasswordSubmit"
      :close-modal="closeChangePasswordModal"
      :is-open="isChangePasswordOpen"
      :loading="changePasswordLoading"
    />
  </div>
</template>

<script lang="ts" setup>
import type {
  IAuthResponse,
  IChangePasswordPayload,
  IEditProfilePayload,
} from "@/apis/authApi";
import ChangePasswordModal from "@/components/Auth/ChangePasswordModal.vue";
import UpdateProfileModal from "@/components/Auth/UpdateProfileModal.vue";
import { useAuthStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const { editProfile, changePassword } = authStore;
const { user, editProfileLoading, changePasswordLoading } =
  storeToRefs(authStore);

const isEditProfileOpen = ref(false);
const isChangePasswordOpen = ref(false);
const closeEditProfileModal = () => (isEditProfileOpen.value = false);
const openEditProfileModal = () => (isEditProfileOpen.value = true);
const closeChangePasswordModal = () => (isChangePasswordOpen.value = false);
const openChangePasswordModal = () => (isChangePasswordOpen.value = true);
const toast = useToast();
const handleEditProfileSubmit = async (value: IEditProfilePayload) => {
  try {
    await editProfile(value);
    toast.success("Profile updated successfully!", { timeout: 2000 });
    closeEditProfileModal();
  } catch (error: any) {
    if (error?.message === "fail") {
      toast.error("This email is already in use");
    } else {
      toast.error(error?.message || "Something went wrong, please try again.");
    }
  }
};
const handleChangePasswordSubmit = async (value: IChangePasswordPayload) => {
  try {
    await changePassword(value);
    toast.success("Password changed successfully!", { timeout: 2000 });
    closeChangePasswordModal();
  } catch (error: any) {
    if (error?.message === "fail") {
      toast.error("Your current password not correct");
    } else {
      toast.error(error?.message || "Something went wrong, please try again.");
    }
  }
};
</script>
