<script setup>
import { storeToRefs } from "pinia";

import { useStoreWelcomeModal } from "@Stores/WelcomeStore";
import { useBoardStore } from "@Stores/BoardStore";
import { useMenuStore } from '@Stores/MenuStore';

//Welcome modal
const WelcomeModalStore = useStoreWelcomeModal();
const { ShowWelcome } = storeToRefs(WelcomeModalStore);
const { ToogleWelcome } = WelcomeModalStore;

//Menu
const MenuStore = useMenuStore();
const { ShowLeaveWarn, UseColorIndicator } = storeToRefs(MenuStore);
const { ToogleLeaveWarn, ToogleColorIndicator } = MenuStore;

//Board
const BoardStore = useBoardStore();
const { ToogleBoardHighlight } = BoardStore;
const { UseBoardHighlight } = storeToRefs(BoardStore);

</script>

<template>
    <div class="text-center p-2 w-100 ps-3">
        <h4 class="mt-2 mb-4">Ustawienia <i class="bi bi-gear"></i></h4>

        <button class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#ManageColorPalettesModal">
            Zarządzaj paletami kolorów
        </button>

        <hr />

        <button class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#ManageBoardsModal">
            Zarządzaj planszami
        </button>

        <hr />

        <button class="btn btn-outline-primary w-100" @click="ToogleWelcome()">
            <span v-if="ShowWelcome">Nie pokazuj panelu powitalnego</span>
            <span v-if="!ShowWelcome">Pokazuj panel powitalny</span></button>

        <hr />

        <button class="btn btn-outline-primary w-100" @click="ToogleBoardHighlight()">
            <span v-if="UseBoardHighlight">Wyłącz podświetlanie komórek</span>
            <span v-if="!UseBoardHighlight">Włącz podświetlanie komórek</span>
        </button>

        <hr />

        <button class="btn btn-outline-primary w-100" @click="ToogleColorIndicator()">
            <span v-if="UseColorIndicator">Wyłącz podgląd koloru</span>
            <span v-if="!UseColorIndicator">Włącz podgląd koloru</span>
        </button>

        <hr>

        <button class="btn btn-outline-primary w-100" @click="ToogleLeaveWarn()">
            <span v-if="ShowLeaveWarn">Wyłącz ostrzeżenie przed wyjściem</span>
            <span v-if="!ShowLeaveWarn">Włącz ostrzeżenie przed wyjściem</span>
        </button>

        <hr />

        <button class="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#ClearDataModal">
            <i class="bi bi-trash3"></i> Usuń dane aplikacji</button>

    </div>
</template>