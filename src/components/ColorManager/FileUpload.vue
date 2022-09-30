<script setup>
//Import Components
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";

//Import from Vue
import { inject } from 'vue';

const ColorPaletteStore = useColorPaletteStore();
const { AddPalette } = ColorPaletteStore;

//Inject Toast trigger
const ShowToast = inject('ToastTrigger');

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

//Add color palettes-cp to store
function ProcessJSON(data) {

    let result;

    for (const cp of data) {
        if (cp.appOrigin) {
            result = AddPalette(cp.text, cp.colorSet, cp.appOrigin);
        } else {
            result = AddPalette(cp.text, cp.colorSet, 'UNKNOWN');
        }
    }

    if (result) {
        ShowToast('#ColorPalettesAdded');
        document.getElementById('fileInputForm').reset();
    }
    else {
        ShowToast('#ColorPaletteExists');
    }

}

</script>

<template>
    <form id="fileInputForm">
        <label for="formFile" class="form-label">Importuj palety kolorów: </label>
        <input class="form-control" type="file" id="formFile" accept="application/json" @change="onFileChange" />
    </form>
</template>