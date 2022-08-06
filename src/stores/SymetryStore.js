import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
        SelectedSymetry.value = value;
    }

    return {
        SymetryTypes,
        SelectedSymetry,
        SetSymetry
    };

});