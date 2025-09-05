<template>
  <div v-for="input in inputs" :key="input.name">
    <label
      :for="input.name"
      class="block text-sm text-gray-700 mb-1 font-medium"
    >
      {{ input.label }}
    </label>

    <Field
      :id="input.name"
      :type="input.type"
      :placeholder="input.placeholder"
      :name="input.name"
      validate-on-input
      class="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-0 rounded-lg"
    />
    <ErrorMessage as="small" :name="input.name" class="text-red-500 text-sm" />
  </div>
</template>

<script lang="ts" setup>
import type { IInput } from "@/interfaces";
import { ErrorMessage, Field } from "vee-validate";

defineProps<{
  inputs: IInput[];
}>();
</script>

<style></style>
