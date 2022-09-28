<script setup>
//Import from Vue
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useColorPaletteStore } from "@Stores/ColorPaletteStore";
import { useMenuStore } from '@Stores/MenuStore';

//Color Palette Store
const ColorPaletteStore = useColorPaletteStore();
const { InterpreteSelectedColor } = ColorPaletteStore;

//Menu Store
const MenuStore = useMenuStore();
const { UseColorIndicator, ModalOpened } = storeToRefs(MenuStore);

const position = ref({
    top: 0,
    left: 0
});

const onMouseMove = (e) => {

    if (!UseColorIndicator.value || ModalOpened.value) return;

    position.value.left = e.pageX + 'px';
    position.value.top = e.pageY + 'px';
};

onMounted(() => {
    document.addEventListener('mousemove', onMouseMove);
});

onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove);
});

</script>

<template>

    <div :id="'Colorindicator'"
        :style="{top: position.top, left: position.left, backgroundColor: InterpreteSelectedColor()}"
        class="border border-dark d-none">
    </div>

</template>

<style scoped>
#Colorindicator {
    position: absolute !important;
    z-index: 999 !important;
    transform: translate(-100%, -100%);
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 10%;
}
</style>