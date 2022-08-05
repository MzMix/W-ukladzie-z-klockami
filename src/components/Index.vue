<script setup>
import { computed } from "@vue/runtime-core";

const props = defineProps({
    cellId: Number,
});

</script>

<template >
    <div class="squareOnBoard fs-4 border-dark border-top border-start">
        <slot />
    </div>
</template>

<style scoped>
</style>