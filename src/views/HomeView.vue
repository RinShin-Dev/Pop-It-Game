<script setup>
import PopItBoard from "@/components/PopItBoard.vue"
import { useGameDataStore } from "@/stores/gameData";
import { computed } from "vue";

const gameDataStore = useGameDataStore()
const disableSubmit = computed(() => gameDataStore.selectedCellCount === 0)
</script>

<template>
  <main class="w-screen h-screen">
    Player Turn: {{ gameDataStore.currentPlayerTurn }}
    <PopItBoard />
    <button @click="gameDataStore.switchPlayer()" class="btn btn-success" :disabled="disableSubmit">Submit</button>
  </main>
</template>
