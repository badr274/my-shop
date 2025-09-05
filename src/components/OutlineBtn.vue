<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :class="[
      'cursor-pointer px-4 py-2 rounded-lg font-medium text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-50 hover:text-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
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
