<script setup>
import { computed, onMounted, ref, toRef } from "@vue/runtime-core";
import { storeToRefs } from "pinia";
import { useStore } from "../stores/DrawingStore";

// import { CalculatePosition, CalculateId } from "../utils/CalculatePositionAndId";

const store = useStore();
const { GetCellColor, SetCellColor_Selected } = store;

const props = defineProps({
    cellId: Number,
});

function ColorCell() {
    SetCellColor_Selected(props.cellId);
}
const fill = computed(() => {
    return GetCellColor(props.cellId);
});

// const position = computed(() => {
//     return CalculatePosition(props.cellId);
// });

</script>

<template>
    <div class="squareOnBoard border-top border-dark border-start fs-6" @click="ColorCell()"
        :style="{ backgroundColor: fill }">
        <slot />
    </div>
</template>

<style scoped>
</style>