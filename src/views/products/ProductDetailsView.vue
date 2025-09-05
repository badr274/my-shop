<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <span
        class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"
      ></span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-600 font-medium">
      <p>❌ Failed to load product details. Please try again later.</p>
    </div>

    <!-- Product Details -->
    <div v-else-if="data" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Images -->
      <div>
        <img
          :src="data?.data?.imageCover"
          :alt="data?.data?.title"
          loading="lazy"
          class="rounded-2xl shadow-md max-h-[400px] object-contain w-full"
        />

        <!-- Thumbnails Carousel -->
        <Swiper
          class="mt-6 pb-8 mySwiper"
          :modules="[Pagination, Autoplay]"
          :slides-per-view="3"
          :space-between="12"
          :loop="true"
          :autoplay="{ delay: 2500, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
        >
          <SwiperSlide
            v-for="(img, index) in data?.data?.images"
            :key="index"
            class="flex justify-center"
          >
            <img
              :src="img"
              :alt="`Image ${index + 1}`"
              class="rounded-lg object-cover h-28 w-full cursor-pointer hover:opacity-80 transition"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Info -->
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          {{ data?.data?.title }}
        </h1>
        <p class="text-gray-600 mb-4">{{ data?.data?.description }}</p>

        <!-- Price & Stock -->
        <div class="flex flex-row items items-center justify-between">
          <div class="flex flex-col items-center gap-5 mb-6">
            <span class="text-2xl font-semibold text-indigo-600">
              ${{ data?.data?.price }}
            </span>
            <span
              class="text-sm px-3 py-1 rounded-full"
              :class="
                data?.data?.quantity > 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-600'
              "
            >
              {{ data?.data?.quantity > 0 ? "In Stock" : "Out of Stock" }}
            </span>
          </div>

          <div class="flex items-center gap-2 mb-6">
            <span class="text-yellow-500">⭐</span>
            <span class="font-medium">{{ data?.data?.ratingsAverage }}</span>
            <span class="text-gray-500">
              ({{ data?.data?.ratingsQuantity }} reviews)
            </span>
          </div>
        </div>

        <div class="space-y-2 text-gray-700 mb-6">
          <p>
            <span class="font-semibold">Category:</span>
            {{ data?.data?.category?.name }}
          </p>
          <p>
            <span class="font-semibold">Brand:</span>
            {{ data?.data?.brand?.name }}
          </p>
        </div>

        <!-- CTA -->
        <Btn
          class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Add to Cart
        </Btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Btn from "@/components/Btn.vue";
import { useApiQuery } from "@/composable/useApiQuery";
import type { IProduct } from "@/interfaces";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import { useRoute } from "vue-router";

const route = useRoute();
const productId = route.params.productId as string;

const { data, isLoading, error } = useApiQuery<{ data: IProduct }>({
  queryKey: ["product", productId],
  url: `/products/${productId}`,
});
</script>
