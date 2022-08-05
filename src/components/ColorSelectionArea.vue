<script setup>
import ColorSelectButton from './ColorSelectButton.vue'
</script>


<template>
    <div id="ColorsArea">
        <ColorSelectButton v-for="index in 11" :key="index" :color="index - 1" />
    </div>
</template>

<style scoped>
#ColorsArea {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
}
</style>
