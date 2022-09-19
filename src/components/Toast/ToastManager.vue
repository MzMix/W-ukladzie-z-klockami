<script setup>
import bsToast from './bsToast.vue';
import { inject, onMounted } from 'vue';

const ShowToast = inject('ToastTrigger');

onMounted(() => {

    for (let i = 1; i <= 8; i++) {
        ShowToast(`#t${i}`)
    }

})

</script>

<template>

    <div aria-live="polite" aria-atomic="true" class="" id="ToastGroup">
        <div class="toast-container bottom-0 end-0 p-3">

            <bsToast Theme="white" Name="t1">
                <template #header>Toast #1</template>
            </bsToast>
            <bsToast Theme="primary" Name="t2">
                <template #header>Toast #2</template>
            </bsToast>
            <bsToast Theme="secondary" Name="t3">
                <template #header>Toast #3</template>
            </bsToast>
            <bsToast Theme="purple" Name="t4">
                <template #header>Toast #4</template>
            </bsToast>
            <bsToast Theme="success" Name="t5">
                <template #header>Toast #5</template>
            </bsToast>
            <bsToast Theme="danger" Name="t6">
                <template #header>Toast #6</template>
            </bsToast>
            <bsToast Theme="warning" Name="t7">
                <template #header>Toast #7</template>
            </bsToast>
            <bsToast Theme="info" Name="t8">
                <template #header>Toast #8</template>
            </bsToast>

        </div>
    </div>

</template>

<style scoped>
#ToastGroup {
    top: 0;
    right: 0;
}
</style>