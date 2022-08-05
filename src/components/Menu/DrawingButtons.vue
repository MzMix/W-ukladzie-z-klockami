<script setup>
import InputSelect from '../General/InputSelect.vue';
import { get } from '@vueuse/core';
import { useStore } from "../../stores/DrawingStore";
import { storeToRefs } from 'pinia';

const store = useStore();
const { ClearBoard, SetSymetry } = store;
const { SelectedSymetry, SymetryTypes } = storeToRefs(store);

</script>

<template>

    <div>
        <InputSelect @action="(value) => SetSymetry(value)" :options="get(SymetryTypes)" :value="get(SelectedSymetry)"
            ariaLabel="Wybór rodzaju symetrii">
            <i class="bi bi-symmetry-vertical"></i> <i class="bi bi-symmetry-horizontal"></i> | Wybór symetrii:
        </InputSelect>

        <button class="btn btn-danger" @click="ClearBoard()">Wyczyść planszę</button>
    </div>

</template>

<style scoped>
div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}
</style>
