<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import bsModal from '@ModalManager/bsModal.vue';
import dialogBox from '@General/dialogBox.vue';
import bsTooltip from '@General/bsTooltip.vue';
import ExportBoards from '@Board/ExportBoards.vue';
import BoardUpload from '@Board/BoardUpload.vue';

import { CreateBoardPreview } from '@Utils/CreateBoardPreview';

import { useBoardStore } from '@Stores/BoardStore';
import { useColorPaletteStore } from '@Stores/ColorPaletteStore';

const BoardStore = useBoardStore();
const { AddEmptyBoard, RemoveBoard, SwitchBoard } = BoardStore;
const { BoardArray } = storeToRefs(BoardStore);

const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue } = ColorPaletteStore;

const dialogs = ref(new Array(BoardArray.value.length).fill(false));

const editor = ClassicEditor;
const ckeditor = CKEditor.component;
const editorConfig = {
    toolbar: {
        items: [
            'heading', '|',
            'bold', 'italic', '|',
            'bulletedList', 'numberedList',
            'undo', 'redo'
        ],
    }
};

async function PreviewBoard(index, refresh = false) {
    let target = document.getElementById('canvasContainer' + index);

    if (target.hasChildNodes() && refresh === false) return;

    let InterpretedBoard = [];

    BoardArray.value[index].BoardFill.forEach((cell) => {
        InterpretedBoard.push(InterpreteColorValue(cell));
    });

    const canvas = await CreateBoardPreview(InterpretedBoard);
    target.innerHTML = '';
    target.appendChild(canvas);
}

function OpenDialog(index) {

    if (!dialogs.value.every(element => element === false)) return;

    dialogs.value[index] = true;

}

function HandleDialog(index = null, value = 0) {

    if (index === null) return;
    dialogs.value[index] = false;

    if (value) RemoveBoard(index);
}

function ModalClosed() {
    dialogs.value.fill(false);
}

</script>

<template>

    <bsModal id="ManageBoardsModal" fullscreen="fullscreen" :static="true" :scrollable="true"
        @modalClose="()=>{ModalClosed()}">

        <template #modalTitle>
            Zarządzaj planszami
        </template>

        <template #modalBody>

            <ul class="pe-4">
                <li v-for="board, index in BoardArray" :key="index"
                    class="list-group-item border-bottom pb-2 d-flex flex-column mb-4">

                    <div class="d-flex flex-row gap-4 pb-4 align-items-center justify-content-center">
                        <div class="mb-3 flex-grow-1">
                            <label :for="'boardName'+index" class="form-label">Nazwa planszy</label>
                            <input type="text" v-model="board.BoardName" maxlength="32" minlength="4"
                                aria-label="Nazwa Planszy" class="form-control ms-2" :id="'boardName'+index" />
                        </div>

                        <div class="flex-grow-1 d-flex flex-row align-items-end justify-content-end gap-2">

                            <bsTooltip title="Wybierz planszę" placement="bottom">
                                <button type="button" class="btn btn-primary m-1" @click="SwitchBoard(index)">
                                    <i class="bi bi-grid-3x3"></i>
                                </button>
                            </bsTooltip>

                            <bsTooltip title="Wyświetl podgląd planszy" placement="bottom">
                                <button type="button" class="btn btn-primary m-1" @click="PreviewBoard(index)"
                                    data-bs-toggle="collapse" :data-bs-target="'#boardPreview'+index"
                                    aria-expanded="false" :aria-controls="'boardPreview'+index">
                                    <i class="bi bi-image"></i>
                                </button>
                            </bsTooltip>

                            <bsTooltip title="Edytuj opis planszy" placement="bottom">
                                <button type="button" class="btn btn-primary m-1" data-bs-toggle="collapse"
                                    :data-bs-target="'#boardDescription'+index" aria-expanded="false"
                                    :aria-controls="'boardDescription'+index">
                                    <i class="bi bi-pencil"></i>
                                </button>
                            </bsTooltip>

                            <bsTooltip title="Usuń planszę" placement="bottom">
                                <button type="button" class="btn btn-danger m-1" :disabled="BoardArray.length == 1"
                                    @click="OpenDialog(index)">
                                    <i class="bi bi-trash3"></i>
                                </button>
                            </bsTooltip>

                            <Transition>
                                <dialogBox :show="dialogs[index]" @close="(value)=>{HandleDialog(index,value)}"
                                    :id="'dialog'+index">
                                </dialogBox>
                            </Transition>

                        </div>
                    </div>

                    <div class="collapse boardPreview text-center mx-auto" :id="'boardPreview'+index">
                        <div class="card p-2">

                            <div class="border-bottom pb-2">Podgląd planszy: {{board.BoardName}}</div>

                            <div class="pt-3 text-center mx-auto card-body" :id="'canvasContainer'+index"
                                :style="{minHeight: '310px'}"></div>

                            <div class="card-footer bg-white d-grid">
                                <button type="button" class="btn btn-primary m-1 w-100"
                                    @click="PreviewBoard(index, true)">
                                    <i class="bi bi-arrow-clockwise"></i> Odśwież podgląd planszy
                                </button>
                            </div>

                        </div>
                    </div>

                    <div class="collapse text-center mx-auto w-100" :id="'boardDescription'+index">
                        <div class="card p-2">

                            <div class="border-bottom p-2 text-start">Edycja opisu planszy: {{board.BoardName}}</div>

                            <div class="pt-3 text-start card-body w-100">
                                <ckeditor :editor="editor" v-model="board.BoardDescription" :config="editorConfig">
                                </ckeditor>
                            </div>

                        </div>
                    </div>

                </li>
            </ul>

            <div class="d-flex flex-row flex-wrap justify-content-evenly align-items-center ps-4">

                <div>
                    <BoardUpload />
                </div>

                <div>
                    <label for="ExportBoardsBtn" class="form-label col-auto">Eksportuj własne plansze:
                    </label>
                    <div id="ExportBoardsBtn">
                        <ExportBoards :UseIcon="true" />
                    </div>
                </div>

                <div>
                    <label for="AddNewBoardBtn" class="form-label col-auto">Dodaj nową planszę:
                    </label>
                    <div id="AddNewBoardBtn">
                        <button class="btn btn-outline-primary" @click="AddEmptyBoard()">
                            Dodaj pustą planszę <i class="bi bi-plus-square"></i>
                        </button>
                    </div>
                </div>


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