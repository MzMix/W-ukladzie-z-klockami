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
    <div class="d-flex flex-column text-center h-100 pb-4 gap-4">

        <h3 class="mb-4">Udostępnianie <i class="bi bi-share"></i></h3>

        <ExportColorPalettes />

        <hr />

        <button type="button" class="btn btn-outline-primary" @click="SaveBoard()">Zapis planszy do pliku</button>

    </div>
</template>

<style scoped>

</style>