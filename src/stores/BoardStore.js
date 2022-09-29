import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBoardStore = defineStore('BoardManager', () => {

    const BoardArray = ref(useLocalStorage("WUZK-BoardArray", [
        {
            BoardFill: new Array(100).fill(null),
            BoardName: "Nowa Plansza",
            BoardDescription: "Opis planszy..."
        }
    ]));

    const SelectedBoard = ref(useLocalStorage("WUZK-SelectedBoard", 0));

    const UseBoardHighlight = ref(useLocalStorage("WUZK-Highlight", true));

    function SaveToBoard(id, value) {
        let i = id - 1;
        GetBoardFill()[i] = value;
    }

    function ClearBoard() {
        GetBoardFill().fill(null);
    }

    function GetCellValue(id) {
        let i = id - 1;
        return GetBoardFill()[i];
    }

    function ToogleBoardHighlight() {
        UseBoardHighlight.value = !UseBoardHighlight.value;
    }

    function SwitchBoard(id) {

        if (id < 0 && id > BoardArray.value.length || id == undefined) {
            console.warn("Board id out of bound");
            return;
        }

        SelectedBoard.value = id;
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

    function GetBoardFill() {
        return SelectCurrentBoard().BoardFill;
    }

    function GetBoardName() {
        return SelectCurrentBoard().BoardName;
    }

    function GetBoardDescription() {
        return SelectCurrentBoard().BoardDescription;

    }

    function RemoveBoard(id) {

        if (BoardArray.value.length <= 1) return;

        if (SelectedBoard.value === id) SelectedBoard.value = 0;

        if (SelectedBoard.value > id) SelectedBoard.value--;

        BoardArray.value.splice(id, 1);
    }

    return {
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
        SelectCurrentBoard,
        GetBoardFill,
        GetBoardDescription,
        GetBoardName,
        RemoveBoard
    };

});