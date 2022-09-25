import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSymetryStore = defineStore('SymetryManager', () => {

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

    function SetSymetry(value) {
        if (value == undefined || value == null) return;
        SelectedSymetry.value = value;
    }

    function NextSymetry() {
        let value = (SelectedSymetry.value + 1) % SymetryTypes.value.length;
        SetSymetry(value);
    }

    function GetSelectedSymetryName() {
        return SymetryTypes.value[SelectedSymetry.value].text;
    }

    return {
        SymetryTypes,
        SelectedSymetry,
        SetSymetry,
        NextSymetry,
        GetSelectedSymetryName,
    };

});