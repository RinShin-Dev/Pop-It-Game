<script setup>
import { useGameDataStore } from '@/stores/gameData';

const gameDataStore = useGameDataStore()
const board = gameDataStore.board
const baseRowColors = ['#fe7968', '#fed0af', '#ffff9f', '#a6ead1', '#7ecaca', '#cd9fcb']
const randomRowColors = baseRowColors.sort(() => Math.random() - 0.5)

const handleClick = (rowIndex, cellIndex) => {
  if (gameDataStore.selectedRow === -1) {
    gameDataStore.selectedRow = rowIndex
  }
  if (rowIndex !== gameDataStore.selectedRow && gameDataStore.selectedCellCount > 0) return
  
  // board[rowIndex][cellIndex] = board[rowIndex][cellIndex] === 0 ? 1 : 0
  if (board[rowIndex][cellIndex] === 0) {
    board[rowIndex][cellIndex] = 1
    gameDataStore.selectedCells.push({ rowIndex, cellIndex })
  } else if (board[rowIndex][cellIndex] === 1) {
    const indexInHistory = gameDataStore.selectedCells.findIndex(cell => cell.rowIndex === rowIndex && cell.cellIndex === cellIndex)
    if (indexInHistory === -1) return

    board[rowIndex][cellIndex] = 0
    gameDataStore.selectedCells.splice(indexInHistory, 1)
  }

  if (gameDataStore.selectedCellCount === 0) {
    gameDataStore.selectedRow = -1
  }
  if (gameDataStore.isBoardCleared) {
    const winner = gameDataStore.currentPlayerTurn === 1 ? 2 : 1
    gameDataStore.selectedCells = []
    alert(`Player ${winner} wins!`)
  }
}
</script>

<template>
  <div class="flex flex-col w-fit">
    <div v-for="(row, rowIndex) of board" :key="rowIndex" class="flex gap-2 px-3 py-1 border-2 border-[#0002] transition-all duration-100 ease-in-out"
      :class="{
        'opacity-50': (gameDataStore.selectedRow !== -1 && rowIndex !== gameDataStore.selectedRow) || gameDataStore.isBoardCleared,
        'pt-3 rounded-[1.75rem_1.75rem_0_0]': rowIndex === 0,
        'pb-3 rounded-[0_0_1.75rem_1.75rem]': rowIndex === board.length - 1
      }"
      :style="{ backgroundColor: randomRowColors[rowIndex] }"
    >
      <button
        v-for="(cell, cellIndex) of row"
        :key="cellIndex"
        @click="handleClick(rowIndex, cellIndex)"
        class="rounded-full w-12 h-12 border-2 border-[#0002] active:scale-90 hover:contrast-50 transition-all duration-100 ease-in-out"
        :class="{
          'shadow-[inset_0px_0px_20px_#0006]': board[rowIndex][cellIndex] === 1,
          'shadow-[inset_0px_0px_20px_#fff6]': board[rowIndex][cellIndex] === 0,
          '': gameDataStore.selectedCells.some(cell => cell.rowIndex === rowIndex && cell.cellIndex === cellIndex)
        }"
      >

      </button>
    </div>
  </div>
</template>