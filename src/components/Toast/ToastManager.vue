<script setup>
//Import from Pinia, Vue
// import { inject, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

//Import Component
import bsToast from './bsToast.vue';

//Import Symetry Store form Pinia
import { useSymetryStore } from "../../stores/SymetryStore";
import { useBoardStore } from "../../stores/BoardStore";

//Symetry Store
const SymetryStore = useSymetryStore();
const { SymetryTypes } = storeToRefs(SymetryStore);

//Board Store
const BoardStore = useBoardStore();
const { ClearBoard } = BoardStore;

//For designing Toasts
// const ShowToast = inject('ToastTrigger');

// onMounted(() => {
//     ShowToast(`#ClearBoard`)
// })

</script>

<template>

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

    <div aria-live="polite" aria-atomic="true" id="ToastGroup" v-for="(option, index) in SymetryTypes" :key="index">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="info" :Name="`SymetryChanged${option.value}`">
                <template #header>Zmieniono ustawienia symetrii!</template>
                <template #time>Teraz</template>
                <template #body>Wybrany rodzaj symetrii:
                    <strong>{{option.text}}</strong></template>
            </bsToast>

        </div>
    </div>

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

</template>

<style scoped>
#ToastGroup {
    top: 0;
    right: 0;
}
</style>