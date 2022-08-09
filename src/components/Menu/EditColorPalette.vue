<script setup>

</script>

<template>
    <div>
        <h4>Dodawanie nowej palety kolorów: </h4>

        <div class="paletteForm mt-4">

            <!-- <form @submit.prevent="onSubmit">
                <div class="formInputs">
                    <div class="p-1"> <label for="paletteName" class="form-label">Nazwa palety kolorów:
                        </label>
                    </div>
                    <div> <input type="text" class="form-control w-100" id="paletteName" v-model="paletteName">
                    </div>
                </div>

                <div class="mt-4 colorEntry p-2">
                    <div v-for="cl in newPaletteColors.filter(editable)" :key="cl"
                        class="border border-dark border-2 position-relative" :style="{ backgroundColor: cl }"
                        @click="openPicker(newPaletteColors.indexOf(cl))">
                        <span v-if="editedColorId === newPaletteColors.indexOf(cl)"
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            :style="{ zIndex: 2 }"> <i class="bi bi-pencil-fill"></i>
                        </span>
                    </div>
                </div>

                <div class="d-grid gap-2 col-6 mx-auto mt-4">
                    <button type="submit" class="btn btn-primary " @click="HandleSubmit"><i
                            class="bi bi-plus-square"></i> Dodaj paletę</button>
                </div>

            </form>

            <div>
                <ColorPicker theme="light" :color="pickerColor" :sucker-hide="true" :colors-default="newPaletteColors"
                    @changeColor="changeColor" :key="pickerKey" />
            </div> -->
        </div>

    </div>
</template>

<style scoped>
</style>