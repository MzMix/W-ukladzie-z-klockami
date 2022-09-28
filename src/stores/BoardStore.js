import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBoardStore = defineStore('BoardManager', () => {

    const BoardFill = ref(useLocalStorage("WUZK-BoardFill", new Array(100).fill(null)));

    const BoardName = ref(useLocalStorage("WUZK-BoardName", "Nowa Plansza"));

    const UseBoardHighlight = ref(useLocalStorage("WUZK-Highlight", true));

    function SaveToBoard(id, value) {
        let i = id - 1;
        BoardFill.value[i] = value;
    }

    function ClearBoard() {
        BoardFill.value.fill(null);
    }

    function GetCellValue(id) {
        let i = id - 1;
        return BoardFill.value[i];
    }

    function ToogleBoardHighlight() {
        UseBoardHighlight.value = !UseBoardHighlight.value;
    }


    return {
        BoardFill,
        BoardName,
        UseBoardHighlight,

        SaveToBoard,
        ClearBoard,
        GetCellValue,
        ToogleBoardHighlight
    };

});