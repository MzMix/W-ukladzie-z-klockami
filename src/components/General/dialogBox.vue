<script setup>

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
        default: false
    }
});

const emit = defineEmits(['close']);

function closeDialog(value) {
    emit('close', value);
}

</script>

<template>

    <div v-show="props.show" class="border border-danger rounded-3 bg-white shadow-lg animateChange Dialog">

        <div class="text-center w-100 bg-danger rounded-top text-white p-1 pt-2">
            <h5 class="">Potwierdź akcję!</h5>
        </div>

        <div class="d-flex flex-row gap-4 align-items-center justify-content-around p-4">
            <button @click="closeDialog(false)" class="btn btn-outline-primary">Anuluj</button>
            <button @click="closeDialog(true)" class="btn btn-danger">Potwierdź</button>
        </div>

    </div>

</template>

<style scoped>
.Dialog {
    --dialog-width: 20em;

    width: var(--dialog-width);
    position: fixed;
    top: 10%;
    left: 50%;
    margin-left: calc(-1 * var(--dialog-width)/2);

    z-index: 10;
}

.Dialog:focus {
    background-color: aqua !important;
}
</style>