import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCellStore = defineStore('CellManager', () => {

    const CellContentTypes = ref([
        {
            value: 0,
            text: 'Brak'
        },
        {
            value: 1,
            text: 'Numeracja'
        },
        {
            value: 2,
            text: 'Adresowanie'
        }
    ]);

    const SelectedCellContentType = ref(useLocalStorage("WUZK-SelectedCellContentType", 1));

    function SetCellContentType(value) {
        if (value == undefined || value == null) return;
        SelectedCellContentType.value = value;
    }

    function NextCellContent() {
        let value = (SelectedCellContentType.value + 1) % CellContentTypes.value.length;
        SetCellContentType(value);
    }

    function GetSelectedCellTypeName() {
        return CellContentTypes.value[SelectedCellContentType.value].text;
    }

    return {
        CellContentTypes,
        SelectedCellContentType,
        SetCellContentType,
        NextCellContent,
        GetSelectedCellTypeName
    };

});