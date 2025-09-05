<template>
  <div>
    <div
      v-for="filter in props.filtersData"
      :key="filter.filterBy"
      class="bg-white shadow rounded-lg p-4 mb-4"
    >
      <!-- Filter Title -->
      <h3 class="font-semibold text-gray-700 mb-3 text-lg">
        Filter By {{ filter.filterBy }}
      </h3>

      <!-- Checkboxes for category/brand -->
      <div v-if="filter.type === 'checkbox'" class="flex flex-col space-y-2">
        <label
          v-for="option in filter.options"
          :key="option.id"
          class="flex items-center space-x-2 cursor-pointer hover:text-indigo-600 transition-colors"
        >
          <input
            type="checkbox"
            :value="option.value"
            :id="`${filter.filterBy}-${option.id}`"
            :name="filter.filterBy"
            v-model="selectedFilters.category"
            class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />

          <span class="text-gray-700">{{ option.name }}</span>
        </label>
      </div>

      <!-- Price filter (radio buttons) -->
      <div
        v-else-if="filter.type === 'price'"
        class="flex flex-col space-y-2 mt-2"
      >
        <label
          v-for="option in filter.options"
          :key="option.id"
          :name="filter.filterBy"
          :for="`${filter.filterBy}-${option.id}`"
          class="flex items-center space-x-2 cursor-pointer hover:text-indigo-600 transition-colors"
        >
          <input
            type="radio"
            :value="option.value"
            :id="`${filter.filterBy}-${option.id}`"
            v-model="selectedFilters.price"
            :name="filter.filterBy"
            class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
          <span class="text-gray-700">{{ option.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

interface IFilterOptions {
  id: number;
  name?: string;
  label?: string;
  value: string;
}

export interface IFilter {
  filterBy: string;
  type: "checkbox" | "price";
  options: IFilterOptions[];
}

export interface ISelectedFilter {
  category: string[];
  price: string;
}

const props = defineProps<{
  filtersData: IFilter[];
}>();

const selectedFilters = ref<ISelectedFilter>({
  category: [],
  price: "",
});
const emits = defineEmits<{
  (e: "updateFilter", value: ISelectedFilter): void;
}>();

watch(
  () => selectedFilters,
  (newVal) => {
    emits("updateFilter", newVal.value);
  },
  { deep: true }
);
</script>
