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
        addLetterToCell(gameState.currentAttempt, gameState.currentPosition, event.key);
        gameState.currentGuess += event.key;
        gameState.currentPosition++;
    }
    else if (isBackspace(event.key)) {
        if (gameState.currentPosition > 0) {
            gameState.currentPosition--;
            addLetterToCell(gameState.currentAttempt, gameState.currentPosition, "");
            gameState.currentGuess = gameState.currentGuess.slice(0, -1);
        }
    }
    else if (isEnter(event.key)) {
        if (gameState.currentPosition < gameState.wordToGuess.length) {
            console.log("The word is not complete.");
        }
        else if (gameState.currentPosition === gameState.wordToGuess.length) {
            if (gameState.currentGuess === gameState.wordToGuess) {
                console.log("Congratulations! You've guessed the word correctly.");
            } else {
                if (gameState.currentAttempt >= gameConfig.rows) {
                    console.log("Game over. You've reached the maximum number of attempts.");
                } else {
                    console.log("The word guessed is not correct.");
                    gameState.currentAttempt++;
                    gameState.currentPosition = 0;
                    gameState.currentGuess = "";
                }
            }
        }
    }
});

let gameState = {
    wordToGuess: "apple",
    currentAttempt: 0,
    currentPosition: 0,
    currentGuess: ""
};

// Function to check if a word is valid (mock implementation)
function isWordValid(word) {
    const validWords = ["apple", "banana", "orange", "grape", "kiwi"]; // Example list of valid words
    return validWords.includes(word.toLowerCase());
}

// Function to get a random word (mock implementation)
function getRandomWord() {
    const validWords = ["apple", "banana", "orange", "grape", "kiwi"]; // Example list of valid words
    return validWords[Math.floor(Math.random() * validWords.length)];
}

// Function to check the position of letters in a guess
function checkWord(word, guess) {
    const result = [];
    for (let i = 0; i < word.length; i++) {
        if (guess[i] === word[i]) {
            result.push("correct");
        } else if (word.includes(guess[i])) {
            result.push("misplaced");
        } else {
            result.push("incorrect");
        }
    }
    return result;
}

// Function to check the user's guess
function checkGuess(word, guess) {
    // Check if the word guessed is valid
    if (!isWordValid(guess)) {
        console.log("The word is not valid.");
        return;
    }

    // Check the position of letters in the guess
    const result = checkWord(word, guess);

    // Check if all letters are in the correct position
    if (result.every(status => status === "correct")) {
        console.log("Congratulations! You've guessed the word correctly.");
        // End the game
    } else {
        console.log("The word is not correct.");
        // Continue the game or take appropriate action
    }
}

function revealAttemptResult(word, guess) {
    // Get the result of the current guess
    const result = checkWord(word, guess);

    // Loop over the result and update the grid cells
    for (let i = 0; i < result.length; i++) {
        const cellId = `cell-${gameState.currentAttempt}-${i}`;
        const cell = document.getElementById(cellId);
        if (cell) {
            cell.classList.remove("correct", "misplaced", "incorrect");
            if (result[i] === "correct") {
                cell.classList.add("correct");
            } else if (result[i] === "misplaced") {
                cell.classList.add("misplaced");
            } else {
                cell.classList.add("incorrect");
            }
        }
    }
}