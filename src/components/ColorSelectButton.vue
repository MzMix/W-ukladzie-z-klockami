<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "../stores/DrawingStore";

const store = useStore();
const { PickColor, UseColor } = store;

const props = defineProps({
    color: Number
});

const fillColor = computed(() => {
    return UseColor(props.color);
});

</script>

<template>
    <div @click="PickColor(props.color)" class="ratio-1x1 ColorSelectBTN fs-1 m-1"
        :style="{ backgroundColor: fillColor }"></div>
</template>

<style scoped>
.ColorSelectBTN {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    width: 5vw;
    height: 5vw;
    border: 1px solid;
    border-radius: 10%;
}

.ColorSelectBTN:hover {
    transform: scale(1.1);
}
</style>