<script setup>
// Import Components
import SideMenu from '@MainPage/SideMenu.vue';
import WelcomeModal from '@General/WelcomeModal.vue';
import AppBoard from '@Board/AppBoard.vue';
import TopBar from '@MainPage/TopBar.vue';
import ToastManager from '@Toast/ToastManager.vue';
import ColorIndicator from '@General/ColorIndicator.vue';

//Import from Vue, Pinia, Bootstrap
import { onMounted, provide } from 'vue';
import { storeToRefs } from 'pinia';
import { Toast } from 'bootstrap';

//Import Utils
import { ShortcutManager } from '@Utils/ShortcutManager';

//Import Stores
import { useMenuStore } from '@Stores/MenuStore';
import { useColorPaletteStore } from '@Stores/ColorPaletteStore';
import { useIndexStore } from '@Stores/IndexStore';
import { useCellStore } from "@Stores/CellStore";
import { useSymetryStore } from "@Stores/SymetryStore";
import { useBoardStore } from "@Stores/BoardStore";

//Menu Store
const MenuStore = useMenuStore();
const { ShowLeaveWarn, UseColorIndicator } = storeToRefs(MenuStore);

//Palette Store
const ColorPaletteStore = useColorPaletteStore();
const { NextPalette } = ColorPaletteStore;

//Index Store
const IndexStore = useIndexStore();
const { NextIndex } = IndexStore;

//Cell Store
const CellStore = useCellStore();
const { NextCellContent } = CellStore;

//Symetry
const SymetryStore = useSymetryStore();
const { NextSymetry } = SymetryStore;

//Board Store
const BoardStore = useBoardStore();
const { ClearBoard } = BoardStore;

//Add warning on leaving
function LeaveWarn() {
  if (!ShowLeaveWarn.value) return;

  window.onbeforeunload = function () {
    return 'Are you sure you want to leave?';
  };
}

onMounted(() => {

  // eslint-disable-next-line no-unused-vars
  const Shortcuts = [
    new ShortcutManager('Alt', 'P', () => {
      NextPalette();
      ToastTrigger('#PaletteChanged');
    }),

    new ShortcutManager('Alt', 'O', () => {
      NextIndex();
      ToastTrigger('#IndexChanged');
    }),

    new ShortcutManager('Alt', 'Z', () => {
      NextCellContent();
      ToastTrigger('#CellContentChanged');
    }),

    new ShortcutManager('Alt', 'S', () => {
      NextSymetry();
      ToastTrigger('#SymetryChanged');
    }),

    new ShortcutManager('Alt', 'C', () => {
      ToastTrigger('#ClearBoard');
    }),

    new ShortcutManager('Alt', '/', () => {
      ClearBoard();
    }),

  ];

  LeaveWarn();
});

function ToastTrigger(querry, options = {
  animation: true,
  autohide: true,
  delay: 5000
}) {

  const toastElList = document.querySelectorAll(querry);
  const toastList = [...toastElList].map(toastEl => new Toast(toastEl, options));

  toastList.forEach(toast => {
    toast.show();
  });
}

//Provide function to trigger toasts
provide('ToastTrigger', ToastTrigger);

//Provide function to show Color Indicator
provide('ShowColorIndicator', () => {

  if (!UseColorIndicator.value) return;

  let classList = document.getElementById('Colorindicator').classList;

  classList.remove('d-none');
  classList.add('d-block');

  setTimeout(() => {
    classList.remove('d-block');
    classList.add('d-none');
  }, 3000);

});

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

    <ToastManager />

    <ColorIndicator v-if="UseColorIndicator" />

  </div>

  <WelcomeModal />

</template>

<style scoped>

</style>
