<script setup>
import { useMenuStore } from "../../stores/MenuStore";

const MenuStore = useMenuStore();
const { SwitchMenu } = MenuStore;

const TopBarElement = "m-2 align-self-center fs-4";

const icons = ['palette', 'brush', 'share', 'gear'];

</script>

<template>
    <div
        class="col-12 d-flex flex-row flex-nowrap justify-content-between align-items-center bg-purple text-white pt-1 pb-1">

        <div :class="TopBarElement" class="d-flex flex-row gap-2">
            <button v-for="(icon, index) in icons" :key="index" @click="SwitchMenu(index)"
                class="btn btn-lg text-white">
                <i :class="'bi-'+icon"></i>
            </button>
        </div>

        <div :class="TopBarElement">Board name Component</div>

        <div :class="TopBarElement">W układzie z klockami</div>

    </div>
</template>

<style scoped>

</style>