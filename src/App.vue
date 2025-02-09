<script setup>
import Navbar from "./components/Navbar.vue";
import CustomerModal from "./components/CustomerModal.vue";
import CustomerStats from "./components/CustomerStats.vue";
import TanstackTable from "./components/TanstackTable.vue";
import { useCustomerStore } from "./stores/Customerstore";

const customerStore = useCustomerStore();

function deleteCustomer(index) {
  customerStore.removeCustomer(index);
}
</script>

<template>
  <div
    class="min-h-[100vh] w-[100%] flex flex-row m-0 px-[0.2%]"
    style="
      background: radial-gradient(
        circle at 50% 50%,
        white 0%,
        #f7f7f7 64%,
        #e5e5e5 96%
      );
    "
  >
    <Navbar />
    <div class="w-[90%] flex flex-col m-0 px-[1%]">
      <div class="bg-transparent w-full flex flex-row justify-between py-4">
        <h1
          class="text-sm md:text-md lg:text-lg text-black py-3 mr-auto sm:ml-28 ml-6"
        >
          <i
            class="pi pi-users text-black md:text-md lg:text-lg text-sm m-auto sm:px-0.5"
          ></i>
          Customers
        </h1>
        <button
          class="bg-pink-300 text-white text-xs px-2 py-2 rounded-lg hover:bg-pink-400 w-fit my-auto ml-auto sm:mr-20 mr-4"
          @click="customerStore.openAddCustomer"
        >
          <i class="pi pi-plus text-white text-xs m-auto px-0.5"></i>
          Add Customer
        </button>
      </div>
      <CustomerModal
        v-if="customerStore.isModalOpen"
        :customer="
          customerStore.selectedCustomer !== null
            ? customerStore.customers[customerStore.selectedCustomer]
            : null
        "
        :index="customerStore.selectedCustomer"
        :view-mode="customerStore.isViewMode"
        @close="customerStore.closeCustomerModal"
      />
      <CustomerStats />
      <div class="mt-10">
        <TanstackTable
          @edit="customerStore.openEditCustomer"
          @delete="deleteCustomer"
          @view="customerStore.openViewCustomer"
        />
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
  </div>
</template>
