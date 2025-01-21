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
  <ul class="flex flex-row justify-evenly w-full h-1/4 p-2">
    <li class="bg-white statli">
      <h4 class="statH4">
        Total customers
        <i class="pi pi-users statIcon"></i>
      </h4>
      <h1 class="statH1">
        {{ totalCustomers }}
      </h1>
    </li>
    <li class="bg-green-50 statli">
      <h4 class="statH4">
        Active(%)
        <i class="pi pi-users statIcon"></i>
      </h4>
      <h1 class="statH1">
        {{ activeCustomersPercentage }}
      </h1>
    </li>
    <li class="bg-pink-50 statli">
      <h4 class="statH4">
        Inactive(%)
        <i class="pi pi-users statIcon"></i>
      </h4>
      <h1 class="statH1">
        {{ inactiveCustomersPercentage }}
      </h1>
    </li>
  </ul>
</template>
