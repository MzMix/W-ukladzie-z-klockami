<script setup>
import ColorSelectionArea from './ColorSelectionArea.vue'
import DrawingButtons from './DrawingMenu.vue'
import { useStoreWelcomeModal } from "../../stores/WelcomeStore";

const store = useStoreWelcomeModal();
const { EnableWelcome } = store;

</script>

<template>

    <div class="shadow bg-body rounded vh-100 text-center overflow-x-hidden overflow-y-scroll" id="SideMenu">

        <header class="h4 p-1 mt-2">W układzie z klockami <i class="bi bi-bricks"></i></header>

        <hr claas="m2" />

        <div class="row">
            <div class="d-grid gap-1 col mx-auto">

                <button class="btn btn-primary m-2 text-nowrap btn-sm" type="button" data-bs-toggle="collapse"
                    data-bs-target="#ColorPalette" aria-expanded="false" aria-controls="ColorPalette">
                    Kolory
                    <i class="bi-palette"></i>
                </button>

                <button class="btn btn-primary m-2 text-nowrap btn-sm" type="button" data-bs-toggle="collapse"
                    data-bs-target="#Drawing" aria-expanded="false" aria-controls="Drawing">
                    Rysowanie
                    <i class="bi-brush"></i>
                </button>

            </div>
            <div class="d-grid gap-1 col mx-auto">

                <button class="btn btn-primary m-2 text-nowrap btn-sm" type="button" data-bs-toggle="collapse"
                    data-bs-target="#Sharing" aria-expanded="false" aria-controls="Sharing">
                    Udostępnianie
                    <i class="bi-share"></i>
                </button>

                <button class="btn btn-primary m-2 text-nowrap btn-sm" type="button" data-bs-toggle="collapse"
                    data-bs-target="#Settings" aria-expanded="false" aria-controls="Settings">
                    Ustawienia
                    <i class="bi-gear"></i>
                </button>

            </div>
        </div>

        <hr claas=" m2" />

        <!-- Kolory -->
        <div class="collapse m-2 show" id="ColorPalette">

            <div class="card card-body text-center">

                <h5 class="card-title">Kolory <i class="bi-palette"></i></h5>

                <div class="card-text">
                    <ColorSelectionArea />
                </div>

            </div>


        </div>

        <!-- Rysowanie -->
        <div class="collapse m-2" id="Drawing">

            <div class="card card-body">

                <h5 class="card-title">Rysowanie</h5>

                <DrawingButtons />


            </div>

        </div>

        <!-- Udostępnianie -->
        <div class="collapse m-2" id="Sharing">

            <div class="card card-body">

                <h5 class="card-title">Udostępnianie</h5>

                Some placeholder content for the collapse component. This panel is hidden by default but revealed when
                the
                user activates the relevant trigger.
            </div>

        </div>

        <!-- Ustawienia -->
        <div class="collapse m-2" id="Settings">

            <div class="card card-body">

                <h5 class="card-title">Ustawienia</h5>

                <button class="btn btn-outline-info" @click="EnableWelcome()">Pokazuj panel powitalny</button>

            </div>

        </div>

    </div>

</template>

<style scoped>
#SideMenu {
    width: 30vw;
    max-width: 50vw;
    min-width: 20vw;
    resize: horizontal;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: auto;
    scrollbar-color: #0b5ed7 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 16px;
}

*::-webkit-scrollbar-track {
    background: #ffffff;
}

*::-webkit-scrollbar-thumb {
    background-color: #0b5ed7;
    border-radius: 10px;
    border: 3px solid #ffffff;
}

/* ===== Resize Handle CSS ===== */
::-webkit-resizer {
    background-color: #ffffff;
    background: url("../../assets/grip-vertical.svg") no-repeat;
    padding-bottom: 10px;
}
</style>
