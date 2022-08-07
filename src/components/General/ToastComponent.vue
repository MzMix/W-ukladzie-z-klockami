<script setup>
const props = defineProps({
    headerIcon: String,
    headerText: String,
    className: String,
});
</script>

<template>
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div id="liveToast" class="toast hide {{props.className}}" role="alert" aria-live="assertive"
            aria-atomic="true">
            <div class="toast-header">
                <i class="bi {{ props.headerIcon }}"></i>
                <strong class="me-auto">{{ props.headerText }}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>