import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core';

export const useStore = defineStore('ColorManager', () => {

    /**
     * @description Store state of the axes drawn on board
     */
    const AxesShown = ref(useLocalStorage('showAxes', true));

    /**
     * @description Stores the selected color palette key
     * @type {string}SelectedPaletteKey
    */
    const SelectedPaletteKey = ref(useLocalStorage('SelectedPaletteKey', 'Kreatywny'));

    /**
     * @description Stores the array position of the selected color
     * @type {number}
    */
    const SelectedColor = ref(7);

    /**
     * @description Stores color palettes in Map
    */
    const ColorPalettes = ref(useLocalStorage('ColorPalettes', new Map()));
    ColorPalettes.value.delete(null);
    ColorPalettes.value.set('Kreatywny', ['#188B18', '#18C4FD', '#8B188B', '#FDFD18', '#FD1818', '#B3FD42', '#000000', '#FDFDFD', '#1818FD', '#FD9618', '#D5D5D5']);
    ColorPalettes.value.set('Matematyczny', ['#188B18', '#18C4FD', '#8B188B', '#f0e796', '#FD1818', '#B3FD42', '#000000', '#FDFDFD', '#955629', '#FD9618', '#D5D5D5']);

    /**
     * @type { BoardFill: Number[]] }
    */
    const BoardFill = ref(useLocalStorage("BoardFill", new Array(100).fill(SelectedColor.value)));

    const SymetryTypes = ref([
        {
            value: 0,
            text: 'Brak'
        },
        {
            value: 1,
            text: 'Oś X'
        },
        {
            value: 2,
            text: 'Oś Y'
        }, {
            value: 3,
            text: 'Względem środka układu'
        }
    ]);

    const SelectedSymetry = ref(useLocalStorage("SelectedSymetry", 0));

    // --------------------------

    /** 
     * @param {string} key
     * @returns {{ name: string, id: number, colors: string[] }}
    */
    function ChangePalette(key) {
        SelectedPaletteKey.value = key;
    }

    /** 
     * @param {string} key
     * @param {string[]} colors
     */
    function AddPalette(key, colors) {
        ColorPalettes.value.set(key, colors);
    }

    /**
     * @param {number} number
     */
    function RemovePalette(key) {
        ColorPalettes.value.delete(key);
    }

    /**
     * @param {number} colorNumber
     */
    function PickColor(colorNumber) {
        SelectedColor.value = colorNumber;
    }

    /**
     * @param {number} colorNumber
     * @returns {string}
     */
    function UseColor(colorNumber) {
        return ColorPalettes.value.get(SelectedPaletteKey.value)[colorNumber];
    }

    /**
     * @param { Number } cellId
     * @returns { String }
     */
    function GetCellColor(cellId) {
        let id = new Number(cellId) - 1;
        return UseColor(BoardFill.value[id]);
    }

    /**
     * @param { Number } cellId
     * @param { Number } color
     */
    function SetCellColor(cellId, color) {
        let id = new Number(cellId - 1)
        BoardFill.value[id] = color;
    }

    function SetCellColor_Selected(cellId) {

        let id = new Number(cellId - 1)
        BoardFill.value[id] = SelectedColor.value;
    }

    function ClearBoard() {
        BoardFill.value.fill(7);
    }

    function ToggleAxes() {
        AxesShown.value = !AxesShown.value;
    }

    function SetSymetry(value) {
        SelectedSymetry.value = value;
    }

    // --------------------------

    ChangePalette('Kreatywny');

    return {
        SelectedColor,
        SelectedPaletteKey,
        SelectedSymetry,

        AddPalette,
        RemovePalette,
        ChangePalette,
        ToggleAxes,

        PickColor,
        UseColor,

        BoardFill,
        GetCellColor,
        SetCellColor,
        SetCellColor_Selected,
        SetSymetry,

        ColorPalettes,
        SymetryTypes,
        AxesShown,
        ClearBoard
    };

});