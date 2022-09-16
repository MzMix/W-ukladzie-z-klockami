<script setup>
import { storeToRefs } from 'pinia';
import { get } from '@vueuse/core';

import InputSelectArray from '../General/InputSelectArray.vue';

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";
import { useSymetryStore } from "../../stores/SymetryStore";
import { useIndexStore } from "../../stores/IndexStore";
import { useBoardStore } from "../../stores/BoardStore";
import { useStoreAxes } from "../../stores/AxesStore";
import { useCellStore } from "../../stores/CellStore";

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { SetPalette } = ColorPaletteStore;
const { ColorPalettes, SelectedPalette } = storeToRefs(ColorPaletteStore);

//Symetry
const SymetryStore = useSymetryStore();
const { SetSymetry } = SymetryStore;
const { SelectedSymetry, SymetryTypes } = storeToRefs(SymetryStore);

//Index
const IndexStore = useIndexStore();
const { SetIndexContentType } = IndexStore;
const { SelectedIndexContentType, IndexContentTypes, } = storeToRefs(IndexStore);

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

    <div class="text-center p-2 w-100 ps-3">
        <h3 class="mt-2 mb-4">Rysowanie <i class="bi bi-brush"></i></h3>

        <!-- Show axes -->
        <button class="btn btn-outline-primary" @click="(ToggleAxes())">Przełącz osie</button>
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

        <!-- Switch index content -->

        <InputSelectArray @action="(value) => SetIndexContentType(value)" :options="get(IndexContentTypes)"
            :selected-value="get(SelectedIndexContentType)" aria-label="Wybór opisu pól">
            <i class="bi" id="ALetter"></i> <i class="bi bi-1-square"></i> | Wybór opisu
            pól
        </InputSelectArray>

        <!-- Select Color Palette -->

        <InputSelectArray @action="(value) => SetPalette(value)" :options="get(ColorPalettes)"
            :selected-value="get(SelectedPalette)" aria-label="Wybór palety kolorów">
            <i class="bi bi-palette"></i> | Zmiana palety kolorów
        </InputSelectArray>

        <!-- Clear board -->
        <button class="btn btn-danger mb-4 w-75 m-auto" @click="ClearBoard()">Wyczyść planszę</button>
    </div>

</template>

<style scoped>
div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

#ALetter {
    content: url('../../assets/A square.svg');
    vertical-align: -0.125em;
}
</style>
