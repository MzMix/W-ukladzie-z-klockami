<script setup>
// import { computed } from "vue";
import { storeToRefs } from 'pinia'

import AddCustomColorPalette from './AddCustomColorPalette.vue';

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

const ColorPaletteStore = useColorPaletteStore();
// const { AddPalette, RemovePalette } = ColorPaletteStore;

const { ColorPalettes } = storeToRefs(ColorPaletteStore);

</script>

<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="CustomPaletteModal" tabindex="-1"
        aria-labelledby="CustomPaletteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="CustomPaletteModalLabel">Zarządzaj paletami kolorów</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div v-for="cp in ColorPalettes" :key="cp.value" class="list-group-item colorPaletteEntry">

                        <div class="descriptionEntry">
                            {{ cp.text }}:
                        </div>

                        <div class="colorEntry">
                            <div v-for="cl in cp.colorSet" :key="cl" class="border border-dark border-2"
                                :style="{ backgroundColor: cl }"></div>
                        </div>

                        <div class="actionEntry">
                            <button type="button" class="btn btn-info m-1" :disabled="!cp.standard">
                                <i class="bi bi-pencil"></i>
                            </button>

                            <button type="button" class="btn btn-danger m-1" :disabled="!cp.standard">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>


                    <div class="d-flex flex-row-reverse m-1">
                        <button type="button" class="btn btn-success m-1" data-bs-toggle="collapse"
                            href="#addCustomPalette" role="button" aria-expanded="false"
                            aria-controls="addCustomPalette">
                            <i class="bi bi-plus-square"></i>
                        </button>
                    </div>

                    <div class="collapse" id="addCustomPalette">
                        <div class="card card-body">
                            <AddCustomColorPalette />
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zamknij</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.colorPaletteEntry {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    text-align: left;
}

.descriptionEntry {
    text-align: left;
}

.colorEntry {
    display: flex;
    flex-direction: row;
    justify-content: start;
    column-gap: 0.5em;
}

.colorEntry div {
    aspect-ratio: 1/1;
    width: 2em;
    height: 2em;
    border-radius: 10%;
}

.actionEntry {
    text-align: right;
}
</style>