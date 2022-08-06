import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBoardStore = defineStore('BoardManager', () => {

    const BoardFill = ref(useLocalStorage("BoardFill", new Array(100).fill(0)));

    function SaveToBoard(id, value) {
        console.log({ id, value });
        BoardFill.value[id--] = value;
    }

    function ClearBoard() {
        BoardFill.value.fill(7);
    }

    function GetCellValue(id) {
        return BoardFill.value[id--];
    }

    return {
        BoardFill,
        ClearBoard,
        SaveToBoard,
        GetCellValue
    };

});