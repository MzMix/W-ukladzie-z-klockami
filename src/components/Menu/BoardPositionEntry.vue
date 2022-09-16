<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useIndexStore } from "../../stores/IndexStore";
import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue } = ColorPaletteStore;

const IndexStore = useIndexStore();
const { SelectedIndexContentType } = storeToRefs(IndexStore);

const props = defineProps({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    }
})

//1 - Text
//2 - color
//3 - None
const DispalyMode = computed(() => {

    if (SelectedIndexContentType.value == 0 || SelectedIndexContentType.value == 1) {
        return 1;
    } else if (SelectedIndexContentType.value == 2) {
        return 2;
    }

    return 3;
})

</script>

<template>

    <div v-if="DispalyMode == 1" class="fs-4 mb-1">
        ({{props.x}},{{props.y}})
    </div>

    <div v-if="DispalyMode == 2" class="d-flex flex-row justify-content-start align-items-center fs-5 pb-1">
        <span>(</span>
        <div :style="{backgroundColor: InterpreteColorValue(props.x)}" class="colorBox"></div>
        <span>,</span>
        <div :style="{backgroundColor: InterpreteColorValue(props.x)}" class="colorBox"></div>
        <span>)</span>
    </div>

</template>

<style scoped>
.colorBox {
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    border: solid 1px black;
    margin-top: .27em !important;
    margin: .1em;
}

span {
    font-size: 1.5em;
}
</style>