<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from "pinia";
import Modal from 'bootstrap/js/src/modal';

import bsModal from '@ModalManager/bsModal.vue';
import EncodeBoard from '@EncodeBoard/EncodeBoard.vue';
import ManageColorPalettesModal from "@ColorManager/ManageColorPalettes.vue";

import { useStoreWelcomeModal } from "@Stores/WelcomeStore";
import { useBoardStore } from "@Stores/BoardStore";

import { SaveEncodedBoard } from '@Utils/SaveEncodedBoard';

//Welcome
const store = useStoreWelcomeModal();
const { ShowWelcome, DesibleWelcome } = store;

//Board
const BoardStore = useBoardStore();
const { BoardName, BoardDescription } = storeToRefs(BoardStore);

function ClearData() {
    localStorage.clear();
    document.location.reload(true);
}

onBeforeMount(() => {
    document.addEventListener("DOMContentLoaded", function () {
        if (!ShowWelcome) return;
        var WelcomeModal = new Modal(document.getElementById('WelcomeModal'));
        WelcomeModal.show();
    });
});

</script>

<template>

    <bsModal id="WelcomeModal" size="lg">

        <template #modalTitle>
            Klockiem w matematykę! - <span class="text-purple">W układzie z klockami</span>
        </template>

        <template #modalBody>
            <p>
                Jest to pierwsza aplikacja z serii "Klockiem w matematykę!".
            </p>

            <hr />

            <h6>Mozliwości aplikacji</h6>

            <ol>

                <li>Wypełnianie planszy kolorami przedstawiającymi klocki</li>

                <li>Zmiana wybranego zestawu kolorów (domyślnie dostępne zestawy „Kreatyny” i
                    „Matematyczny”)
                </li>

                <li>Przełączanie widoku osi symetrii pozwalających podzielić planszę na ćwiartki
                </li>

                <li>Zmianę sposobu opisu pól na planszy:
                    <ol type="a">
                        <li>Numeracja - dwie współrzędne liczbowe na wzór układu współrzędnych
                        </li>
                        <li>Adresowanie – para litera i liczba na wzór arkusza kalkulacyjnego
                        </li>
                        <li>Kolory – para dwóch kolorów</li>
                        <li>Brak – wyłączenie opisu pól</li>
                    </ol>
                </li>

                <li>Zmianę zawartości pól:
                    <ol type="a">
                        <li>Brak – pola na planszy nie mają zawartości</li>
                        <li>Numeracja – każde pole ma przypisaną wartość od 1 do 100</li>
                        <li>Adresowanie – każde pole ma przypisany adres (para litera i liczba)
                        </li>
                    </ol>
                </li>

                <li>Zapis widoku planszy jako grafiki do pliku .png</li>
                <li>Kodowanie rysunku – wyświetlenie listy użytych kolorów i listy pól
                    wypełnionych
                    tym
                    kolorem
                    (sposób kodowania zależy od wybranego opisu pól na planszy)</li>
                <li>Modyfikowanie zestawów kolorów:
                    <ol type="a">
                        <li>Dodawanie własnego zestawu z własną nazwą i listą kolorów</li>
                        <li>Edycja dodanych zestawów (nie dotyczy zestawów domyślnych)</li>
                        <li>Usuwanie dodanych zestawów (nie dotyczy zestawów domyślnych)</li>
                        <li>Eksport listy zestawów kolorów do pliku .json</li>
                        <li>Import listy kolorów z pliku .json</li>
                    </ol>
                </li>

            </ol>
        </template>

        <template #modalFooter>
            <button @click="DesibleWelcome()" type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
                Nie pokazuj ponownie
            </button>
        </template>

    </bsModal>

    <bsModal id="ClearDataModal">

        <template #modalTitle>
            Czy na pewno chcesz wyczyścić dane aplikacji zapisane w pamięci przeglądarki?
        </template>

        <template #modalBody>
            <p>
                Wszystkie dane zapisane w pamięci przeglądarki zostaną
                <strong>usunięte</strong>
                (własne palety kolorów, ustawienia, obecny stan planszy).
            </p>

            <p>
                Tej akcji <strong>nie będzie</strong> można cofnąć!
                Aby potwierdzić operację kliknij poniższy przycisk:
            </p>

            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="ClearData()">
                    <i class="bi bi-trash3"></i> Tak, usuń
                </button>
            </div>

        </template>

    </bsModal>

    <bsModal id="EncodeBoardModal" :fullscreen="'fullscreen'" :static="true">

        <template #modalTitle>
            Zakoduj rysunek: {{BoardName}}
        </template>

        <template #modalBody>
            <EncodeBoard />
        </template>

        <template #modalFooter>
            <button type="button" class="btn btn-success me-5" @click="SaveEncodedBoard(BoardName)">
                Zapis do pliku
            </button>
        </template>

    </bsModal>

    <ManageColorPalettesModal />

    <bsModal id="ShowBoardDescriptionModal">

        <template #modalTitle>
            Opis planszy: {{BoardName}}
        </template>

        <template #modalBody>
            {{BoardDescription}}
        </template>

    </bsModal>

</template>

<style scoped>

</style>