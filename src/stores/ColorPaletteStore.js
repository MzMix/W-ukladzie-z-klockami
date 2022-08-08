import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColorPaletteStore = defineStore('ColorPaletteManager', () => {

    const ColorPalettes = ref(useLocalStorage('ColorPalettes', [
        {
            value: 0,
            text: 'Kreatywny',
            colorSet: ['#188B18', '#18C4FD', '#8B188B', '#FDFD18', '#FD1818', '#B3FD42', '#000000', '#FDFDFD', '#1818FD', '#FD9618', '#D5D5D5'],
            standard: true,
        },
        {
            value: 1,
            text: 'Matematyczny',
            colorSet: ['#188B18', '#18C4FD', '#8B188B', '#f0e796', '#FD1818', '#B3FD42', '#000000', '#FDFDFD', '#955629', '#FD9618', '#D5D5D5'],
            standard: true,
        }
    ]));

    const SelectedPalette = ref(useLocalStorage('SelectedPalette', 0));

    function SetPalette(id) {
        SelectedPalette.value = id;
    }

    function AddPalette(name, colors) {
        ColorPalettes.value.push({
            value: ColorPalettes.value.length,
            text: name,
            colorSet: colors,
            standard: false,
        });
    }

    function RemovePalette(id) {

        if (SelectedPalette.value === id) SelectedPalette.value = 0;

        ColorPalettes.value.splice(id, 1);
    }

    const SelectedColor = ref(useLocalStorage('SelectedColor', 0));

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

    return {
        SelectedPalette,
        ColorPalettes,
        SetPalette,
        AddPalette,
        RemovePalette,

        SelectedColor,
        SetColorNumber,
        GetSelectedColor,

        InterpreteColorValue,
        InterpreteSelectedColor
    };

});