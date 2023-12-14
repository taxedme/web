<template>
  <div v-if="appRef.route == 'app' && appRef.preload.isLoaded" class=" flex lg:flex-row flex-col ">
    <!-- <div
      class="sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
    </div> -->
    <sidebar ></sidebar>
    <div class="flex-1 p-7 h-screen o flex flex-col overflow-y-auto">
      <Header></Header>
      <router-view></router-view>
    </div>
  </div>
  <div v-else-if="appRef.route == 'app' && !appRef.preload.isLoaded" class="min-h-full"></div>
  <router-view v-else></router-view>
</template>

<script setup>
import sidebar from '@/components/sections/sidebar.vue';
import Header from '@/components/sections/header.vue';

import { useAppStore } from '@/stores/app';
import { onBeforeMount } from 'vue';
import router from './router';

const appRef = useAppStore();

onBeforeMount(() => {

  router.isReady().then((e) => {
    if (!appRef.preload.isLoaded && appRef.route == 'app') {
      // Load app
      appRef.load()
    }
  })

})
</script>