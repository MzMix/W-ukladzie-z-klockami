<script setup>
import { useStore } from "../stores/DrawingStore";

const store = useStore();
const { ClearBoard } = store;

</script>

<template>

    <div>
        <button class="btn btn-danger" @click="ClearBoard()">Wyczyść planszę</button>
    </div>

</template>

<style scoped>
</style>
