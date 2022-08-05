<script setup>
import Modal from 'bootstrap/js/src/modal'
import { useStore } from "../stores/WelcomeStore";

const store = useStore();
const { ShowWelcome, DesibleWelcome } = store;

document.addEventListener("DOMContentLoaded", function (event) {

    if (!ShowWelcome) return;
    var WelcomeModal = new Modal(document.getElementById('WelcomeModal'))
    WelcomeModal.show();

});
</script>

<template>
    <div class="modal fade" id="WelcomeModal" tabindex="-1" aria-labelledby="WelcomeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="WelcomeModalLabel">Klockiem w matematykę!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <h4>W układzie z klockami</h4>

                    <p>
                        Aplikacja do pracy z klockami
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque massa enim, varius non enim id,
                        lobortis
                        auctor velit. Mauris accumsan lorem augue, sed condimentum sem porta non. Nulla feugiat molestie
                        dolor
                        vehicula lobortis. Duis aliquam magna ut justo ultrices condimentum.
                    </p>

                </div>
                <div class="modal-footer">
                    <button @click="DesibleWelcome()" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Nie pokazuj ponownie</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zamknij</button>
                </div>
            </div>
        </div>
    </div>
</template>