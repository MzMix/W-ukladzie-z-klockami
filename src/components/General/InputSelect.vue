<script setup>
import { ref } from 'vue';

const props = defineProps({
    options: Array,
    value: Number,
    ariaLabel: String,
});

const emit = defineEmits(['action']);

const selected = ref(props.options[props.value].value);
console.log(selected.value);
function handleChange() {
    emit('action', selected.value);
    console.log(selected.value);
}

</script>

<template>
    <div>
        <label for="InputSelect">
            <slot />
        </label>

        <select id="InputSelect" class="form-select" aria-label="{{props.ariaLabel}}" v-model="selected"
            @input="handleChange()">
            <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.text }}</option>
        </select>
    </div>
</template>

<style scoped>
</style>