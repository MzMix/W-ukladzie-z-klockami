<!-- eslint-disable no-console -->
<script setup>
import { ref } from 'vue';

import { useMenuStore } from "@Stores/MenuStore";
import { useBoardStore } from "@Stores/BoardStore";

import BoardName from "@MainPage/BoardName.vue";
import BoardDescription from "./BoardDescription.vue";
import bsTooltip from '@General/bsTooltip.vue';
import { storeToRefs } from "pinia";

const MenuStore = useMenuStore();
const { SwitchMenu } = MenuStore;

const BoardStore = useBoardStore();
const { BoardArray } = storeToRefs(BoardStore);
const { PreviousBoard, NextBoard, AddEmptyBoard } = BoardStore;

const icons = ['palette', 'brush', 'share', 'gear', 'keyboard'];

const windowWidth = ref(window.innerWidth);
const fontSize = ref('1.5');


//fs-4 1.5rem
//fs-5 1.25 rem

window.onresize = () => {

    windowWidth.value = window.innerWidth;

    if (windowWidth.value > 1200) { fontSize.value = 1.60; return; }

    if (windowWidth.value < 1250) { fontSize.value = 1.25; return; }

    if (windowWidth.value < 1100) { fontSize.value = 1.0; return; }

    if (windowWidth.value < 1000) { fontSize.value = 0.75; return; }

};

</script>

<template>
    <div class="col-12 d-flex flex-row flex-nowrap justify-content-between bg-purple text-white pt-2 pb-2">

        <div :style="{fontSize: fontSize + 'em'}" class="d-flex flex-row flex-nowrap gap-2 align-self-center">
            <button v-for="(icon, index) in icons" :key="index" @click="SwitchMenu(index)"
                aria-label="Przejdź do sekcj w menu" class="btn btn-lg text-white">
                <i :class="'bi-'+icon" class="fs-4"></i>
            </button>
        </div>

        <div :style="{fontSize: fontSize + 'em'}"
            class=" d-flex flex-row flex-nowrap gap-4 align-self-center text-center mx-auto">

            <bsTooltip title="Poprzednia plansza" placement="bottom">
                <button class="btn text-white fs-3 " @click="PreviousBoard()" :disabled="BoardArray.length === 1"
                    aria-label="Przejdź do poprzedniej planszy">
                    <i class="bi bi-box-arrow-left"></i></button>
            </bsTooltip>

            <div class="d-flex flex-row flex-nowrap">

                <bsTooltip title="Dodaj pustą planszę" placement="bottom">
                    <button class="btn text-white fs-4 me-1" @click="AddEmptyBoard()" aria-label="Dodaj pustą planszę">
                        <i class="bi bi-plus-square"></i>
                    </button>
                </bsTooltip>

                <BoardName />

                <BoardDescription />
            </div>

            <bsTooltip title="Następna plansza" placement="bottom">
                <button class="btn text-white fs-3" @click="NextBoard()" :disabled="BoardArray.length === 1"
                    aria-label="Przejdź do następnej planszy">
                    <i class="bi bi-box-arrow-right"></i>
                </button>
            </bsTooltip>

        </div>

        <div v-if="windowWidth > 1100" :style="{fontSize: fontSize + 'em'}"
            class="me-3 align-self-center d-flex flex-row flex-nowrap gap-2 text-center">W
            układzie z klockami <i class="bi bi-bricks"></i></div>

    </div>
</template>

<style scoped>
.btn:disabled {
    border: 1px solid transparent !important;
}
</style>