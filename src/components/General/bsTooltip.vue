<script setup>
//Import from Vue, Bootstrap
import { onMounted } from "vue";
import { Tooltip } from 'bootstrap';

import { useMenuStore } from '@Stores/MenuStore';
import { storeToRefs } from "pinia";

const MenuStore = useMenuStore();
const { Tooltips } = storeToRefs(MenuStore);

onMounted(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
        Tooltips.value.push(new Tooltip(tooltipTriggerEl));
    });

});

const props = defineProps({
    placement: {
        type: String,
        required: false,
        default: 'right',
        validator(value) {
            return ['top', 'right', 'bottom', 'left'].includes(value);
        }
    },
    title: {
        type: String,
        required: true,
        default: 'Tooltip'
    }
});
</script>
    
<template>

    <span data-bs-toggle="tooltip" data-bs-trigger="hover" :data-bs-placement="props.placement"
        :data-bs-title="props.title" id="bsTooltips">
        <slot>Tooltip here</slot>
    </span>

</template>
    
<style scoped>

</style>