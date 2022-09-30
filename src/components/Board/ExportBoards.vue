<script setup>
//Import from Pinia
import { storeToRefs } from 'pinia';

//Import Store
import { useBoardStore } from "@Stores/BoardStore";
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";

//Import Utils
import { DonloadContent } from '@Utils/SharingUtilities';

const ColorPaletteStore = useColorPaletteStore();
const { AppName } = storeToRefs(ColorPaletteStore);

const BoardStore = useBoardStore();
const { BoardArray, SelectedBoard } = storeToRefs(BoardStore);

const props = defineProps({
    UseIcon: {
        default: false,
        require: false,
        type: Boolean
    }
});

function ExportColorPalettes() {

    let out = JSON.stringify({ Boards: BoardArray.value, SelectedBoard: SelectedBoard.value }, null, 4);

    DonloadContent(out, `plansze-eksport-${AppName.value}.json`, 'text/plain');
}

</script>
    
<template>
    <button type="button" class="btn btn-outline-primary w-100" @click="ExportColorPalettes()">Eksportuj plansze <i
            class="bi bi-download" v-if="props.UseIcon"></i></button>
</template>
    
<style scoped>

</style>>