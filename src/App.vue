<script setup>
import SideMenu from './components/SideMenu.vue'
import WelcomeModal from './components/WelcomeModal.vue'
import Board from './components/Board.vue'

</script>

<template>

  <div class=" d-flex flex-row p-0 overflow-hidden w-100">

    <div class="p-0 m-0 vh-100">
      <SideMenu />
    </div>

    <div class="p-0 m-0 vh-100" id="boardHalf">
      <Board />
    </div>

  </div>

  <WelcomeModal />

</template>

<style scoped>
#boardHalf {
  display: grid;
  place-content: center;
  width: 100%;
}
</style>
