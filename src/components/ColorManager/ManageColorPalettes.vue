<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia';

import ExportColorPalettes from '@ColorManager/ExportColorPalettes.vue';
import AddCustomColorPalette from '@ColorManager/AddCustomColorPalette.vue';
import EditColorPalette from '@ColorManager/EditColorPalette.vue';
import PaletteUpload from "@ColorManager/PaletteUpload.vue";
import bsTooltip from '@General/bsTooltip.vue';
import bsModal from '@ModalManager/bsModal.vue';
import dialogBox from '@General/dialogBox.vue';

import { useColorPaletteStore } from "@Stores/ColorPaletteStore";

const ColorPaletteStore = useColorPaletteStore();
const { RemovePalette } = ColorPaletteStore;
const { ColorPalettes, BoardDefaultColor, AppName } = storeToRefs(ColorPaletteStore);

const AddPaletteKey = ref(0);
const EditColorPaletteKey = ref(0);

const PaletteToEdit = ref(null);

const PaletteToRemove = ref({
    name: '',
    value: 0
});

const dialogs = ref(new Array(ColorPalettes.value.length).fill(false));

function editable(element) {
    return element != BoardDefaultColor.value;
}

function OpenDialog(index) {

    if (!dialogs.value.every(element => element === false)) return;

    dialogs.value[index] = true;

}

function HandleDialog(index = null, value = 0) {

    if (index === null) return;
    dialogs.value[index] = false;

    if (value) {
        const removeId = ColorPalettes.value.findIndex(object => {
            return object.value === index;
        });

        RemovePalette(removeId);
    }
}

function HandleEditPalette(value) {
    PaletteToEdit.value = value;
    EditColorPaletteKey.value++;
}

</script>

<template>
    <bsModal id="ManageColorPalettesModal" :static="true" :size="'xl'">

        <template #modalTitle>
            Zarządzaj paletami kolorów
        </template>

        <template #modalBody>
            <div v-for="cp, index in ColorPalettes" :key="cp.value" class="list-group-item colorPaletteEntry">

                <div class="descriptionEntry">
                    <bsTooltip v-if="cp.appOrigin != AppName" title="Ta paleta pochodzi z innej aplikacji!">
                        <i class="bi bi-exclamation-triangle-fill" :style="{color: 'red'}"></i>
                    </bsTooltip>
                    {{ cp.text }}:
                </div>

                <div class="colorEntry">
                    <div v-for="cl in cp.colorSet.filter(editable)" :key="cl" class="border border-dark border-2"
                        :style="{ backgroundColor: cl }"></div>
                </div>

                <div class="actionEntry">
                    <bsTooltip title="Edytuj paletę" placement="bottom">
                        <button type="button" class="btn btn-primary m-1" :disabled="cp.standard"
                            data-bs-toggle="collapse" data-bs-target="#editColorPalette" aria-expanded="false"
                            data-parent="#cpManager" @click="HandleEditPalette(ColorPalettes.indexOf(cp))">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </bsTooltip>

                    <bsTooltip title="Usuń paletę" placement="bottom">
                        <button type="button" class="btn btn-danger m-1" :disabled="cp.standard"
                            @click="OpenDialog(index)">
                            <i class=" bi bi-trash3"></i>
                        </button>
                    </bsTooltip>

                    <Transition>
                        <dialogBox :show="dialogs[index]" @close="(value)=>{HandleDialog(index,value)}"
                            :id="'dialog'+index">
                        </dialogBox>
                    </Transition>

                </div>
            </div>


            <div class="inputAndOpenCreator mt-2 mb-2">
                <div>
                    <PaletteUpload />
                </div>

                <div>
                    <label for="ExportPaletteBtn" class="form-label col-auto">Eksportuj własne palety kolorów:
                    </label>
                    <div id="ExportPaletteBtn">
                        <ExportColorPalettes :UseIcon="true" />
                    </div>
                </div>

                <div class="d-flex flex-column">
                    <label for="paletteCreatorBtn" class="form-label col-auto">Dodaj własne palety kolorów:
                    </label>
                    <button type="button" class="btn btn-primary" id="paletteCreatorBtn" data-bs-toggle="collapse"
                        data-bs-target="#addCustomPalette" aria-expanded=" false" aria-controls="addCustomPalette"
                        @click="AddPaletteKey++">
                        Otwórz kreator palet kolorów <i class="bi bi-palette"></i>
                    </button>
                </div>
            </div>

            <div class="collapse mt-4" id="addCustomPalette">
                <div class="card card-body">
                    <AddCustomColorPalette :key="AddPaletteKey" />
                </div>
            </div>

            <div class="collapse mt-4" id="editColorPalette">
                <div class="card card-body">
                    <EditColorPalette :key="EditColorPaletteKey" :id="PaletteToEdit" />
                </div>
            </div>
        </template>

    </bsModal>

    <bsModal id="RemovePaletteModal">

        <template #modalTitle>
            Czy na pewno chcesz usunąć paletę: {{ PaletteToRemove.name }}
        </template>

        <template #modalBody>
            <p>Tej akcji <strong>nie będzie</strong> można cofnąć! Aby potwierdzić operację kliknij poniższy
                przycisk:</p>

            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                    @click="HandleRemovePalette(PaletteToRemove.value)">
                    <i class="bi bi-trash3"></i> Tak, usuń
                </button>
            </div>
        </template>

    </bsModal>

</template>

<style scoped>
.colorPaletteEntry {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    text-align: left;
}

.descriptionEntry {
    text-align: left;
}

.colorEntry {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    column-gap: 0.5em;
    row-gap: 0.5em;
    padding-left: 1.5em;
}

.colorEntry div {
    aspect-ratio: 1/1;
    width: 2em;
    height: 2em;
    border-radius: 10%;
}

.actionEntry {
    text-align: right;
}

.inputAndOpenCreator {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 1em;
    justify-content: space-around;
    align-items: flex-end;
}
</style>