<template>
  <div class="flex flex-col h-screen">
    <!-- Top Menu -->
    <top-menu />

    <main class="flex flex-row h-full">
      <!-- Side Menu -->
      <side-menu />

      <!-- RouterView -->
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import SideMenu from '@/modules/common/components/SideMenu.vue'
import TopMenu from '@/modules/common/components/TopMenu.vue'
</script>
