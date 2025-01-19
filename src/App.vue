<script setup>
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";
import CustomerModal from "./components/CustomerModal.vue";
import TanstackTable from "./components/TanstackTable.vue";
import { useCustomerStore } from "./stores/Customerstore";

const customerStore = useCustomerStore();

const isModalOpen = ref(false);
const selectedCustomer = ref(null);

function openAddCustomer() {
  selectedCustomer.value = null;
  isModalOpen.value = true;
}

function openEditCustomer(index) {
  selectedCustomer.value = index;
  isModalOpen.value = true;
}

function closeCustomerModal() {
  isModalOpen.value = false;
  selectedCustomer.value = null;
}

function deleteCustomer(index) {
  if (index >= 0 && index < customerStore.customers.length) {
    customerStore.customers.splice(index, 1);
    console.log("Customer deleted at index:", index);
  } else {
    console.error("Invalid index:", index);
  }
}
</script>

<template>
  <div class="h-screen w-full flex flex-col">
    <Navbar />
    <div class="bg-slate-50 w-full flex flex-row justify-between py-4">
      <h1 class="sm:text-2xl text-sky-950 py-3 mr-auto sm:ml-28 ml-6">
        <i
          class="pi pi-users text-sky-950 sm:text-2xl text-xl m-auto sm:px-0.5"
        ></i>
        Customers
      </h1>
      <button
        class="bg-pink-300 text-white text-sm px-2 py-2 rounded-lg hover:bg-pink-400 w-fit my-auto ml-auto sm:mr-20 mr-4"
        @click="openAddCustomer"
      >
        <i class="pi pi-plus text-white text-sm m-auto px-0.5"></i>
        Add Customer
      </button>
    </div>
    <CustomerModal
      v-if="isModalOpen"
      :customer="
        selectedCustomerIndex !== null
          ? customerStore.customers[selectedCustomer]
          : null
      "
      :index="selectedCustomerIndex"
      @close="closeCustomerModal"
    />
    <div class="mt-10">
      <TanstackTable @edit="openEditCustomer" @delete="deleteCustomer" />
    </div>
    <footer class="w-full flex justify-center mt-auto mb-2">
      <p class="p-4">
        Design inspo:
        <a
          href="https://dribbble.com/shots/2696581-StrefaKoloru-Customers/attachments/544530?mode=media"
          class="text-sky-950 underline"
          >Link</a
        >
      </p>
    </footer>
  </div>
</template>
