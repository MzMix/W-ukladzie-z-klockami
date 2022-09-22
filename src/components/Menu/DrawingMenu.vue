<script setup>
//Import from Pinia, Vueuse, Vue
import { storeToRefs } from 'pinia';
import { get } from '@vueuse/core';
import { inject } from 'vue';

//Import component
import InputSelectArray from '@General/InputSelectArray.vue';
import bsTooltip from '@General/bsTooltip.vue';

//Import stores from Pinia
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";
import { useSymetryStore } from "@Stores/SymetryStore";
import { useIndexStore } from "@Stores/IndexStore";
import { useStoreAxes } from "@Stores/AxesStore";
import { useCellStore } from "@Stores/CellStore";

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { SetPalette, GetSelectedPaletteOrigin } = ColorPaletteStore;
const { ColorPalettes, SelectedPalette, AppName } = storeToRefs(ColorPaletteStore);

//Symetry
const SymetryStore = useSymetryStore();
const { SetSymetry } = SymetryStore;
const { SelectedSymetry, SymetryTypes } = storeToRefs(SymetryStore);

//Index
const IndexStore = useIndexStore();
const { SetIndexContentType } = IndexStore;
const { SelectedIndexContentType, IndexContentTypes } = storeToRefs(IndexStore);

// Axes
const AxesStore = useStoreAxes();
const { ToggleAxes } = AxesStore;
const { AxesShown } = storeToRefs(AxesStore);

//Cell
const CellStore = useCellStore();
const { SetCellContentType } = CellStore;
const { CellContentTypes, SelectedCellContentType } = storeToRefs(CellStore);

//Inject Toast trigger
const ShowToast = inject('ToastTrigger');

function ChangeSymetryType(value) {
    SetSymetry(value);

    ShowToast('#SymetryChanged', { delay: 2500 });
}

</script>

<template>

    <div class="text-center p-2 w-100 ps-3">
        <h4 class="mt-2 mb-4">Rysowanie <i class="bi bi-brush"></i></h4>

        <!-- Show axes -->
        <button class="btn btn-outline-primary" @click="(ToggleAxes())">
            <span v-if="!AxesShown">Pokaż osie</span>
            <span v-if="AxesShown">Ukryj osie</span>
        </button>
        <hr />

        <!-- Switch symetry type  -->
        <InputSelectArray @action="(value) => ChangeSymetryType(value)" :options="get(SymetryTypes)"
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
            <bsTooltip v-if="GetSelectedPaletteOrigin() != AppName" title="Ta paleta pochodzi z innej aplikacji!">
                <i class="bi bi-exclamation-triangle-fill" :style="{color: 'red'}"></i>
            </bsTooltip>
        </InputSelectArray>

        <!-- Clear board -->
        <button class="btn btn-danger m-auto w-75" @click="ShowToast(`#ClearBoard`, { autohide: false })
        ">Wyczyść planszę <i class="bi bi-trash"></i></button>
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
        