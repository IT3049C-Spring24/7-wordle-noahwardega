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

function addLetterToCell(row,col,letter) {
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
  
  function isBackspace(key) {
    return key === "Backspace";
  }
  
  function isEnter(key) {
    return key === "Enter";
  }
  
  document.addEventListener('keydown', (event) => {
    if (isLetter(event.key)) {
      console.log(`Letter: ${event.key}`);
    }
    else if (isBackspace(event.key)) {
      console.log("Backspace");
    }
    else if (isEnter(event.key)) {
      console.log("Enter");
    }
  });