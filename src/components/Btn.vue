<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :class="[
      'cursor-pointer btn px-4 py-2 rounded-lg font-medium text-white bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 hover:shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
      extraClass,
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";

defineProps<{
  to?: string | object;
  extraClass?: string;
}>();
</script>

<style></style>
