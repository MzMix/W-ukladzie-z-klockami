import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStoreShortcuts = defineStore('ShortcutManager', () => {

    const AvaliableShortcuts = ref(useLocalStorage('WUZK-AvaliableShortcuts', [
        {
            id: 0,
            name: 'Następna paleta kolorów',
            modifier: 'Alt',
            key: 'P',
            active: true,
        },
        {
            id: 1,
            name: 'Następny opis pól',
            modifier: 'Alt',
            key: 'O',
            active: true,
        },
        {
            id: 2,
            name: 'Następna symetria',
            modifier: 'Alt',
            key: 'S',
            active: true,
        },
        {
            id: 3,
            name: 'Następna zawartość pól',
            modifier: 'Alt',
            key: 'Z',
            active: true,
        },
        {
            id: 6,
            name: 'Przełącz widoczność osi',
            modifier: 'Alt',
            key: 'Y',
            active: true,
        },
        {
            id: 7,
            name: 'Poprzednia plansza',
            modifier: 'Alt',
            key: '[',
            active: true,
        },
        {
            id: 8,
            name: 'Następna plansza',
            modifier: 'Alt',
            key: ']',
            active: true,
        },
        {
            id: 9,
            name: 'Nowa plansza',
            modifier: 'Alt',
            key: 'N',
            active: true,
        },
        {
            id: 10,
            name: 'Przełącz podświetlanie komórek',
            modifier: 'Alt',
            key: 'H',
            active: true,
        },
        {
            id: 11,
            name: 'Przełącz podgląd koloru',
            modifier: 'Alt',
            key: 'I',
            active: true,
        },
        {
            id: 4,
            name: 'Wyczysć planszę (z powiadomieniem)',
            modifier: 'Alt',
            key: 'C',
            active: true,
        },
        {
            id: 5,
            name: 'Wyczysć planszę (bez powiadomienia)',
            modifier: 'Alt',
            key: '/',
            active: true,
        }
    ]));

    const UseShortcuts = ref(useLocalStorage('WUZK-UseShortcuts', true));


    function SetAllshortcuts(value) {
        AvaliableShortcuts.value.forEach((sc) => {
            sc.active = value;
        });

    }


    return {
        AvaliableShortcuts,
        UseShortcuts,
        SetAllshortcuts
    };

});