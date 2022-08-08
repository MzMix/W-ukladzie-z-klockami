<script setup>
import ColorSelectionArea from './ColorSelectionArea.vue'
import SettingsMenu from './SettingsMenu.vue';
import DrawingMenu from './DrawingMenu.vue'
import SharingMenu from './SharingMenu.vue';

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

                <DrawingMenu />


            </div>

        </div>

        <!-- Udostępnianie -->
        <div class="collapse m-2" id="Sharing">

            <div class="card card-body">

                <h5 class="card-title">Udostępnianie</h5>

                <SharingMenu />
            </div>

        </div>

        <!-- Ustawienia -->
        <div class="collapse m-2" id="Settings">

            <div class="card card-body">

                <h5 class="card-title">Ustawienia</h5>

                <SettingsMenu />

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
