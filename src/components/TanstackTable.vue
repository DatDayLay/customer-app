<script setup>
import { ref, computed } from "vue";
import { useCustomerStore } from "../stores/Customerstore";

const customerStore = useCustomerStore();
// i forgot to integrate the wysiwyg editor and when i realized it was too late but everything else is in tiptop shape
const searchQuery = ref("");

const filteredCustomers = computed(() => {
  if (!searchQuery.value) {
    return customerStore.customers;
  }
  return customerStore.customers.filter(
    (customer) =>
      customer.firstName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      customer.lastName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      customer.phoneNumber.includes(searchQuery.value) ||
      customer.state.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (customer.status ? "active" : "inactive").includes(
        searchQuery.value.toLowerCase()
      )
  );
});

const emit = defineEmits(["edit", "delete", "view"]);
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="mb-4">
        <input
          v-model="searchQuery"
          @input="searchCustomers"
          type="text"
          placeholder="Search..."
          class="sm:w-2/6 w-3/5 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Id
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  First name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Last name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  State
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(customer, index) in filteredCustomers" :key="index">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ index + 1 }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ customer.firstName }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ customer.lastName }}
                </td>
                <td class="whitespace-nowrap px-0 py-4 text-sm text-gray-500">
                  {{ customer.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ customer.phoneNumber }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ customer.state }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm"
                  :class="customer.status ? 'text-green-700' : 'text-red-800'"
                >
                  {{ customer.status ? "Active" : "Inactive" }}
                </td>
                <td
                  class="relative cursor-pointer whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 hover:text-slate-600"
                  @click="$emit('edit', index)"
                >
                  <i class="pi pi-pencil"></i>
                </td>
                <td
                  class="relative cursor-pointer whitespace-nowrap py-4 pl-3 pr-4 text-right hover:text-red-600 text-sm font-medium sm:pr-0"
                  @click="$emit('delete', index)"
                >
                  <i class="pi pi-trash"></i>
                </td>
                <td
                  class="relative cursor-pointer whitespace-nowrap py-4 pl-3 pr-4 text-right hover:text-slate-600 text-sm font-medium sm:pr-0"
                  @click="$emit('view', index)"
                >
                  <i class="pi pi-info-circle"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
