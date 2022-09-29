<script setup>
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

const TopBarElement = "align-self-center fs-4";

const icons = ['palette', 'brush', 'share', 'gear', 'keyboard'];

</script>

<template>
    <div class="col-12 d-flex flex-row flex-nowrap justify-content-between bg-purple text-white pt-1 pb-1">

        <div :class="TopBarElement" class="d-flex flex-row gap-2">
            <button v-for="(icon, index) in icons" :key="index" @click="SwitchMenu(index)"
                aria-label="Przejdź do sekcj w menu" class="btn btn-lg text-white">
                <i :class="'bi-'+icon" class="fs-4"></i>
            </button>
        </div>

        <div :class="TopBarElement" class="d-flex flex-row gap-4">

            <bsTooltip title="Poprzednia plansza" placement="bottom">
                <button class="btn text-white fs-3 " @click="PreviousBoard()" :disabled="BoardArray.length === 1" aria-label="Przejdź do poprzedniej planszy">
                    <i class="bi bi-box-arrow-left"></i></button>
            </bsTooltip>

            <div>

                <button class="btn text-white fs-4 me-1" @click="AddEmptyBoard()" aria-label="Dodaj pustą planszę">
                    <bsTooltip title="Dodaj pustą planszę" placement="bottom">
                        <i class="bi bi-plus-square"></i>
                    </bsTooltip>
                </button>

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

        <div :class="TopBarElement" class="me-3">W układzie z klockami <i class="bi bi-bricks"></i></div>

    </div>
</template>

<style scoped>
.btn:disabled {
    border: 1px solid transparent !important;
}
</style>