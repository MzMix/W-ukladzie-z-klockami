<script setup>
//Import from Pinia, Vue
// import { inject, onMounted } from 'vue';

//Import Component
import bsToast from '@Toast/bsToast.vue';

//Import Stores
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";
import { useSymetryStore } from "@Stores/SymetryStore";
import { useBoardStore } from "@Stores/BoardStore";
import { useIndexStore } from '@Stores/IndexStore';
import { useCellStore } from "@Stores/CellStore";

//Symetry Store
const SymetryStore = useSymetryStore();
const { GetSelectedSymetryName } = SymetryStore;

//Board Store
const BoardStore = useBoardStore();
const { ClearBoard } = BoardStore;

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { GetSelectedPaletteName } = ColorPaletteStore;

//Index Store
const IndexStore = useIndexStore();
const { GetSelectedIndexTypeName } = IndexStore;

//CellStore
const CellStore = useCellStore();
const { GetSelectedCellTypeName } = CellStore;

//For designing Toasts
// const ShowToast = inject('ToastTrigger');

// onMounted(() => {
//     ShowToast(`#ClearBoard`)
// })

</script>

<template>

    <!-- ColorPalettesAdded -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="purple" Name="ColorPalettesAdded">
                <template #header>Dodano nową paletę kolorów!</template>
                <template #time>Teraz</template>
                <template #body>Aby zmienić wybraną paletę przejdź do:<br /> <strong>Rysowanie > Zmiana palety
                        kolorów</strong></template>
            </bsToast>

        </div>
    </div>

    <!-- SymetryChanged -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="info" Name="SymetryChanged">
                <template #header>Zmieniono ustawienia symetrii!</template>
                <template #time>Teraz</template>
                <template #body>Wybrany rodzaj symetrii:
                    <strong>{{GetSelectedSymetryName()}}</strong></template>
            </bsToast>

        </div>
    </div>

    <!-- ClearBoard -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="danger" Name="ClearBoard">
                <template #header>Potwierdź akcję!</template>
                <template #time>Teraz</template>
                <template #body>
                    <div class="w-100 text-center">
                        <h6>Potwierdź wyczyszczenie planszy:</h6>
                        <button class="btn btn-danger m-2" @click="ClearBoard()" data-bs-dismiss="toast">Wyczyść planszę
                            <i class="bi bi-trash"></i></button>
                    </div>
                </template>
            </bsToast>

        </div>
    </div>

    <!-- PaletteChanged -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="info" Name="PaletteChanged">
                <template #header>Zmieniono wybraną paletę kolorów!</template>
                <template #time>Teraz</template>
                <template #body>Wybrana paleta:
                    <strong>{{GetSelectedPaletteName()}}</strong></template>
            </bsToast>

        </div>
    </div>

    <!-- IndexChanged -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="info" Name="IndexChanged">
                <template #header>Zmieniono opis pól!</template>
                <template #time>Teraz</template>
                <template #body>Wybrana paleta:
                    <strong>{{GetSelectedIndexTypeName()}}</strong></template>
            </bsToast>

        </div>
    </div>

    <!-- CellContentChanged -->
    <div aria-live="polite" aria-atomic="true" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="info" Name="CellContentChanged">
                <template #header>Zmieniono zawartość pól!</template>
                <template #time>Teraz</template>
                <template #body>Wybrana paleta:
                    <strong>{{GetSelectedCellTypeName()}}</strong></template>
            </bsToast>

        </div>
    </div>

</template>

<style scoped>
#ToastGroup {
    top: 0;
    right: 0;
}
</style>