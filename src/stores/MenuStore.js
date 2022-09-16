import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('MenuMenager', () => {

    const MenuOpened = ref(0);

    function SwitchMenu(value) {
        if (value >= 0 && value <= 3) MenuOpened.value = value;
        else console.warn("Attempt of opening non existing menu!");
    }

    return {
        MenuOpened,
        SwitchMenu
    };

});