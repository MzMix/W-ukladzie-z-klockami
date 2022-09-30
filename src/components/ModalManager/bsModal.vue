<script setup>
import { computed, onMounted } from 'vue';

import { useMenuStore } from '@Stores/MenuStore';
import { storeToRefs } from 'pinia';

const MenuStore = useMenuStore();
const { ModalOpened } = storeToRefs(MenuStore);

const emit = defineEmits(['modalClose']);

const props = defineProps({
    id: {
        required: false,
        type: String,
        default: `exampleModal-${Date.now()}`
    },
    size: {
        required: false,
        type: String,
        default: '',
        validator(value) {
            return ['', 'sm', 'lg', 'xl'].includes(value);
        }
    },
    fullscreen: {
        required: false,
        type: String,
        default: '',
        validator(value) {
            return ['', 'fullscreen', 'fullscreen-sm-down', 'fullscreen-md-down', 'fullscreen-lg-down', 'fullscreen-xl-down', 'fullscreen-xxl-down'].includes(value);
        }
    },
    scrollable: {
        required: false,
        type: Boolean,
        default: false
    },
    centered: {
        required: false,
        type: Boolean,
        default: false
    },
    static: {
        required: false,
        type: Boolean,
        default: false
    }
});

const modalSize = computed(() => {
    if (props.size === '') return '';
    return `modal-${props.size}`;
});

const modalFullscreen = computed(() => {
    if (props.fullscreen === '') return '';
    return `modal-${props.fullscreen}`;
});

const modalScrollable = computed(() => {
    return props.scrollable ? 'modal-dialog-scrollable' : '';
});

const modalCentered = computed(() => {
    return props.centered ? 'modal-dialog-centered' : '';
});

const dataBackdrop = computed(() => {
    return props.static ? 'static' : 'true';
});

const dataKeyboard = computed(() => {
    return props.static ? 'false' : 'true';
});

onMounted(() => {
    const myModalEl = document.getElementById(props.id);

    //Modal shown
    myModalEl.addEventListener('shown.bs.modal', () => {
        ModalOpened.value = true;
    });

    //Modal hidden
    myModalEl.addEventListener('hide.bs.modal', () => {
        ModalOpened.value = false;
        emit('modalClose');
    });

});

//Prevents a bug when closing second modal leaves the backdrop
function RemoveBackdrop() {
    let modalBackdrops = document.getElementsByClassName('modal-backdrop fade show');

    for (let element of modalBackdrops) {
        element.remove();
    }

}

</script>
    
<template>

    <div class="modal fade" :id="props.id" :data-bs-backdrop="dataBackdrop" :data-bs-keyboard="dataKeyboard"
        tabindex="-1" :aria-labelledby="props.id+'Label'" aria-hidden="true">
        <div class="modal-dialog" :class="[modalSize, modalFullscreen, modalScrollable, modalCentered]">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" :id="props.id+'Label'">
                        <slot :name="'modalTitle'">Modal Title</slot>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="RemoveBackdrop()"></button>
                </div>

                <div class=" modal-body">
                    <slot :name="'modalBody'">Modal Body</slot>
                </div>

                <div class="modal-footer">
                    <slot :name="'modalFooter'" />
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="RemoveBackdrop()">Zamknij</button>
                </div>
            </div>
        </div>
    </div>


</template>
    
<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: auto;
    scrollbar-color: #0b5ed7 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 16px;
}

*::-webkit-scrollbar-track {
    background: #ffffff;
}

*::-webkit-scrollbar-thumb {
    background-color: #0b5ed7;
    border-radius: 10px;
    border: 3px solid #ffffff;
}

/* ===== Resize Handle CSS ===== */
::-webkit-resizer {
    background-color: #ffffff;
    background: url("../../assets/grip-vertical.svg") no-repeat;
    padding-bottom: 10px;
}
</style>