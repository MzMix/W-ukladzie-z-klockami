<script setup>
import { storeToRefs } from 'pinia';

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

import { DonloadContent } from '../../utils/SharingUtilities';

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { ColorPalettes, SelectedPalette } = storeToRefs(ColorPaletteStore);

function ExportColorPalettes() {

    let customPaletes = ColorPalettes.value.slice(2);
    let out = JSON.stringify({ ColorPalettes: customPaletes, SelectedPalette: SelectedPalette.value }, null, 4);

    DonloadContent(out, 'palety-eksport.json', 'text/plain');
}

</script>

<template>
    <button type="button" class="btn btn-outline-primary" @click="ExportColorPalettes()">Eksportuj palety
        kolorów</button>
</template>

<style scoped>
</style>>