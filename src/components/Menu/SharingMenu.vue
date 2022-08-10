<script setup>
import ExportColorPalettes from './ExportColorPalettes.vue';
import { DownloadCanvas, GetDateForFileName } from '../../utils/SharingUtilities';
import html2canvas from 'html2canvas';

function SaveBoard() {
    html2canvas(document.getElementById('BoardContainer'), {
        backgroundColor: null
    }).then(function (canvas) {
        DownloadCanvas(canvas, `plansza-${GetDateForFileName()}`);
    });
}

</script>

<template>
    <div>
        <hr />
        <ExportColorPalettes />
        <hr />
        <button type="button" class="btn btn-outline-primary" @click="SaveBoard()">Zapis planszy do pliku</button>
        <hr />

    </div>
</template>

<style scoped>
</style>