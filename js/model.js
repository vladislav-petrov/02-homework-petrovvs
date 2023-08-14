export const state = {
  playerName0: 'Player 1',
  playerName1: 'Player 2',
  activePlayer: 0,  // 0, 1
  winner: null,     // 0, 1, 2 (draw), null
  cells: {
    cell0: null,    // 0, 1, null
    cell1: null,
    cell2: null,
    cell3: null,
    cell4: null,
    cell5: null,
    cell6: null,
    cell7: null,
    cell8: null
  },
  cellsRendered: 0
}

const switchActivePlayer = () => state.activePlayer = state.activePlayer === 0 ? 1 : 0;

const checkWinner = function() {
  if (
    (state.cells.cell0 === state.cells.cell1 && state.cells.cell1 === state.cells.cell2 && state.cells.cell2 !== null) ||
    (state.cells.cell3 === state.cells.cell4 && state.cells.cell4 === state.cells.cell5 && state.cells.cell5 !== null) ||
    (state.cells.cell6 === state.cells.cell7 && state.cells.cell7 === state.cells.cell8 && state.cells.cell8 !== null) ||
    (state.cells.cell0 === state.cells.cell3 && state.cells.cell3 === state.cells.cell6 && state.cells.cell6 !== null) ||
    (state.cells.cell1 === state.cells.cell4 && state.cells.cell4 === state.cells.cell7 && state.cells.cell7 !== null) ||
    (state.cells.cell2 === state.cells.cell5 && state.cells.cell5 === state.cells.cell8 && state.cells.cell8 !== null) ||
    (state.cells.cell0 === state.cells.cell4 && state.cells.cell4 === state.cells.cell8 && state.cells.cell8 !== null) ||
    (state.cells.cell2 === state.cells.cell4 && state.cells.cell4 === state.cells.cell6 && state.cells.cell6 !== null)
  ) {
    state.winner = state.activePlayer;
  } else if (state.cellsRendered === 9) {
    state.winner = 2;
  } else {
    switchActivePlayer();
  }
}

export const initData = function(data) {
  state.playerName0 = data.player0Name;
  state.playerName1 = data.player1Name;
  state.activePlayer = data.activePlayer;
  state.winner = null;
  state.cellsRendered = 0;

  for (let i = 0; i <=8; i++) {
    state.cells[`cell${i}`] = null;
  }
}

export const updateCell = function(cellId) {
  state.cells[cellId] = state.activePlayer;
  state.cellsRendered++;

  checkWinner();
}
