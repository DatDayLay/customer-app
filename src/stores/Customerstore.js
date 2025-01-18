import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phoneNumber: "123-456-7890",
        state: "Adamawa",
        status: true,
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phoneNumber: "987-654-3210",
        state: "Kano",
        status: false,
      },
    ],
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
