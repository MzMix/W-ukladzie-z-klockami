import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core';

export const useStoreWelcomeModal = defineStore('WelcomeMenager', () => {

    const ShowWelcome = ref(useLocalStorage("ShowWelcome", true));

    function DesibleWelcome() {
        ShowWelcome.value = false;
    }

    function EnableWelcome() {
        ShowWelcome.value = true;
    }

    return {
        ShowWelcome,
        DesibleWelcome,
        EnableWelcome
    };

});