<script setup>
import { computed, ref, onMounted } from 'vue';

const props = defineProps({
    options: Map,
    selectedKey: String,
    ariaLabel: String,
});

const emit = defineEmits(['action']);

const optionsArray = computed(() => {

    let arr = [];

    const iterator = props.options.keys();
    for (let i = 0; i < props.options.size; i++) {
        arr.push({
            text: iterator.next().value,
            value: i,
        });
    }
    return arr;
});

const selectedValue = ref(0);

function handleChange() {
    emit('action', optionsArray[selectedValue.value].text);
}

onMounted(() => {
    selectedValue.value = optionsArray.value.findIndex((element) => {
        return element.text === props.selectedKey;
    });
});

</script>

<template>
    <div>
        <label for="InputSelect">
            <!-- <slot /> -->

            {{ selectedValue }}
        </label>

        <select id="InputSelect" class="form-select" aria-label="{{props.ariaLabel}}" v-model="selectedValue"
            @change="handleChange()">
            <option v-for="option in optionsArray" :key="option.value" :value="option.value">{{ option.text }}
            </option>
        </select>
        <hr />
    </div>
</template>

<style scoped>
</style>