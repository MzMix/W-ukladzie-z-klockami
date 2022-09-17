<script setup>
import BoardCell from './BoardCell.vue'
import BoardIndex from './BoardIndex.vue'

import { watch, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';

import { useStoreAxes } from '../../stores/AxesStore'

const AxesStore = useStoreAxes();
const { AxesShown } = storeToRefs(AxesStore);

const Board = ref(null);
watch(AxesShown, () => {
  if (AxesShown.value) {
    Board.value.style.setProperty('--display-axes', '1');
  } else {
    Board.value.style.setProperty('--display-axes', '0');
  }
});

onMounted(() => {
  if (AxesShown.value) {
    Board.value.style.setProperty('--display-axes', '1');
  } else {
    Board.value.style.setProperty('--display-axes', '0');
  }
});

</script>

<template>

  <div class="d-grid" style="place-content: center;">
    <div id="BoardOuterContainer">
      <div id="BoardContainer" class="p-2">
        <div class=" index top-index">
          <BoardIndex v-for="index in 9" :key="index" sector="horizontal" :class="'x'+index"></BoardIndex>
          <BoardIndex :cellId="10" :key="10" sector="horizontal" class="border-dark border-end x10">10</BoardIndex>
        </div>

        <div class="index left-index">
          <BoardIndex v-for="index in 9" :key="index" sector="vertical" :class="'y'+index"></BoardIndex>
          <BoardIndex :cellId="10" :key="10" sector="vertical" class="border-dark border-bottom y10">10</BoardIndex>

        </div>

        <div id="Board" ref="Board">
          <BoardCell v-for="i in 100" :key="i" :cellId="i" v-bind="{ pos: i }" />
        </div>

        <div class="index right-index border-dark border-end">
          <BoardIndex v-for="index in 9" :key="index" sector="vertical" :class="'y'+index"></BoardIndex>
          <BoardIndex :cellId="10" :key="10" sector="vertical" class="border-dark border-bottom y10">10</BoardIndex>

        </div>

        <div class="index bottom-index border-dark border-bottom">
          <BoardIndex v-for="index in 9" :key="index" sector="horizontal" :class="'x'+index"></BoardIndex>
          <BoardIndex :cellId="10" :key="10" sector="horizontal" class="border-dark border-end x10">10</BoardIndex>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  transition: all 0.15s ease-in-out;
}

#BoardContainer {
  display: grid;
  grid-template-columns: calc(4vw) calc(40vw) calc(4vw);
  grid-template-rows: calc(4vw) calc(40vw) calc(4vw);
  grid-template:
    '.top-index.'
    'left-index board right-index'
    '.bottom-index.';
}

#Board {
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  grid-area: board;
  position: relative;
  box-sizing: border-box;

  --axes-color: #ff0000;
}


#Board::after {
  content: "";

  position: absolute;
  right: calc(50% - 2px);
  top: 1px;

  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;

  border-right: 4px solid var(--axes-color);
  z-index: 2;

  opacity: var(--display-axes)
}

#Board::before {
  content: "";

  position: absolute;
  top: calc(50% - 2px);
  left: 1px;

  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;

  border-top: 4px solid red;
  z-index: 2;

  opacity: var(--display-axes)
}

.index {
  display: grid;
  place-content: center;
  text-align: center;
}

.top-index {
  grid-area: top-index;
  grid-template-rows: 1;
  grid-template-columns: repeat(10, 10%);
  width: 100%;
}

.bottom-index {
  grid-area: bottom-index;
  grid-template-rows: 1;
  grid-template-columns: repeat(10, 10%);
  width: 100%;
}

.left-index {
  grid-area: left-index;
  grid-template-columns: 1;
  grid-template-rows: repeat(10, 10%);
  height: 100%;
}

.right-index {
  grid-area: right-index;
  grid-template-columns: 1;
  grid-template-rows: repeat(10, 10%);
  height: 100%;
}
</style>