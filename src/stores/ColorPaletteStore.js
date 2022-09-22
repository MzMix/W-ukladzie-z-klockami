import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useColorPaletteStore = defineStore('ColorPaletteManager', () => {

    const AppName = ref('WUZK');

    const ColorPalettes = ref(useLocalStorage('ColorPalettes', [
        {
            value: 0,
            text: 'Kreatywny',
            colorSet: ['#188B18', '#18C4FD', '#8B188B', '#FDFD18', '#FD1818', '#B3FD42', '#000000', '#D5D5D5', '#1818FD', '#FD9618', 'white'],
            standard: true,
            appOrigin: AppName.value,
        },
        {
            value: 1,
            text: 'Matematyczny',
            colorSet: ['#188B18', '#18C4FD', '#8B188B', '#f0e796', '#FD1818', '#B3FD42', '#000000', '#D5D5D5', '#955629', '#FD9618', 'white'],
            standard: true,
            appOrigin: AppName.value,
        }
    ]));

    const BoardDefaultColor = ref(useLocalStorage('boardDefaultColor', 'white'));

    const SelectedPalette = ref(useLocalStorage('SelectedPalette', 0));

    function SetPalette(id) {
        if (id == undefined || id == null) return;
        SelectedPalette.value = id;
    }

    function AddPalette(name, colors, origin = AppName.value) {

        let available = ColorPalettes.value.filter(el => el.text == name).length <= 0;

        if (available) {

            ColorPalettes.value.push({
                value: ColorPalettes.value.length,
                text: name,
                colorSet: colors,
                standard: false,
                appOrigin: origin,
            });
        }
    }

    function RemovePalette(id) {

        if (ColorPalettes.value[id].standard) {
            return;
        }

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

    function GetSelectedPaletteLength() {
        return ColorPalettes.value[SelectedPalette.value].colorSet.length;
    }

    function GetSelectedPaletteOrigin() {
        return ColorPalettes.value[SelectedPalette.value].appOrigin;
    }

    function GetSelectedPaletteName() {
        return ColorPalettes.value[SelectedPalette.value].text;
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

    function NextPalette() {
        let value = (SelectedPalette.value + 1) % ColorPalettes.value.length;
        SetPalette(value);
    }

    return {
        AppName,
        SelectedPalette,
        ColorPalettes,
        SetPalette,
        BoardDefaultColor,
        AddPalette,
        RemovePalette,

        GetSelectedPaletteOrigin,
        GetSelectedPaletteLength,
        GetSelectedPaletteName,

        NextPalette,

        SelectedColor,
        SetColorNumber,

        GetSelectedColor,
        GetBoardDefaultColorId,

        InterpreteColorValue,
        InterpreteSelectedColor
    };

});