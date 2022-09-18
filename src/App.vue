<script setup>
import SideMenu from './components/MainPage/SideMenu.vue'
import WelcomeModal from './components/General/WelcomeModal.vue'
import AppBoard from './components/Board/AppBoard.vue'
import TopBar from './components/MainPage/TopBar.vue'
import { onMounted } from 'vue';

import { useMenuStore } from './stores/MenuStore'
import { storeToRefs } from 'pinia';

const MenuStore = useMenuStore();
const { ShowLeaveWarn } = storeToRefs(MenuStore);

onMounted(() => {

  if (!ShowLeaveWarn.value) return;

  window.onbeforeunload = function () {
    return 'Are you sure you want to leave?';
  };
})

</script>

<template>

  <div class="container-fluid vh-100 d-flex flex-column flex-nowrap overflow-hidden">

    <div class="row">
      <TopBar />
    </div>

    <div class="row flex-grow-1">

      <div class="col-xl-3 col-lg-4 col-sm-3">
        <SideMenu />
      </div>

      <div class="col-xl-9 col-lg-8 col-sm-9 pt-4 d-flex flex-column justify-content-center">
        <AppBoard class="mb-5" />
      </div>

    </div>

  </div>

  <WelcomeModal />

</template>

<style scoped>

</style>
