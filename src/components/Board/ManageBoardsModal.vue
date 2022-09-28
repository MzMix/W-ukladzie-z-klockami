<script setup>
import bsModal from '@ModalManager/bsModal.vue';
import { storeToRefs } from 'pinia';
import { CreateBoardPreview } from '@Utils/CreateBoardPreview';

import { useBoardStore } from '@Stores/BoardStore';
import { useColorPaletteStore } from '@Stores/ColorPaletteStore';

const BoardStore = useBoardStore();
const { AddEmptyBoard } = BoardStore;
const { BoardArray } = storeToRefs(BoardStore);

const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue } = ColorPaletteStore;

function PreviewBoard(id) {
    let InterpretedBoard = [];

    BoardArray.value[id].BoardFill.forEach((cell) => {
        InterpretedBoard.push(InterpreteColorValue(cell));
    });

    let canvas = CreateBoardPreview(InterpretedBoard);

    document.getElementById('ManageBoardsModal').appendChild(canvas);
}

</script>

<template>

    <bsModal id="ManageBoardsModal" size="xl" :static="true">

        <template #modalTitle>
            Zarządzaj planszami
        </template>

        <template #modalBody>

            <ul class="pe-4">
                <li v-for="board, index in BoardArray" :key="BoardArray.indexOf(board)"
                    class="list-group-item border-bottom pb-2 d-flex flex-row gap-4 mb-4">

                    <div class="text-center">

                        <span class="fw-bold">Nazwa planszy:</span>
                        <br />
                        <span class="ms-2">{{board.BoardName}}</span>

                    </div>

                    <div class="text-start ps-4 w-50 overflow-hidden DescriptionEntry">

                        <span class="fw-bold">Opis planszy:</span>
                        <br />
                        <span class="ms-2 "> {{board.BoardDescription}}
                        </span>

                    </div>

                    <div class="flex-grow-1 d-flex flex-row align-items-end justify-content-end">

                        <button type="button" class="btn btn-primary m-1" @click="PreviewBoard(index)">
                            <i class="bi bi-image"></i>
                        </button>

                        <button type="button" class="btn btn-info m-1">
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button type="button" class="btn btn-danger m-1" :disabled="BoardArray.length == 1">
                            <i class="bi bi-trash3"></i>
                        </button>

                    </div>

                </li>
            </ul>

            <div class="ps-4">
                <button class="btn btn-outline-primary m-1" @click="AddEmptyBoard()">
                    <i class="bi bi-plus-square"></i> Dodaj pustą planszę
                </button>
            </div>

        </template>

    </bsModal>

</template>

<style scoped>
.DescriptionEntry {
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
}
</style>