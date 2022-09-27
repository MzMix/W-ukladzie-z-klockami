<script setup>
import { storeToRefs } from 'pinia';

import { useStoreShortcuts } from '@Stores/ShortcutStore';
import { watch } from 'vue';
const ShortcutStore = useStoreShortcuts();
const { SetAllshortcuts } = ShortcutStore;
const { UseShortcuts, AvaliableShortcuts } = storeToRefs(ShortcutStore);

watch(UseShortcuts, () => {
    SetAllshortcuts();
});

</script>
    
<template>
    <div class="text-center p-2 w-100 ps-3">
        <h4 class="mt-2 mb-4">Skróty Klawiszowe <i class="bi bi-keyboard"></i></h4>

        <div class="form-check form-switch mb-4 d-flex flex-row gap-2 justify-content-center">
            <input class="form-check-input" type="checkbox" role="switch" id="schortcutMainToogle"
                v-model="UseShortcuts">
            <label class="form-check-label" for="schortcutMainToogle">Używaj skrótów klawiszowych</label>
        </div>


        <ul class="list-group text-start">

            <li class="list-group-item d-flex flex-column flex-wrap justify-content-between gap-1"
                v-for="(entry, index) in AvaliableShortcuts" :key="index">

                <div class="w-100">{{entry.name}}:</div>
                <div class="w-100 text-end"><kbd><kbd>{{entry.modifier}}</kbd> + {{entry.key}}</kbd></div>

                <div class="w-100 d-flex flex-row gap-2">
                    <input class="form-check-input animateChange" type="checkbox" role="switch"
                        :id="'ShortcutToogle'+index" v-model="AvaliableShortcuts[index].active">
                    <label class="form-check-label" :for="'ShortcutToogle'+index">Używaj skrótu</label>
                </div>

            </li>

        </ul>
    </div>
</template>

<style scoped>

</style>