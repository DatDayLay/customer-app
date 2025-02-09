<script setup>
import { ref, computed, watch } from "vue";
import allStates from "../naija-states.json";
import { useCustomerStore } from "../stores/Customerstore";
import Tiptap from "../components/TipTap.vue";
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

const formData = ref({
  ...props.customer,
  description: props.customer?.description || "",
});
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
            prefixIcon: 'text-black',
            input: 'text-zinc-950',
            label: 'text-zinc-900 font-medium  ',
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
            prefixIcon: 'text-black',
            input: 'text-zinc-950',
            label: 'text-zinc-900 font-medium  ',
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
            prefixIcon: 'text-black',
            input: 'text-zinc-950',
            label: 'text-zinc-900 font-medium  ',
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
            prefixIcon: 'text-black',
            input: 'text-zinc-950',
            label: 'text-zinc-900 font-medium  ',
          }"
        />
      </sub>
      <sub
        class="sm:w-4/5 w-2/4 ml-[6%] sm:ml-[7%] md:ml-[2.8%] lg:ml-[5%] md:w-full flex flex-col justify-evenly px-4 pt-4 mt-2"
      >
        <FormKit
          type="select"
          label="Select your state"
          prefix-icon="down"
          name="states"
          v-model="formData.state"
          :options="options"
          :classes="{
            prefixIcon: 'text-black',
            input: 'text-zinc-950',
            label: 'text-zinc-900 font-medium  ',
          }"
        />
        <FormKit type="form" :actions="false">
          <FormKit
            type="checkbox"
            label="Status"
            help="Check to mark as active"
            name="status"
            decorator-icon="check"
            v-model="formData.status"
            :classes="{
              label: 'text-zinc-900 font-medium  ',
            }"
          />
        </FormKit>
      </sub>
      <Tiptap v-model="formData.description" />
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
        <aside class="flex flex-col ml-5 md:ml-10 py-4">
          <h5 class="modalh5">Full Name</h5>
          <h1 class="viewModalH1">
            {{ `${formData.firstName} ${formData.lastName}` }}
          </h1>
        </aside>
      </section>
      <section class="flex flex-col sm:flex-row justify-between">
        <aside class="flex flex-col ml-5 md:ml-10 py-2">
          <h5 class="modalh5">Phone Number</h5>
          <h1 class="viewModalH1">
            {{ formData.phoneNumber }}
          </h1>
        </aside>
        <aside class="flex flex-col ml-5 md:ml-10 sm:mr-5 py-2">
          <h5 class="modalh5">Email Address</h5>
          <h1 class="viewModalH1">
            {{ formData.email }}
          </h1>
        </aside>
      </section>
      <section class="flex flex-row justify-between">
        <aside class="flex flex-col ml-5 md:ml-10 py-4">
          <h5 class="modalh5">State</h5>
          <h1 class="viewModalH1">
            {{ `${formData.state} State(Nigeria)` }}
          </h1>
        </aside>
        <aside class="flex flex-col mr-5 md:mr-10 py-4">
          <h5 class="modalh5">Status</h5>
          <h1
            class="text-sm md:text-base font-medium font-manrope"
            :class="customer.status ? 'text-green-700' : 'text-red-800'"
          >
            {{ formData.status ? "Active" : "Inactive" }}
          </h1>
        </aside>
      </section>
      <section class="w-full h-fit flex">
        <aside class="flex flex-col ml-5 md:ml-10 mr-2 py-4 mb-16">
          <h5 class="modalh5">Customer Details</h5>
          <div
            v-html="formData.description"
            class="w-[100%] mx-auto text-left text-xs md:text-sm prose font-manrope text-black"
          ></div>
        </aside>
      </section>
    </div>
  </div>
</template>
