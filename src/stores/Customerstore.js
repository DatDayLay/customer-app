import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [],
    isModalOpen: false,
    selectedCustomer: null,
    isViewMode: false,
  }),
  actions: {
    addCustomer(customerData) {
      this.customers.push(customerData);
    },
    removeCustomer(index) {
      if (index >= 0 && index < this.customers.length) {
        this.customers.splice(index, 1);
        console.log("Customer deleted at index:", index);
      } else {
        console.error("Invalid index:", index);
      }
    },
    openAddCustomer() {
      this.selectedCustomer = null;
      this.isModalOpen = true;
      this.isViewMode = false;
    },
    openEditCustomer(index) {
      this.selectedCustomer = index;
      this.isModalOpen = true;
      this.isViewMode = false;
    },
    openViewCustomer(index) {
      this.selectedCustomer = index;
      this.isModalOpen = true;
      this.isViewMode = true;
    },
    closeCustomerModal() {
      this.isModalOpen = false;
      this.selectedCustomer = null;
    },
  },
});
