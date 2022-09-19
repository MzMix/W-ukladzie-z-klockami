<script setup>
import bsToast from './bsToast.vue';
import { inject, onMounted } from 'vue';

const ShowToast = inject('ToastTrigger');

onMounted(() => {
    // ShowToast(`#ColorPalettesAdded`)

})

</script>

<template>

    <div aria-live="polite" aria-atomic="true" class="" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="purple" Name="ColorPalettesAdded">
                <template #header>Dodano nową paletę kolorów!</template>
                <template #time>Teraz</template>
                <template #body>Aby zmienić wybraną paletę przejdź do:<br /> <strong>Rysowanie > Zmiana palety
                        kolorów</strong></template>
            </bsToast>

        </div>
    </div>

</template>

<style scoped>
#ToastGroup {
    top: 0;
    right: 0;
}
</style>