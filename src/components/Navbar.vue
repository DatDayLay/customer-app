<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>

<template>
  <nav
    class="w-[15%] rounded-lg bg-black flex flex-col z-10 sm:relative py-2 h-[97vh] my-auto sm:flex-col justify-between items-center"
  >
    <h1
      class="hidden text-lg lg:inline text-gray-200 w-[96%] lg:mx-auto text-left font-manrope px-[3%]"
    >
      Styro<span class="text-xl text-pink-300 non-italic font-cabin">Foam</span>
    </h1>
    <h1
      class="text-lg text-gray-200 w-[96%] mx-auto text-center font-manrope px-[3%] lg:hidden"
    >
      S<span class="text-xl text-pink-300 non-italic font-cabin lg:hidden"
        >F</span
      >
    </h1>

    <ul class="w-full flex flex-col justify-evenly h-[40%]">
      <li class="sideBarLi">
        <i class="pi pi-gauge"></i>
        <span class="sideSpan"> Dashboard</span>
      </li>
      <li class="sideBarLi-active">
        <i class="pi pi-users"></i>
        <span class="sideSpan"> Customers</span>
      </li>
      <li class="sideBarLi">
        <i class="pi pi-objects-column"></i>
        <span class="sideSpan"> Products</span>
      </li>
      <li class="sideBarLi">
        <i class="pi pi-chart-bar"></i>
        <span class="sideSpan"> Analytics</span>
      </li>
    </ul>
    <ul class="w-full mx-auto flex flex-col justify-evenly h-[10%]">
      <li class="sideBarLi">
        <i class="pi pi-cog"></i>
        <span class="sideSpan"> Settings</span>
      </li>
      <li class="sideBarLi">
        <i class="pi pi-power-off"></i>
        <span class="sideSpan"> Logout</span>
      </li>
    </ul>
    <!-- <button
      class="lg:hidden text-gray-200 absolute flex right-6 top-4"
      @click="isMenuOpen = !isMenuOpen"
    >
      <i class="pi pi-bars"></i>
    </button> -->
    <!-- <ul
      class="flex-col w-fit p-0 lg:flex-col lg:w-fit justify-evenly items-center"
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
    </ul> -->
  </nav>
</template>

<!-- :class="{
  flex: isMenuOpen,
  hidden: !isMenuOpen,
  'lg:flex': true,
}" -->
