import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColorPaletteStore = defineStore('ColorPaletteManager', () => {

    const ColorPalettes = ref(useLocalStorage('ColorPalettes', [
        {
            value: 0,
            text: 'Kreatywny',
            colorSet: ['#188B18', '#18C4FD', '#8B188B', '#FDFD18', '#FD1818', '#B3FD42', '#000000', '#D5D5D5', '#1818FD', '#FD9618', '#FFFFFF'],
            standard: true,
        },
        {
            value: 1,
            text: 'Matematyczny',
            colorSet: ['#188B18', '#18C4FD', '#8B188B', '#f0e796', '#FD1818', '#B3FD42', '#000000', '#D5D5D5', '#955629', '#FD9618', '#FFFFFF'],
            standard: true,
        }
    ]));

    const BoardDefaultColor = ref(useLocalStorage('boardDefaultColor', '#FFFFFF'));

    const SelectedPalette = ref(useLocalStorage('SelectedPalette', 0));

    function SetPalette(id) {
        SelectedPalette.value = id;
    }

    function AddPalette(name, colors) {

        let available = ColorPalettes.value.filter(el => el.text == name).length <= 0;

        if (available) {

            ColorPalettes.value.push({
                value: ColorPalettes.value.length,
                text: name,
                colorSet: colors,
                standard: false,
            });
        }
    }

    function RemovePalette(id) {

        if (SelectedPalette.value === id) SelectedPalette.value = 0;

        ColorPalettes.value.splice(id, 1);
    }

    const SelectedColor = ref(useLocalStorage('SelectedColor', null));

    function SetColorNumber(colorNumber) {
        SelectedColor.value = colorNumber;
    }

    function GetSelectedPalette() {
        return ColorPalettes.value[SelectedPalette.value].colorSet;
    }

    function InterpreteColorValue(colorValue) {
        return GetSelectedPalette()[colorValue];
    }

    function InterpreteSelectedColor() {
        return GetSelectedPalette()[SelectedColor.value];
    }

    function GetSelectedColor() {
        return SelectedColor.value;
    }

    function GetBoardDefaultColorId() {
        return GetSelectedPalette().findIndex(el => el == BoardDefaultColor.value);
    }

    return {
        SelectedPalette,
        ColorPalettes,
        SetPalette,
        BoardDefaultColor,
        AddPalette,
        RemovePalette,

        SelectedColor,
        SetColorNumber,
        GetSelectedColor,
        GetBoardDefaultColorId,

        InterpreteColorValue,
        InterpreteSelectedColor
    };

});