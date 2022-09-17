<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { get } from '@vueuse/core';

import BoardPositionEntry from './BoardPositionEntry.vue'
import InputSelectArray from '../General/InputSelectArray.vue';

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";
import { useIndexStore } from "../../stores/IndexStore";
import { useBoardStore } from "../../stores/BoardStore";

import { CalculateBoardPosition } from "../../utils/CalculatePositionAndId";

import { DownloadCanvas, GetDateForFileName } from '../../utils/SharingUtilities';
import html2canvas from 'html2canvas';

//Color Palettes
const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue, GetBoardDefaultColorId } = ColorPaletteStore;

//Board
const BoardStore = useBoardStore();
const { GetCellValue } = BoardStore;
const { BoardName, BoardFill } = storeToRefs(BoardStore);

//Index
const IndexStore = useIndexStore();
const { SetIndexContentType } = IndexStore;
const { SelectedIndexContentType, IndexContentTypes, } = storeToRefs(IndexStore);

const EncodedBoard = computed(() => {

    let result = {};

    for (let i = 0; i < get(BoardFill).length; i++) {

        let cellValue = GetCellValue(i);

        if (cellValue == GetBoardDefaultColorId() || cellValue == undefined) continue;

        else {

            let target = CalculateBoardPosition(i);
            if (result[cellValue]) {
                result[cellValue].push({
                    x: target.x + 1,
                    y: target.y
                })
            }
            else {
                result[cellValue] = [{
                    x: target.x + 1,
                    y: target.y
                }];
            }

        }

    }
    return result;
}
)

function SaveEncodedBoard() {
    html2canvas(document.getElementById('EncodedBoard'), {
        onclone: function (cloneDoc) {
            cloneDoc.getElementById('EncodedBoard').insertAdjacentHTML("afterbegin",
                `<div style="width: 100%; color: #101010; display: inline-block; text-align: center; font-size: 2em;">${get(BoardName)}</div><br/>`);

            cloneDoc.getElementById('EncodedBoard').insertAdjacentHTML("beforeend",
                `<div style="width: 100%; color: #101010; display: inline-block; text-align: center; font-size: 0.75em;">Grafika stworzona w aplikacji "W układzie z klockami" | ${GetDateForFileName()}</div><br/>`);

        }
    }).then(function (canvas) {
        DownloadCanvas(canvas, `zakodowana-plansza-${GetDateForFileName()}`);
    });
}

</script >

<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="EncodeBoardModal" tabindex="-1"
        aria-labelledby="CustomPaletteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="CustomPaletteModalLabel">Zakoduj rysunek: {{BoardName}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="d-flex flex-row gap-1 w-50 m-auto justify-content-evenly align-items-center">
                        <InputSelectArray @action=" (value)=> SetIndexContentType(value)"
                            :options="get(IndexContentTypes)" :selected-value="get(SelectedIndexContentType)"
                            aria-label="Wybór opisu pól" class="flex-grow-1"><span class="mb-3"><i class="bi"
                                    id="ALetter"></i> <i class="bi bi-1-square"></i> | Wybór opisu pól</span>
                        </InputSelectArray>

                    </div>

                    <div id="EncodedBoard" class="w-75 m-auto">

                        <div v-if="get(SelectedIndexContentType) != 3 && Object.keys(EncodedBoard).length != 0"
                            class="d-flex flex-column p-3">

                            <div v-for="(key, index) in Object.keys(EncodedBoard)" :key="index"
                                class="d-flex flex-row flex-wrap gap-1 align-items-center justify-content-start">

                                <div :style="{backgroundColor: InterpreteColorValue(key)}"
                                    class="d-block border border-dark colorBox-LineDsc">
                                </div>

                                <span class="mb-1">:</span>

                                <BoardPositionEntry v-for="(pos, index) in EncodedBoard[new Number(key)]" :key="index"
                                    :x="pos.x" :y="pos.y" />

                            </div>

                        </div>

                        <div v-else>
                            <h6>Brak zawartości</h6>
                            <p>Sprawdź czy plansza posiada zawartość i wybrano sposób opisu inny niż
                                <strong>Brak</strong>
                            </p>
                        </div>

                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-success me-5" @click="SaveEncodedBoard()">Zapis do
                        pliku</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zamknij</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.colorBox-LineDsc {
    width: 2em;
    height: 2em;
}
</style>