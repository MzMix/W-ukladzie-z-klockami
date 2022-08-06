<script setup>
import { storeToRefs } from 'pinia';
import { get } from '@vueuse/core';

import InputSelectArray from '../General/InputSelectArray.vue';
// import InputSelectMap from '../General/InputSelectMap.vue';

import { useSymetryStore } from "../../stores/SymetryStore";
import { useBoardStore } from "../../stores/BoardStore";
import { useStoreAxes } from "../../stores/AxesStore";
import { useCellStore } from "../../stores/CellStore";

//Symetry
const SymetryStore = useSymetryStore();
const { SetSymetry } = SymetryStore;
const { SelectedSymetry, SymetryTypes } = storeToRefs(SymetryStore);

//Board
const BoardStore = useBoardStore();
const { ClearBoard } = BoardStore;

// Axes
const AxesStore = useStoreAxes();
const { ToggleAxes } = AxesStore;

//Cell
const CellStore = useCellStore();
const { SetCellContentType } = CellStore;
const { CellContentTypes, SelectedCellContentType } = storeToRefs(CellStore);

// ChangePalette
// ColorPalettes, SelectedPaletteKey
</script>

<template>

    <div>
        <hr />

        <!-- Show axes -->
        <button class="btn btn-outline-info" @click="(ToggleAxes())">Przełącz osie</button>
        <hr />

        <!-- Switch symetry type  -->
        <InputSelectArray @action="(value) => SetSymetry(value)" :options="get(SymetryTypes)"
            :selected-value="get(SelectedSymetry)" ariaLabel="Wybór rodzaju symetrii">
            <i class="bi bi-symmetry-vertical"></i> <i class="bi bi-symmetry-horizontal"></i> | Wybór symetrii:
        </InputSelectArray>

        <!-- Switch cell content -->

        <InputSelectArray @action="(value) => SetCellContentType(value)" :options="get(CellContentTypes)"
            :selected-value="get(SelectedCellContentType)" aria-label="Wybór zawartości pól">
            <i class="bi bi-1-square"></i> <i class="bi bi-2-square"></i> | Wybór zawartości pól
        </InputSelectArray>

        <!-- Select Color Palette -->

        <!-- <InputSelectMap @action="(key) => ChangePalette(key)" :options="ColorPalettes" :selectedKey="SelectedPaletteKey"
            aria-label="Wybór zawartości pól">
            <i class="bi bi-palette"></i> | Zmiana palety kolorów
        </InputSelectMap> -->

        <!-- Clear board -->
        <button class="btn btn-danger" @click="ClearBoard()">Wyczyść planszę</button>
        <hr />
    </div>

</template>

<style scoped>
div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}
</style>
