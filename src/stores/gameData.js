import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameDataStore = defineStore('gameData', () => {
  const INITIAL_BOARD = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ] 

  const board = ref(INITIAL_BOARD)
  const currentPlayerTurn = ref(1)
  const selectedCells = ref([])
  const selectedCellCount = computed(() => selectedCells.value.length)
  const selectedRow = ref(-1)
  const isBoardCleared = computed(() => {
    return board.value.flat().every(cell => cell === 1)
  })

  function switchPlayer() {
    if (isBoardCleared.value || selectedCellCount.value == 0) return 
    currentPlayerTurn.value = currentPlayerTurn.value === 1 ? 2 : 1
    selectedCells.value = []
    selectedRow.value = -1
  }
  
  function resetGame() {
    currentPlayerTurn.value = 1
    selectedCells.value = []
    selectedRow.value = -1
  }

  return { currentPlayerTurn, board, selectedCells, selectedCellCount, selectedRow, switchPlayer, resetGame, isBoardCleared }
})
