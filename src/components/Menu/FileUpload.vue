<script setup>

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

const ColorPaletteStore = useColorPaletteStore();
const { AddPalette } = ColorPaletteStore;

function onFileChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    let LoadedFile = files[0];
    ReadFile(LoadedFile);
}

function ReadFile(file) {
    let reader = new FileReader();
    reader.onload = e => {
        let LoadedJSON = JSON.parse(e.target.result);
        ProcessJSON(LoadedJSON.ColorPalettes);
    };
    reader.readAsText(file);

}

function ProcessJSON(data) {
    for (const cp of data) {
        AddPalette(cp.text, cp.colorSet);
    }

}

</script>

<template>
    <div>
        <label for="formFile" class="form-label">Importuj palety kolorów: </label>
        <input class="form-control" type="file" id="formFile" accept="application/json" @change="onFileChange" />
    </div>
</template>