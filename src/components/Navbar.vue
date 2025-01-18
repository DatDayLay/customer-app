<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>

<template>
  <nav
    class="w-full bg-sky-950 p-2 flex flex-col z-10 sm:relative sm:h-fit sm:flex-row justify-between items-center"
  >
    <h1 class="text-xl text-gray-200 m-auto sm:ml-28">
      Styro<span class="text-2xl text-pink-300 non-italic">Foam</span>
    </h1>
    <button
      class="lg:hidden text-gray-200 absolute flex right-6 top-4"
      @click="isMenuOpen = !isMenuOpen"
    >
      <i class="pi pi-bars"></i>
    </button>
    <ul
      :class="{
        flex: isMenuOpen,
        hidden: !isMenuOpen,
        'lg:flex': true,
      }"
      class="flex-col w-3/5 p-0 lg:flex-row lg:w-3/5 justify-evenly items-center space-y-2 lg:space-y-0"
    >
      <li class="group menu-item">
        <i class="pi pi-gauge menu-icon"></i>
        Dashboard
      </li>
      <li class="menu-item menu-item-active">
        <i class="pi pi-users text-slate-200 text-base m-auto px-0.5"></i>
        Customers
      </li>
      <li class="group menu-item">
        <i class="pi pi-objects-column menu-icon"></i>
        Products
      </li>
      <li class="group menu-item">
        <i class="pi pi-sign-out menu-icon"></i>
        Logout
      </li>
    </ul>
  </nav>
</template>
