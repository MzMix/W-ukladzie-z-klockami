<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import BoardPositionEntry from './BoardPositionEntry.vue'

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";
import { useBoardStore } from "../../stores/BoardStore";

const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue, GetBoardDefaultColorId } = ColorPaletteStore;

const BoardStore = useBoardStore();
const { GetCellValue } = BoardStore;
const { BoardName, BoardFill } = storeToRefs(BoardStore);

const EncodedBoard = computed(() => {

    // let result = new Map();

    // for (let i = 0; i < BoardFill.value.length; i++) {

    //     let cellValue = GetCellValue(i);

    //     if (cellValue == GetBoardDefaultColorId()) continue;

    //     else {
    //         result[cellValue].pos.push({
    //             x: 1,
    //             y: 1,
    //         })
    //     }

    // }

    let result = [{
        color: 0,
        pos: [
            {
                x: 1,
                y: 1
            }, {
                x: 2,
                y: 2
            }, {
                x: 3,
                y: 3
            }, {
                x: 4,
                y: 4
            }, {
                x: 5,
                y: 6
            },
        ]
    }];


    return result;
}
)
</script >

<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="EncodeBoardModal" tabindex="-1"
        aria-labelledby="CustomPaletteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="CustomPaletteModalLabel">Zakoduj rysunek</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <h4>{{BoardName}}</h4>

                    <hr />

                    <div class="d-flex flex-column p-3">

                        <div v-for="(entry, index) in EncodedBoard" :key="index"
                            class="d-flex flex-row flex-wrap gap-1 align-items-center justify-content-start">

                            <div :style="{backgroundColor: InterpreteColorValue(entry.color)}"
                                class="d-block border border-dark colorBox-LineDsc">
                            </div>

                            <span class="mb-1">:</span>

                            <BoardPositionEntry v-for="(pair, index) in entry.pos" :key="index" :x="pair.x"
                                :y="pair.y" />

                        </div>

                    </div>

                </div>
                <div class="modal-footer d-flex flex-row justify-content-around">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Zapis do pliku</button>
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

.colorBox {
    width: 1.5em;
    height: 1.5em;
}
</style>