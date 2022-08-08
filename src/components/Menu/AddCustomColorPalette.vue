<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from 'pinia'
import { get } from '@vueuse/core';

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

const ColorPaletteStore = useColorPaletteStore();
//  const { AddPalette, RemovePalette } = ColorPaletteStore;
const { ColorPalettes } = storeToRefs(ColorPaletteStore);

const newPalette = ref(ColorPalettes.value[0]);

const paletteName = ref(`NowaPaleta-${get(ColorPalettes).length - 1}`);

onMounted(() => {
    get(newPalette).value = 11;
});

</script>

<template>
    <div>
        <h4>Dodawanie nowej palety kolorów: </h4>

        <form>
            <div class="mb-3 text-lg-start row">
                <div class="col-auto p-1"> <label for="paletteName" class="form-label">Nazwa palety kolorów: </label>
                </div>
                <div class="col"> <input type="text" class="form-control" id="paletteName" v-model="paletteName">
                </div>
            </div>

            <div class="colorEntry mb-3">
                <div v-for="cl in newPalette.colorSet" :key="cl" class="border border-dark border-2"
                    :style="{ backgroundColor: cl }"></div>
            </div>

            <button type="submit" class="btn btn-success">Dodaj paletę</button>
        </form>

    </div>
</template>

<style scoped>
.colorEntry {
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 0.5em;
}

.colorEntry div {
    aspect-ratio: 1/1;
    width: 2em;
    height: 2em;
    border-radius: 10%;
}
</style>