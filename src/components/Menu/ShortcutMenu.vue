<script setup>

const ListContent = [
    {
        name: 'Następna paleta kolorów',
        modifier: 'Alt',
        key: 'P'
    },
    {
        name: 'Następny opis pól',
        modifier: 'Alt',
        key: 'O'
    }, {
        name: 'Następna symetria',
        modifier: 'Alt',
        key: 'S'
    },
    {
        name: 'Następna zawartość pól',
        modifier: 'Alt',
        key: 'Z'
    },
    {
        name: 'Wyczysć planszę (z powiadomieniem)',
        modifier: 'Alt',
        key: 'C'
    },
    {
        name: 'Wyczysć planszę (bez powiadomienia)',
        modifier: 'Alt',
        key: '/'
    }
];

</script>
    
<template>
    <div class="text-center p-2 w-100 ps-3">
        <h4 class="mt-2 mb-4">Skróty Klawiszowe <i class="bi bi-keyboard"></i></h4>

        <ul class="list-group text-start">

            <li class="list-group-item d-flex flex-xl-row flex-column flex-wrap justify-content-between gap-1"
                v-for="(entry, index) in ListContent" :key="index">
                <span class="">{{entry.name}}:</span>
                <span class=""><kbd><kbd>{{entry.modifier}}</kbd> + {{entry.key}}</kbd></span>
            </li>

        </ul>

    </div>
</template>

<style scoped>

</style>