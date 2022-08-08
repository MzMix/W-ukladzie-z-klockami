<script setup>
import Modal from 'bootstrap/js/src/modal'

import CustomPaletteModal from "./ManageColorPalettes.vue";
import { useStoreWelcomeModal } from "../../stores/WelcomeStore";

const store = useStoreWelcomeModal();
const { EnableWelcome } = store;

function showModal() {
    var CustomPaletteModal = new Modal(document.getElementById('CustomPaletteModal'))
    CustomPaletteModal.show();
}

</script>

<template>
    <div>
        <hr />
        <button class="btn btn-outline-info" @click="showModal()">Zarządzaj paletami kolorów</button>

        <hr />

        <button class="btn btn-outline-info" @click="EnableWelcome()">Pokazuj panel powitalny</button>

        <hr />

    </div>
    <CustomPaletteModal />
</template>