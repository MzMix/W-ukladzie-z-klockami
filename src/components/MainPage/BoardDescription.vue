<script setup>
import bsTooltip from '@General/bsTooltip.vue';
</script>

<template>

    <KeepAlive>
        <button class="btn text-white fs-3 ms-1" type="button" data-bs-toggle="modal"
            data-bs-target="#ShowBoardDescriptionModal" aria-label="Wyświetl opis planszy">
            <bsTooltip title="Wyświetl opis planszy" placement="bottom">
                <i class="bi bi-blockquote-left"></i>
            </bsTooltip>
        </button>
    </KeepAlive>

</template>

<style scoped>

</style>