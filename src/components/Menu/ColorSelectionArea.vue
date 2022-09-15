<script setup>
import ColorSelectButton from './ColorSelectButton.vue'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";
import { useBoardStore } from "../../stores/BoardStore";

const ColorPaletteStore = useColorPaletteStore();
const { ColorPalettes, SelectedPalette } = storeToRefs(ColorPaletteStore);

//Board
const BoardStore = useBoardStore();
const { ClearBoard } = BoardStore;

const colorSet = computed(() => {
    return ColorPalettes.value[SelectedPalette.value].colorSet;
});

</script>

<template>
    <div class="d-flex flex-column text-center h-100 pb-4 gap-4 justify-content-between">

        <div>
            <h3 class="mb-5">Kolory <i class="bi bi-palette"></i></h3>
            <div class="d-flex flex-wrap justify-content-around w-75 m-auto">
                <ColorSelectButton v-for="cl in colorSet" :key="colorSet.indexOf(cl)" :color="colorSet.indexOf(cl)" />
            </div>
        </div>

        <!-- Clear board -->
        <button class="btn btn-danger mb-4" @click="ClearBoard()">Wyczyść planszę <i class="bi bi-trash"></i></button>
    </div>

</template>

<style scoped>

</style>
