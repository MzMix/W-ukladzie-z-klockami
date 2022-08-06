import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreAxes = defineStore('AxesManager', () => {

    const AxesShown = ref(useLocalStorage('showAxes', true));

    function ToggleAxes() {
        AxesShown.value = !AxesShown.value;
    }

    return {
        AxesShown,
        ToggleAxes
    };

});