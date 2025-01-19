import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [],
  }),
  actions: {
    addCustomer(customerData) {
      this.customers.push(customerData);
    },
    removeCustomer(email) {
      this.customers = this.customers.filter(
        (customer) => customer.email !== email
      );
    },
  },
});
