<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { get } from '@vueuse/core';

import BoardPositionEntry from '@EncodeBoard/BoardPositionEntry.vue';
import InputSelectArray from '@General/InputSelectArray.vue';

import { useColorPaletteStore } from "@Stores/ColorPaletteStore";
import { useIndexStore } from "@Stores/IndexStore";
import { useBoardStore } from "@Stores/BoardStore";

import { CalculateBoardPosition } from "@Utils/CalculatePositionAndId";

//Color Palettes
const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue, GetBoardDefaultColorId } = ColorPaletteStore;

//Board
const BoardStore = useBoardStore();
const { GetCellValue } = BoardStore;
const { BoardFill } = storeToRefs(BoardStore);

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
                });
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
);

</script >

<template>
    <div class="d-flex flex-row gap-1 w-50 m-auto justify-content-evenly align-items-center">
        <InputSelectArray @action=" (value)=> SetIndexContentType(value)" :options="get(IndexContentTypes)"
            :selected-value="get(SelectedIndexContentType)" aria-label="Wybór opisu pól" class="flex-grow-1"><span
                class="mb-3"><i class="bi ALetter"></i> <i class="bi bi-1-square"></i> | Wybór opisu pól</span>
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

                <BoardPositionEntry v-for="(pos, index) in EncodedBoard[new Number(key)]" :key="index" :x="pos.x"
                    :y="pos.y" />

            </div>

        </div>

        <div v-else>
            <h6>Brak zawartości</h6>
            <p>Sprawdź czy plansza posiada zawartość i wybrano sposób opisu inny niż
                <strong>Brak</strong>
            </p>
        </div>

    </div>


</template>

<style scoped>
.colorBox-LineDsc {
    width: 2em;
    height: 2em;
}
</style>