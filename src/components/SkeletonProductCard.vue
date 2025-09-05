<template>
  <div class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
    <div class="relative">
      <div class="skeleton h-60 w-full"></div>
    </div>

    <div class="flex flex-col flex-1 p-4 space-y-3">
      <div class="h-5 w-3/4 rounded-md skeleton"></div>

      <div class="h-4 w-full rounded-md skeleton"></div>
      <div class="h-4 w-5/6 rounded-md skeleton"></div>

      <div class="mt-auto flex items-center justify-between gap-3">
        <span class="h-6 w-16 rounded-md skeleton"></span>
        <span class="h-9 w-28 rounded-lg skeleton"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Lightweight shimmer skeleton */
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: rgb(229 231 235); /* gray-200 */
}
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
