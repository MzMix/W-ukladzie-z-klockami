<script setup>
import ExportColorPalettes from '@ColorManager/ExportColorPalettes.vue';

import { useBoardStore } from "@Stores/BoardStore";

import { SaveBoard } from '@Utils/SaveBoard';

const BoardStore = useBoardStore();
const { GetBoardName } = BoardStore;

</script>

<template>
    <div class="text-center p-2 w-100 ps-3">

        <h4 class="mt-2 mb-4">Udostępnianie <i class="bi bi-share"></i></h4>

        <button class="btn btn-outline-primary w-100" type="button" data-bs-toggle="modal" data-bs-target="#EncodeBoardModal">
            Zakoduj planszę
        </button>

        <hr />

        <ExportColorPalettes />

        <hr />

        <div class="btn-group">

            <button class="btn btn-outline-primary w-100" type="button"
                @click="SaveBoard(true, GetBoardName())">
                Zapis zdjęcia planszy do pliku
            </button>

            <button type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>

            <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="SaveBoard(false)">Zapisz zdjęcie planszy bez tytułu</a></li>
            </ul>

        </div>

        <!-- <EncodeBoardModal /> -->

    </div>
</template>

<style scoped>

</style>