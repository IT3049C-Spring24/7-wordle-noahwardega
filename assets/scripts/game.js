const gridDiv = document.getElementById('wordle-grid');

function addBoxToGrid(row, col) {
    const cell = document.createElement('div');
    cell.classList.add('letter');
    cell.id = `cell-${row}-${col}`;
    gridDiv.appendChild(cell);
}

const gameConfig = {
    rows: 6,
    columns: 5
};

function setupGrid() {
    for (let i = 0; i < gameConfig.rows; i++) {
        for (let j = 0; j < gameConfig.columns; j++) {
            addBoxToGrid(i, j);
        }
    }
}

setupGrid();

let wordToGuess = "great";
let currentAttempt = 0;
let lastLetterPosition = { row: -1, column: -1 };
let grid = [];

function initializeGrid() {
    for (let i = 0; i < gameConfig.rows; i++) {
        grid.push([]);
        for (let j = 0; j < gameConfig.columns; j++) {
            grid[i].push("");
        }
    }
}

initializeGrid();

function addLetterToCell(letter, row, col) {
    const cellId = `cell-${row}-${col}`;
    const cell = document.getElementById(cellId);
    if (cell) {
        cell.textContent = letter;
        grid[row][col] = letter;
    }
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
  }


  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (isLetter(key)) {
      // Determine the current position to add the letter
      const row = currentAttempt;
      const col = lastLetterPosition.column + 1; // Move to the next column
      if (col < gameConfig.columns) {
        addLetterToBox(row, col, key);
        lastLetterPosition = { row, column: col };
      }
    } else if (key === 'backspace') {
      // Remove the last letter from the grid
      const row = currentAttempt;
      const col = lastLetterPosition.column;
      if (col >= 0) {
        addLetterToBox(row, col, '');
        lastLetterPosition = { row, column: col - 1 }; // Move to the previous column
      }
    } else if (key === 'enter') {
      // Check if the word is complete
      if (lastLetterPosition.column + 1 < wordToGuess.length) {
        console.log('Word is not complete.');
      } else {
        console.log('Checking if word is correct...');
        // Call function to check if the word is correct
      }
    }
  });