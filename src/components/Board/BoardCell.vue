<script setup>
import { storeToRefs } from "pinia";
import { get } from '@vueuse/core';
import { computed, ref, watch } from "vue";

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";
import { useSymetryStore } from "../../stores/SymetryStore";
import { useBoardStore } from "../../stores/BoardStore";
import { useCellStore } from "../../stores/CellStore";

import { CalculatePosition, GetId, CalculateBoardPosition } from "../../utils/CalculatePositionAndId";
import { GetLetter } from "../../utils/TextUtilities";

// const { GetCellColor, SetCellColor_Selected } = store;

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { GetSelectedColor, InterpreteColorValue, GetBoardDefaultColorId } = ColorPaletteStore;

//Symetry
const SymetryStore = useSymetryStore();
const { SelectedSymetry } = storeToRefs(SymetryStore);

//Board
const BoardStore = useBoardStore();
const { SaveToBoard, GetCellValue } = BoardStore;
const { UseBoardHighlight } = storeToRefs(BoardStore);

//Cell
const CellStore = useCellStore();
const { SelectedCellContentType } = storeToRefs(CellStore);

const props = defineProps({
    cellId: Number,
});

const Hover = ref(false);

function ColorCell() {

    let target = null;
    let selectedColor = GetSelectedColor();

    if (selectedColor == undefined || selectedColor == null) return;

    switch (get(SelectedSymetry)) {
        //Brak
        default:
        case 0:
            target = null;
            break;

        //Oś X
        case 1:
            target = {
                x: get(PositionCCS).x,
                y: -get(PositionCCS).y,
            };
            break;

        //Oś Y
        case 2:
            target = {
                x: -get(PositionCCS).x,
                y: get(PositionCCS).y,
            };
            break;

        //Środek układu
        case 3:
            target = {
                x: -get(PositionCCS).x,
                y: -get(PositionCCS).y,
            };
            break;
    }

    SaveToBoard(props.cellId, selectedColor)

    if (target) {
        let targetId = document.getElementById(GetId(target)).getAttribute('pos');
        SaveToBoard(targetId, selectedColor)
    }

}

const PositionCCS = computed(() => {
    let id = new Number(props.cellId);
    return CalculatePosition(id);
});

const PositionBoard = computed(() => {
    let id = new Number(props.cellId);
    return CalculateBoardPosition(id);
});

const content = computed(() => {

    switch (get(SelectedCellContentType)) {
        //Brak
        default:
        case 0:
            return '';

        //Numeracja
        case 1:
            return props.cellId;

        //Adresowanie
        case 2:
            return `${GetLetter(get(PositionBoard).x)}${get(PositionBoard).y}`;

    }

});

const CellColor = computed(() => {
    let boardValue = GetCellValue(props.cellId);
    if (boardValue === null) boardValue = GetBoardDefaultColorId();
    return InterpreteColorValue(boardValue);
});

watch(Hover, () => {

    if (!get(UseBoardHighlight)) return;

    if (get(Hover)) {
        let indexX = document.getElementsByClassName(`x${get(PositionBoard).x + 1}`);
        let indexY = document.getElementsByClassName(`y${get(PositionBoard).y}`);

        for (let i = 0; i < 2; i++) {
            indexX[i].classList.add('cellOnHover');
            indexY[i].classList.add('cellOnHover');
        }
    } else {
        let indexX = document.getElementsByClassName(`x${get(PositionBoard).x + 1}`);
        let indexY = document.getElementsByClassName(`y${get(PositionBoard).y}`);

        for (let i = 0; i < 2; i++) {
            indexX[i].classList.remove('cellOnHover');
            indexY[i].classList.remove('cellOnHover');
        }
    }
})


</script>

<template>
    <div class="squareOnBoard border-top border-dark border-start" @click="ColorCell()"
        :style="{ backgroundColor: CellColor }" :id="GetId(PositionCCS)" @mouseover="Hover = true"
        @mouseleave="Hover = false">
        {{ content }}
    </div>
</template >

<style scoped>
div {
    font-size: .75rem;
}
</style>