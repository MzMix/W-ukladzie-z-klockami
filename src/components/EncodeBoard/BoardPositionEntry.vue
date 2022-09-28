<script setup>
import { storeToRefs } from "pinia";
import { get } from '@vueuse/core';

import { useIndexStore } from "@Stores/IndexStore";
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";

import { GetLetter } from '@Utils/TextUtilities';

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
});
</script>

<template>

    <div v-if="get(SelectedIndexContentType) == 0" class="fs-4 mb-1 positionEntry">
        ({{props.x}},{{props.y}})
    </div>

    <div v-if="get(SelectedIndexContentType) == 1" class="fs-4 mb-1 positionEntry">
        {{GetLetter(props.x)}}{{props.y}}
    </div>

    <div v-if="get(SelectedIndexContentType) == 2"
        class="d-flex flex-row justify-content-start align-items-center fs-5 pb-1 positionEntry">
        <span>(</span>
        <div :style="{backgroundColor: InterpreteColorValue(props.x-1)}" class="colorBox"></div>
        <span>,</span>
        <div :style="{backgroundColor: InterpreteColorValue(props.y-1)}" class="colorBox"></div>
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