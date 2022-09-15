<script setup>
import ColorSelectionArea from '../Menu/ColorSelectionArea.vue'
import SettingsMenu from '../Menu/SettingsMenu.vue';
import DrawingMenu from '../Menu/DrawingMenu.vue'
import SharingMenu from '../Menu/SharingMenu.vue';

import { useMenuStore } from "../../stores/MenuStore";
import { storeToRefs } from 'pinia';

const MenuStore = useMenuStore();
const { MenuOpened } = storeToRefs(MenuStore);
</script>

<template>
    <div class="d-flex flex-column pt-4 ps-4 border-end border-dark h-100 align-content-center position-relative">

        <Transition name="slide-up">
            <ColorSelectionArea v-if="MenuOpened == 0" class="position-absolute w-85" />
            <DrawingMenu v-else-if="MenuOpened == 1" class="position-absolute w-85" />
            <SharingMenu v-else-if="MenuOpened == 2" class="position-absolute w-85" />
            <SettingsMenu v-else-if="MenuOpened == 3" class="position-absolute w-85" />
        </Transition>

    </div>
</template>

<style scoped>
.w-85 {
    width: 85% !important;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>