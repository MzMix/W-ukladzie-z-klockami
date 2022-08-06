<script setup>
import InputSelect from '../General/InputSelect.vue';
import { get } from '@vueuse/core';
import { useStore } from "../../stores/DrawingStore";
import { storeToRefs } from 'pinia';

const store = useStore();
const { ClearBoard, SetSymetry, ToggleAxes, SetCellContentType } = store;
const { SelectedSymetry, SymetryTypes, CellContentTypes, SelectedCellContentType } = storeToRefs(store);

</script>

<template>

    <div>
        <hr />

        <!-- Show axes -->
        <button class="btn btn-outline-info" @click="(ToggleAxes())">Przełącz osie</button>

        <!-- Switch symetry type  -->
        <InputSelect @action="(value) => SetSymetry(value)" :options="get(SymetryTypes)"
            :selected-value="get(SelectedSymetry)" ariaLabel="Wybór rodzaju symetrii">
            <i class="bi bi-symmetry-vertical"></i> <i class="bi bi-symmetry-horizontal"></i> | Wybór symetrii:
        </InputSelect>

        <!-- Switch cell content -->

        <InputSelect @action="(value) => SetCellContentType(value)" :options="get(CellContentTypes)"
            :selected-value="get(SelectedCellContentType)" aria-label="Wybór zawartości pól">
            <i class="bi bi-1-square"></i> <i class="bi bi-2-square"></i> | Wybór zawartości pól
        </InputSelect>

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
