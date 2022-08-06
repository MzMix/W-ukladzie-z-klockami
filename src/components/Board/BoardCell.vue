<script setup>
import { computed } from "vue";
import { get } from '@vueuse/core';

import { storeToRefs } from "pinia";
import { useStore } from "../../stores/DrawingStore";

import { CalculatePosition, GetId, CalculateBoardPosition } from "../../utils/CalculatePositionAndId";
import { GetLetter } from "../../utils/TextUtilities";

const store = useStore();
const { GetCellColor, SetCellColor_Selected } = store;
const { SelectedSymetry, SelectedCellContentType } = storeToRefs(store);

const props = defineProps({
    cellId: Number,
});

function ColorCell() {

    let target = null;

    console.log(SelectedSymetry);
    switch (get(SelectedSymetry)) {
        //Brak
        default:
        case 0:
            target = null;
            break;

        //Oś X
        case 1:
            target = {
                x: get(PoitionCCS).x,
                y: -get(PoitionCCS).y,
            };
            break;

        //Oś Y
        case 2:
            target = {
                x: -get(PoitionCCS).x,
                y: get(PoitionCCS).y,
            };
            break;

        //Środek układu
        case 3:
            target = {
                x: -get(PoitionCCS).x,
                y: -get(PoitionCCS).y,
            };
            break;
    }

    SetCellColor_Selected(props.cellId);

    if (target) {
        let targetId = document.getElementById(GetId(target)).getAttribute('pos');
        SetCellColor_Selected(targetId);
    }

}

const PoitionCCS = computed(() => {
    let id = new Number(props.cellId);
    return CalculatePosition(id);
});

const PoitionBoard = computed(() => {
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
            return `${GetLetter(get(PoitionBoard).x)}${get(PoitionBoard).y}`;

    }

});

</script>

<template>
    <div class="squareOnBoard border-top border-dark border-start" @click="ColorCell()"
        :style="{ backgroundColor: GetCellColor(props.cellId) }" v-bind="{ id: GetId(PoitionCCS) }">
        {{ content }}
    </div>
</template >

<style scoped>
div {
    font-size: .75rem;
}
</style>