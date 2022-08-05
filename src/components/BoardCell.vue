<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useStore } from "../stores/DrawingStore";
import { get } from '@vueuse/core';

import { CalculatePosition, GetId } from "../utils/CalculatePositionAndId";

const store = useStore();
const { GetCellColor, SetCellColor_Selected } = store;
const { SelectedSymetry } = storeToRefs(store);

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
                x: get(position).x,
                y: -get(position).y,
            };
            break;

        //Oś Y
        case 2:
            target = {
                x: -get(position).x,
                y: get(position).y,
            };
            break;

        //Środek układu
        case 3:
            target = {
                x: -get(position).x,
                y: -get(position).y,
            };
            break;
    }

    SetCellColor_Selected(props.cellId);

    if (target) {
        let targetId = document.getElementById(GetId(target)).getAttribute('pos');
        SetCellColor_Selected(targetId);
    }

}

const position = computed(() => {
    let id = new Number(props.cellId);
    return CalculatePosition(id);
});


</script>

<template>
    <div class="squareOnBoard border-top border-dark border-start" @click="ColorCell()"
        :style="{ backgroundColor: GetCellColor(props.cellId) }" v-bind="{ id: GetId(position) }">
        <slot />
    </div>
</template >

<style scoped>
div {
    font-size: .75rem;
}
</style>