<script setup>
// import { computed } from "vue";

// const props = defineProps({
//     cellId: Number,
// });

</script>

<template >
    <div class="squareOnBoard border-dark border-top border-start">
        <slot />
    </div>
</template>

<style scoped>
div {
    background-color: #F2F2F2;
}
</style>