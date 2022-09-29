<script setup>
import bsModal from '@ModalManager/bsModal.vue';
import dialogBox from '@General/dialogBox.vue';

import { storeToRefs } from 'pinia';

import { CreateBoardPreview } from '@Utils/CreateBoardPreview';

import { useBoardStore } from '@Stores/BoardStore';
import { useColorPaletteStore } from '@Stores/ColorPaletteStore';
import { ref } from 'vue';

const BoardStore = useBoardStore();
const { AddEmptyBoard, RemoveBoard } = BoardStore;
const { BoardArray } = storeToRefs(BoardStore);

const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue } = ColorPaletteStore;

const dialogs = ref(new Array(BoardArray.value.length).fill(false));

function PreviewBoard(id) {
    let InterpretedBoard = [];

    BoardArray.value[id].BoardFill.forEach((cell) => {
        InterpretedBoard.push(InterpreteColorValue(cell));
    });

    let canvas = CreateBoardPreview(InterpretedBoard);

    document.getElementById('ManageBoardsModal').appendChild(canvas);
}

function HandleDialog(id, value) {
    dialogs.value[id] = false;

    if (value) RemoveBoard(id);
}

function ModalClosed() {
    // dialogs.value.forEach((val) => {
    //     val = false;
    // });
}

</script>

<template>

    <bsModal id="ManageBoardsModal" size="xl" :static="true" @modalClosed="ModalClosed()">

        <template #modalTitle>
            Zarządzaj planszami
        </template>

        <template #modalBody>

            <ul class="pe-4">
                <li v-for="board, index in BoardArray" :key="index"
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

                        <button type="button" class="btn btn-danger m-1" :disabled="BoardArray.length == 1"
                            @click="dialogs[index] = true">
                            <i class="bi bi-trash3"></i>
                        </button>

                        <Transition>
                            <dialogBox :show="dialogs[index]" @close="(value)=>{HandleDialog(index,value)}">
                            </dialogBox>
                        </Transition>

                    </div>

                </li>
            </ul>


            <div class=" ps-4">
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

.v-enter-active,
.v-leave-active {
    transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>