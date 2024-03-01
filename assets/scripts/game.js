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
            revealAttemptResult(gameState.wordToGuess, gameState.currentGuess);
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
    wordToGuess: '',
    currentAttempt: 0,
    currentPosition: 0,
    currentGuess: ""
};

async function initGameState() {
    gameState.wordToGuess = await getRandomWord();
    console.log('Random word:', gameState.wordToGuess); 
}

initGameState();

async function isWordValid(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.status === 200) {
        const data = await response.json();
        return Array.isArray(data);
    } else {
        return false;
    }
}

async function getRandomWord() {
    const response = await fetch('https://it3049c-hangman.fly.dev');
    const data = await response.json();
    return data.word;
}

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

function checkGuess(word, guess) {
    if (!isWordValid(guess)) {
        console.log("The word is not valid.");
        return;
    }

    const result = checkWord(word, guess);

    if (result.every(status => status === "correct")) {
        console.log("Congratulations! You've guessed the word correctly.");
    } else {
        console.log("The word is not correct.");
    }
}

function revealAttemptResult(word, guess) {
    const result = checkWord(word, guess);
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