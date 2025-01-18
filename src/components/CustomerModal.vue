<script setup>
import { ref, computed, watch, toRefs } from "vue";
import allStates from "../naija-states.json";
import { useCustomerStore } from "../stores/Customerstore";
import { validateForm } from "../utils/Validation";

const props = defineProps({
  customer: Object,
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
      class="sm:w-11/12 xl:w-2/4 lg:w-2/3 w-5/6 md:w-4/5 mx-auto bg-slate-200 rounded-lg shadow-lg flex flex-col relative"
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
        />
        <FormKit
          type="text"
          name="lastName"
          label="Last name"
          placeholder="Doe"
          validation="required"
          prefix-icon="avatarMan"
          v-model="formData.lastName"
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
        />
        <FormKit
          type="tel"
          label="Phone number"
          placeholder="xxx-xxx-xxxx"
          validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
          prefix-icon="telephone"
          v-model="formData.phoneNumber"
        />
      </sub>
      <sub
        class="sm:w-2/4 w-4/5 2xl:ml-56 lg:ml-5 xl:ml-9 md:w-full md:ml-2 flex flex-col justify-evenly sm:ml-8 ml-6 px-4 pt-4 mt-2"
      >
        <FormKit
          type="select"
          label="Select your state"
          prefix-icon="down"
          name="states"
          v-model="formData.state"
          :options="options"
        />
        <FormKit type="form" :actions="false">
          <FormKit
            type="checkbox"
            label="Status (Active)"
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
  </div>
</template>
