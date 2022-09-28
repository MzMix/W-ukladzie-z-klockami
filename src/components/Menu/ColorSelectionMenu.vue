<script setup>
//Import from Pinia, Vue
import { storeToRefs } from 'pinia';
import { computed, inject, onMounted } from 'vue';

//Import components
import ColorSelectButton from '@ColorManager/ColorSelectButton.vue';

import { useColorPaletteStore } from "@Stores/ColorPaletteStore";
import { useMenuStore } from '@Stores/MenuStore';

//Color Palette Store
const ColorPaletteStore = useColorPaletteStore();
const { SetColorNumber, GetSelectedPaletteLength } = ColorPaletteStore;
const { ColorPalettes, SelectedPalette, SelectedColor } = storeToRefs(ColorPaletteStore);

//Menu Store
const MenuStore = useMenuStore();
const { UseColorIndicator, ModalOpened } = storeToRefs(MenuStore);

//Inject Toast trigger
const ShowToast = inject('ToastTrigger');

const colorSet = computed(() => {
    return ColorPalettes.value[SelectedPalette.value].colorSet;
});

const ShowColorIndicator = inject('ShowColorIndicator');

onMounted(() => {

    document.addEventListener('wheel', (event) => {

        if (!UseColorIndicator.value || ModalOpened.value) return;

        if (event.deltaY < 0) {
            //Up
            let newVal = (SelectedColor.value + 1) % GetSelectedPaletteLength();
            SetColorNumber(newVal);
        } else if (event.deltaY > 0) {
            //Down
            let newVal = (SelectedColor.value - 1) >= 0 ? (SelectedColor.value - 1) : GetSelectedPaletteLength() - 1;
            SetColorNumber(newVal);
        }

        ShowColorIndicator();

    });

});

</script>

<template>
    <div class="text-center p-2 ps-3 w-100">

        <h4 class="mt-2 mb-4">Kolory <i class="bi bi-palette"></i></h4>
        <div class="d-flex flex-wrap">
            <div class="d-flex flex-wrap justify-content-around w-75 m-auto">
                <ColorSelectButton v-for="cl in colorSet" :key="colorSet.indexOf(cl)" :color="colorSet.indexOf(cl)" />
            </div>
        </div>

        <!-- Clear board -->
        <button class="btn btn-danger mt-4 w-75" @click="ShowToast(`#ClearBoard`, { autohide: false })
        ">Wyczyść planszę <i class="bi bi-trash"></i></button>

    </div>
</template>

<style scoped>

</style>
