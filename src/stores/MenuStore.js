import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('MenuMenager', () => {

    const MenuOpened = ref(0);

    const ShowLeaveWarn = ref(useLocalStorage("WUZK-ShowLeaveWarn", true));

    const UseColorIndicator = ref(useLocalStorage('WUZK-UseColorIndicator', true));

    const ModalOpened = ref(false);

    function SwitchMenu(value) {
        if (value >= 0 && value <= 4) MenuOpened.value = value;
        else console.warn("Attempt of opening non existing menu!");
    }

    function ToogleLeaveWarn() {
        ShowLeaveWarn.value = !ShowLeaveWarn.value;

        if (!ShowLeaveWarn.value) {
            window.onbeforeunload = null;
        } else {
            window.onbeforeunload = function () {
                return 'Are you sure you want to leave?';
            };
        }

    }

    function ToogleColorIndicator() {
        UseColorIndicator.value = !UseColorIndicator.value;
    }

    return {
        MenuOpened,
        ShowLeaveWarn,
        UseColorIndicator,
        ModalOpened,

        SwitchMenu,
        ToogleLeaveWarn,
        ToogleColorIndicator
    };

});