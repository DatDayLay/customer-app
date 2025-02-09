<script setup>
import { computed } from "vue";
import { useCustomerStore } from "../stores/Customerstore";

const customerStore = useCustomerStore();

const totalCustomers = computed(() => customerStore.customers.length);

const activeCustomersCount = computed(
  () => customerStore.customers.filter((customer) => customer.status).length
);

const inactiveCustomersCount = computed(
  () => totalCustomers.value - activeCustomersCount.value
);

const activeCustomersPercentage = computed(() =>
  totalCustomers.value > 0
    ? ((activeCustomersCount.value / totalCustomers.value) * 100).toFixed(1)
    : 0
);

const inactiveCustomersPercentage = computed(() =>
  totalCustomers.value > 0
    ? ((inactiveCustomersCount.value / totalCustomers.value) * 100).toFixed(1)
    : 0
);
</script>

<template>
  <ul class="flex flex-row justify-evenly w-full h-[20%] lg:h-[25%] p-2">
    <li class="statli">
      <h4 class="statH4">customers</h4>
      <h1 class="statH1 mx-auto w-full text-center">
        {{ totalCustomers }}
      </h1>
    </li>
    <li class="statli">
      <h4 class="statH4">active</h4>
      <sub class="flex w-full justify-evenly">
        <h1 class="statH1">
          {{ activeCustomersCount }}
        </h1>
        <p
          class="my-auto bg-green-200 w-fit text-green-600 text-center font-zain py-4 px-1 rounded-lg lg:w-[20%]"
        >
          {{ `+${activeCustomersPercentage}%` }}
        </p>
      </sub>
    </li>
    <li class="statli">
      <h4 class="statH4">inactive</h4>
      <sub class="flex w-full justify-evenly">
        <h1 class="statH1">
          {{ inactiveCustomersCount }}
        </h1>
        <p
          class="my-auto bg-red-200 w-fit text-red-600 text-center font-zain py-4 px-1 rounded-lg lg:w-[20%]"
        >
          {{ `+${inactiveCustomersPercentage}%` }}
        </p>
      </sub>
    </li>
  </ul>
</template>
