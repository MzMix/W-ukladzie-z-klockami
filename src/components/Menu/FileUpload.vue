<script setup>

function onFileChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
        return;

    console.log(files)
}

</script>

<template>
    <div>
        <label for="formFile" class="form-label">Importuj palety kolorów: </label>
        <input class="form-control" type="file" id="formFile" @change="onFileChange" />
    </div>
</template>