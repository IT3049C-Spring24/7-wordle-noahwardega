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

addLetterToCell('A', 0, 0); 