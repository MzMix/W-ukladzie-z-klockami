import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBoardStore = defineStore('BoardManager', () => {

    const BoardFill = ref(useLocalStorage("WUZK-BoardFill", new Array(100).fill(null)));

    const BoardName = ref(useLocalStorage("WUZK-BoardName", "Nowa Plansza"));

    const BoardDescription = ref(useLocalStorage("WUZK-BoardDescription", "Opis planszy..."));

    const SelectedBoard = ref(useLocalStorage("WUZK-SelectedBoard", 0));

    const BoardArray = ref(useLocalStorage("WUZK-BoardArray", [
        {
            BoardFill: BoardFill.value,
            BoardName: BoardName.value,
            BoardDescription: BoardDescription.value
        }
    ]));

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

    function SwitchBoard(id) {

        if (id < 0 && id > BoardArray.value.length || id == undefined) {
            console.warn("Board id out of bound");
            return;
        }

        BoardArray.value[SelectedBoard.value].BoardName = BoardName.value;
        BoardArray.value[SelectedBoard.value].BoardFill = BoardFill.value;
        BoardArray.value[SelectedBoard.value].BoardDescription = BoardDescription.value;

        SelectedBoard.value = id;

        BoardFill.value = BoardArray.value[SelectedBoard.value].BoardFill;
        BoardName.value = BoardArray.value[SelectedBoard.value].BoardName;
    }

    function NextBoard() {
        SwitchBoard((SelectedBoard.value + 1) % BoardArray.value.length);
    }

    function PreviousBoard() {
        SwitchBoard(SelectedBoard.value - 1 >= 0 ? SelectedBoard.value - 1 : BoardArray.value.length - 1);
    }

    function AddEmptyBoard() {

        BoardArray.value.push({
            BoardFill: new Array(100).fill(null),
            BoardName: `Nowa Plansza ${BoardArray.value.length}`,
            BoardDescription: 'Opis planszy...'
        });

        SwitchBoard(BoardArray.value.length - 1);
    }

    function SelectCurrentBoard() {
        return BoardArray.value[SelectedBoard.value];
    }

    return {
        BoardFill,
        BoardName,
        BoardDescription,
        BoardArray,
        SelectedBoard,
        UseBoardHighlight,

        SaveToBoard,
        ClearBoard,
        GetCellValue,
        ToogleBoardHighlight,
        NextBoard,
        PreviousBoard,
        AddEmptyBoard,
        SelectCurrentBoard
    };

});