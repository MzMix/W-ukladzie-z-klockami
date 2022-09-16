<script setup>
import ExportColorPalettes from './ExportColorPalettes.vue';
import { DownloadCanvas, GetDateForFileName } from '../../utils/SharingUtilities';
import html2canvas from 'html2canvas';
import { storeToRefs } from "pinia";
import { useBoardStore } from "../../stores/BoardStore";

const BoardStore = useBoardStore();
const { BoardName } = storeToRefs(BoardStore);

function SaveBoard() {
    html2canvas(document.getElementById('BoardOuterContainer'), {
        backgroundColor: null,
        onclone: function (cloneDoc) {
            console.log(BoardName.value)
            console.log(cloneDoc.getElementById('BoardOuterContainer'))
            cloneDoc.getElementById('BoardOuterContainer').insertAdjacentHTML("afterbegin",
                `<div style="width: 100%; color: #fff; display: inline-block; text-align: center; font-size: 2em;">${BoardName.value}</div><br/>`);
            console.log(cloneDoc.getElementById('BoardOuterContainer'))
        }
    }).then(function (canvas) {
        DownloadCanvas(canvas, `plansza-${GetDateForFileName()}`);
    });
}

</script>

<template>
    <div class="text-center p-2 w-100 ps-3">

        <h3 class="mt-2 mb-4">Udostępnianie <i class="bi bi-share"></i></h3>

        <ExportColorPalettes />

        <hr />

        <button type="button" class="btn btn-outline-primary" @click="SaveBoard()">Zapis planszy do pliku</button>

    </div>
</template>

<style scoped>

</style>