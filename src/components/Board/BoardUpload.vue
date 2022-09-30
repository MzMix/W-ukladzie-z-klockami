<script setup>
import { useBoardStore } from "@Stores/BoardStore";
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";

import { inject } from 'vue';

const BoardStore = useBoardStore();
const { AddBoard } = BoardStore;

const ColorPaletteStore = useColorPaletteStore();
const { AppName } = ColorPaletteStore;

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
        ProcessJSON(LoadedJSON.Boards);
    };

    reader.readAsText(file);

}

//Add boards to store
function ProcessJSON(data) {

    let result;

    for (const board of data) {

        if (board.appOrigin == AppName) {
            AddBoard(board.BoardFill, board.BoardName, board.BoardDescription, board.appOrigin);
        }

        if (result) {
            ShowToast('#BoardsAdded');
            document.getElementById('fileInputForm').reset();
        }

    }
}
</script>
    
<template>
    <form id="fileInputForm">
        <label for="formFile" class="form-label">Importuj plansze: </label>
        <input class="form-control" type="file" id="formFile" accept="application/json" @change="onFileChange" />
    </form>
</template>