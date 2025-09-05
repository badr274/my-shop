<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col lg:flex-row gap-6">
      <aside
        class="w-full lg:w-1/4 bg-white p-4 shadow rounded-md mt-6 max-h-[80vh] overflow-y-auto"
      >
        <FilterSection
          :filtersData="filtersData"
          @update-filter="handleFilter"
        />
      </aside>

      <div class="flex-1 flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-3xl font-bold text-gray-800 my-6">Products</h1>
          <Select :sortOptions="sortOptions" @updateSortValue="handleSort" />
        </div>

        <div>
          <div
            v-if="isLoading"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
          >
            <SkeletonProductCard v-for="n in limit" :key="n" />
          </div>

          <div v-else-if="error" class="text-center text-red-500 mt-6">
            {{ error.message || "Something went wrong!" }}
          </div>

          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
          >
            <ProductCard
              v-for="product in data?.data"
              :key="product._id"
              :product="product"
              :loading="loadingItems.includes(product._id)"
              @add-item-to-cart="handleAddToCart"
            />
          </div>

          <div
            v-if="data?.data.length"
            class="my-pagination flex justify-center items-center space-x-2 mt-6"
          >
            <button
              :disabled="!data?.metadata.prevPage || isFetching"
              class="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              @click="currentPage--"
            >
              Prev
            </button>
            <button
              v-for="page in data?.metadata.numberOfPages"
              :key="page"
              :class="[
                'px-3 py-1 rounded cursor-pointer',
                page === data?.metadata.currentPage
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200',
              ]"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button
              :disabled="!data?.metadata.nextPage || isFetching"
              class="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              @click="currentPage++"
            >
              Next
            </button>
          </div>

          <div v-if="!isFetching && !data?.data.length" class="text-center">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">
              No Data Found!
            </h2>

            <p class="text-gray-500 text-sm">
              Try adjusting your filters or check back later.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FilterSection, {
  type IFilter,
  type ISelectedFilter,
} from "@/components/FilterSection.vue";
import ProductCard from "@/components/ProductCard.vue";
import Select from "@/components/Select.vue";
import SkeletonProductCard from "@/components/SkeletonProductCard.vue";
import type { IProductsResponse } from "@/interfaces";
import { useCartStore } from "@/stores/cart/cart";
import { axiosApi } from "@/utils/api";
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";

const { addToCart } = useCartStore();

// --- Sort Options ---
const sortOptions = [
  { name: "Sort By Price", unavailable: true },
  { name: "High to Low", value: "-price" },
  { name: "Low to High", value: "+price" },
];

const filtersData: IFilter[] = [
  {
    filterBy: "Category",
    type: "checkbox",
    options: [
      { id: 1, name: "Woman's Fashion", value: "6439d58a0049ad0b52b9003f" },
      { id: 2, name: "Men's Fashion", value: "6439d5b90049ad0b52b90048" },
      { id: 3, name: "Electronics", value: "6439d2d167d9aa4ca970649f" },
    ],
  },
  {
    filterBy: "Price",
    type: "price",
    options: [
      { id: 1, label: "< 100", value: "100" },
      { id: 2, label: "100 - 1000", value: "100,1000" },
      { id: 3, label: "> 1000", value: "1000" },
    ],
  },
];

// --- State ---
const limit = 12;
const currentPage = ref<number>(1);
const sortValue = ref<string | null>(null);
const filterValue = ref<ISelectedFilter>();
const loadingItems = ref<string[]>([]);
// --- Handlers ---
const handleSort = (value: string) => {
  sortValue.value = value;
  currentPage.value = 1;
};

const handleFilter = (value: ISelectedFilter) => {
  filterValue.value = value;
  currentPage.value = 1;
};

// --- Query ---
const { data, error, isLoading, isFetching } = useQuery({
  queryKey: ["products", currentPage, sortValue, filterValue],
  queryFn: async () => {
    let url = `products?limit=${limit}&page=${currentPage.value}`;

    if (sortValue.value) url += `&sort=${sortValue.value}`;
    if (filterValue.value?.category.length) {
      for (let i of filterValue.value?.category) {
        url += `&category=${i}`;
      }
    }
    switch (filterValue.value?.price) {
      case "100":
        url += `&price[lte]=100`;
        break;
      case "100,1000":
        url += `&price[gte]=100&price[lte]=1000`;
        break;
      case "1000":
        url += `&price[gte]=1000`;
        break;

      default:
        break;
    }
    console.log(url);
    const res = await axiosApi.get<IProductsResponse>(url);
    return res.data;
  },
  staleTime: 1000 * 60 * 5,
});

const handleAddToCart = async (value: string) => {
  try {
    loadingItems.value.push(value);

    await addToCart({ productId: value });
  } finally {
    loadingItems.value = loadingItems.value.filter((id) => id !== value);
  }
};
</script>
