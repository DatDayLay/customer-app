<script setup>
import { ref, computed, watch, toRefs } from "vue";
import allStates from "../naija-states.json";
import { useCustomerStore } from "../stores/Customerstore";
import { validateForm } from "../utils/Validation";
const props = defineProps({
  customer: Object,
  viewMode: Boolean,
});
const emit = defineEmits(["close"]);

const options = allStates.states.map((state) => ({
  label: state,
  value: state,
}));

const formData = ref({ ...props.customer });
const errors = ref({});

const customerStore = useCustomerStore();

watch(
  formData,
  () => {
    errors.value = validateForm(formData.value);
  },
  { deep: true }
);

const isFormValid = computed(() => {
  return Object.keys(errors.value).length === 0;
});

const handleSubmit = () => {
  errors.value = validateForm(formData.value);

  if (isFormValid.value) {
    if (props.customer) {
      const index = customerStore.customers.findIndex(
        (c) => c.email === props.customer.email
      );
      if (index !== -1) {
        customerStore.customers[index] = { ...formData.value };
      }
    } else {
      customerStore.addCustomer({ ...formData.value });
    }

    // console.log("Customer saved");
    emit("close");
  } else {
    // console.log("Validation errors:", errors.value);
  }
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm"
  >
    <div
      class="sm:w-11/12 xl:w-2/4 lg:w-2/3 w-5/6 md:w-4/5 mx-auto bg-slate-200 rounded-lg shadow-lg flex flex-col relative h-auto max-h-[90vh] overflow-y-auto"
      v-if="!viewMode"
    >
      <button
        class="w-fit ml-auto m-4 group hover:text-pink-400"
        @click="$emit('close')"
      >
        <i
          class="pi pi-times text-xl text-pink-300 group-hover:text-pink-400"
        ></i>
      </button>
      <sub
        class="w-4/5 sm:w-5/6 md:w-full mx-auto flex sm:flex-row flex-col justify-evenly sm:my-6"
      >
        <FormKit
          type="text"
          name="firstName"
          label="First name"
          placeholder="John"
          validation="required"
          prefix-icon="avatarMan"
          v-model="formData.firstName"
          :classes="{
            prefixIcon: 'text-sky-950',
            input: 'text-sky-950',
          }"
        />

        <FormKit
          type="text"
          name="lastName"
          label="Last name"
          placeholder="Doe"
          validation="required"
          prefix-icon="avatarMan"
          v-model="formData.lastName"
          :classes="{
            prefixIcon: 'text-sky-950',
            input: 'text-sky-950',
          }"
        />
      </sub>
      <sub
        class="w-4/5 sm:w-5/6 md:w-full mx-auto flex sm:flex-row flex-col justify-evenly"
      >
        <FormKit
          type="email"
          name="email"
          label="Email"
          placeholder="Jane@example.com"
          validation="required|email"
          prefix-icon="email"
          v-model="formData.email"
          :classes="{
            prefixIcon: 'text-sky-950',
            input: 'text-sky-950',
          }"
        />
        <FormKit
          type="tel"
          label="Phone number"
          placeholder="xxxxxxxxxxx"
          :validation="[['required'], ['matches', /^\d{11}$/]]"
          prefix-icon="telephone"
          v-model="formData.phoneNumber"
          validation-visibility="dirty"
          :validation-messages="{
            required: 'Phone number is required',
            matches: 'Phone number must be 11 digits',
          }"
          :classes="{
            prefixIcon: 'text-sky-950',
            input: 'text-sky-950',
          }"
        />
      </sub>
      <sub
        class="sm:w-2/4 w-4/5 2xl:ml-56 lg:ml-5 xl:ml-6 md:w-full md:ml-2 flex flex-col justify-evenly sm:ml-8 ml-6 px-4 pt-4 mt-2"
      >
        <FormKit
          type="select"
          label="Select your state"
          prefix-icon="down"
          name="states"
          v-model="formData.state"
          :options="options"
          :classes="{
            prefixIcon: 'text-sky-950',
            input: 'text-sky-950',
          }"
        />
        <FormKit type="form" :actions="false">
          <FormKit
            type="checkbox"
            label="Status (active / inactive)"
            help="Check to mark as active"
            name="status"
            decorator-icon="check"
            v-model="formData.status"
          />
        </FormKit>
      </sub>
      <aside class="sm:w-fit w-4/5 sm:ml-auto sm:mr-6 mx-auto">
        <FormKit
          type="button"
          @click="handleSubmit"
          :disabled="Object.keys(errors).length > 0"
        >
          Save Details
        </FormKit>
      </aside>
    </div>
    <div
      class="sm:w-11/12 xl:w-2/4 lg:w-2/3 w-11/12 md:w-4/5 mx-auto bg-slate-200 rounded-lg shadow-lg flex flex-col relative h-auto max-h-[90vh] overflow-y-auto"
      v-else
    >
      <button
        class="w-fit ml-auto m-4 group hover:text-pink-400"
        @click="$emit('close')"
      >
        <i
          class="pi pi-times text-xl text-pink-300 group-hover:text-pink-400"
        ></i>
      </button>
      <section class="w-full h-fit flex">
        <aside class="flex flex-col ml-10 py-4">
          <h5 class="modalh5">Full Name</h5>
          <h1
            class="text-md md:text-lg lg:text-xl font-bold font-roboto text-sky-950"
          >
            {{ `${formData.firstName} ${formData.lastName}` }}
          </h1>
        </aside>
      </section>
      <section class="flex flex-col sm:flex-row justify-between">
        <aside class="flex flex-col ml-10 py-2">
          <h5 class="modalh5">Phone Number</h5>
          <h1
            class="text-md md:text-lg lg:text-xl font-bold font-roboto text-sky-950"
          >
            {{ formData.phoneNumber }}
          </h1>
        </aside>
        <aside class="flex flex-col ml-10 sm:ml-0 sm:mr-10 py-2">
          <h5 class="modalh5">Email Address</h5>
          <h1
            class="text-md md:text-lg lg:text-xl font-bold font-roboto text-sky-950"
          >
            {{ formData.email }}
          </h1>
        </aside>
      </section>
      <section class="flex flex-row justify-between mb-16">
        <aside class="flex flex-col ml-10 py-4">
          <h5 class="modalh5">State</h5>
          <h1
            class="text-md md:text-lg lg:text-xl font-bold font-roboto text-sky-950"
          >
            {{ `${formData.state} State(Nigeria)` }}
          </h1>
        </aside>
        <aside class="flex flex-col mr-10 py-4">
          <h5 class="modalh5">Status</h5>
          <h1
            class="text-md md:text-lg lg:text-xl font-bold font-roboto"
            :class="customer.status ? 'text-green-700' : 'text-red-800'"
          >
            {{ formData.status ? "Active" : "Inactive" }}
          </h1>
        </aside>
      </section>
    </div>
  </div>
</template>
