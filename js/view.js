// Selecting elements
const playgroundElement = document.querySelector('.playground');
const gameStateTextElement = document.querySelector('.game-state-info__text');
const startButton = document.querySelector('.button-start');
const newButton = document.querySelector('.button-new');
const player1NameElement = document.querySelector('#name-1');
const player2NameElement = document.querySelector('#name-2');
const modalElement = document.querySelector('.modal');
const overlayElement = document.querySelector('.overlay');

// Clearing playground
export const clearPlayground = function() {
  const cells = document.querySelectorAll('.playground__cell');

  cells.forEach((cell) => cell.classList.add('hidden'));
}

// Hide/show modal window
export const hideModal = function() {
  modalElement.classList.add('hidden');
  overlayElement.classList.add('hidden');
}

export const showModal = function() {
  modalElement.classList.remove('hidden');
  overlayElement.classList.remove('hidden');
}

// Enable/disable elements
const disablePlayground = function() {
  playgroundElement.style.pointerEvents = 'none';
}

export const enablePlayground = function() {
  playgroundElement.style.pointerEvents = 'auto';
}

// Rendering
export const renderCell = function(id, activePlayer) {
  const cellElement = document.querySelector(`#${id}`);

  cellElement.setAttribute('src', activePlayer === 0 ? 'img/cross.png' : 'img/circle.png');
  cellElement.onload = () => cellElement.classList.remove('hidden');
}

export const renderGameStateInfoText = function(data) {
  switch (data.winner) {
    case null:
      gameStateTextElement.textContent = `${data[`playerName${data.activePlayer}`]}'s turn`;

      break;
    case 0:
    case 1:
      gameStateTextElement.textContent = `${data[`playerName${data.activePlayer}`]} won!`;
      disablePlayground();

      break;
    case 2:
      gameStateTextElement.textContent = 'Draw';
      disablePlayground();

      break;
    default:
      gameStateTextElement.textContent = 'Something went wrong';
  }
}

// Event handlers
export const subscribeHandlerPlayground = function(handler) {
  playgroundElement.addEventListener('click', function(event) {
    if (!event.target.classList.contains('playground__cell-container')) return;

    const cellId = event.target.querySelector('.playground__cell').id;

    // Return if cell was already rendered
    if (!document.querySelector(`#${cellId}`).classList.contains('hidden')) return;

    handler(cellId);
  });
}

export const subscribeHandlerStart = function(handler) {
  startButton.addEventListener('click', function() {
    if (!player1NameElement.value || !player2NameElement.value) {
      alert('Enter player names');

      return;
    }

    const player0Name = player1NameElement.value;
    const player1Name = player2NameElement.value;
    const activePlayer = Number(document.querySelector('input[name="start"]:checked').value.slice(-1));

    handler({
      player0Name,
      player1Name,
      activePlayer
    });
  });
}

export const subscribeHandlerNew = function(handler) {
  newButton.addEventListener('click', handler);
}
