<script setup>
import ColorSelectButton from './ColorSelectButton.vue'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

const ColorPaletteStore = useColorPaletteStore();
const { ColorPalettes, SelectedPalette } = storeToRefs(ColorPaletteStore);

const colorSet = computed(() => {
    return ColorPalettes.value[SelectedPalette.value].colorSet;
});

</script>

<template>
    <div id="ColorsArea">
        <ColorSelectButton v-for="cl in colorSet" :key="colorSet.indexOf(cl)" :color="colorSet.indexOf(cl)" />
    </div>
</template>

<style scoped>
#ColorsArea {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
}
</style>
