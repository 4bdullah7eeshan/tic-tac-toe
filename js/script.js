/**
 * script.js
 */
const TicTacToe = (function(doc) {
    /* All Factories */
    
    const generateGameDescription = () => {
        const gameDescriptionContainer  = doc.createElement("section");
        const welcomeMessage = doc.createElement("h2");
        welcomeMessage.textContent = "Welcome to Tic Tac Toe!";
        const gameInstruction = doc.createElement("p");
        gameInstruction.textContent = "Player 1's mark is 'X' and Player 2's mark is 'O'. Player 1 goes first.";
        const gameGuide = doc.createElement("p");
        gameGuide.textContent = "Player 1, it's your turn! Make your move - click on an unmarked cell.";
        gameDescriptionContainer.appendChild(welcomeMessage);
        gameDescriptionContainer.appendChild(gameInstruction);
        gameDescriptionContainer.appendChild(gameGuide);
        mainElement.appendChild(gameDescriptionContainer);
        return gameGuide;
    };

    const resetGame = () => {
        mainElement.innerHTML = '';
        player = 1;
        gameGuide = generateGameDescription();
        generateGameResetButton();
        gameBoardGrid = generateGameBoardGrid();

    }
    
    const generateGameResetButton = () => {
        const resetButton = doc.createElement("button");
        resetButton.textContent = "Reset";
        resetButton.addEventListener("click", function() {
            resetGame();
        });
        mainElement.appendChild(resetButton);
    };
         
    const generateGameBoardBorder = () => {
        const border = doc.createElement("div");
        border.setAttribute("style", "height: 50vh; width: 50vh; outline: 1px solid black; cell-sizing: border-cell; display: flex; flex-wrap: wrap; align-items: stretch;");
        return border;
    };

    const generateGameBoardCell = () => {
        const cell = doc.createElement("button");
        cell.setAttribute("style", "height: 33.333333%; width: 33.33333%; outline: 1px solid black;");
        cell.textContent = "";

        const handleClick = function() {
            gameController(cell);
            cell.removeEventListener("click", handleClick);
        };
        
        cell.addEventListener("click", handleClick);

        return cell;
    };
    
    const generateGameBoardGrid = () => {
        const grid = generateGameBoardBorder();
        for (let i = 0; i < 9; i++) {
            grid.appendChild(generateGameBoardCell());
        }
        mainElement.appendChild(grid);
        return grid;
    };

    // Game
    const gameController = (gameCell) => {
        if (player === 1) {
            gameCell.textContent = "X";
            player = 2;
            gameGuide.textContent = "Player 2, it's your turn! Make your move - click on an unmarked cell.";
        } else if (player === 2) {
            gameCell.textContent = "O";
            player = 1;
            gameGuide.textContent = "Player 1, it's your turn! Make your move - click on an unmarked cell.";

        }
        getGameStatus(gameBoardGrid);
    }

    const getGameStatus = () => {
        
        const c = Array.from(gameBoardGrid.children);

        // Do I really have to do it like this:
        if ((c[0].textContent === "X" && c[1].textContent === "X" && c[2].textContent === "X") || (c[3].textContent === "X" && c[4].textContent === "X" && c[5].textContent === "X") || (c[6].textContent === "X" && c[7].textContent === "X" && c[8].textContent === "X") ||
            (c[0].textContent === "X" && c[3].textContent === "X" && c[6].textContent === "X") || (c[1].textContent === "X" && c[4].textContent === "X" && c[7].textContent === "X") || (c[2].textContent === "X" && c[5].textContent === "X" && c[8].textContent === "X") ||
            (c[0].textContent === "X" && c[4].textContent === "X" && c[8].textContent === "X")|| (c[2].textContent === "X" && c[4].textContent === "X" && c[6].textContent === "X")) {
                setTimeout(() => {
                    dialogHeading.textContent = "Player 1 (X) Won!"
                    dialog.showModal();
                }, 100);                
        } else if (c[0].textContent === c[1].textContent === c[2].textContent === "O" || c[3].textContent === c[4].textContent === c[5].textContent === "O" || c[6].textContent === c[7].textContent === c[8].textContent === "O" ||
            c[0].textContent === c[3].textContent === c[6].textContent === "O" || c[1].textContent === c[4].textContent === c[7].textContent === "O" || c[2].textContent === c[5].textContent === c[8].textContent === "O" ||
            c[0].textContent === c[4].textContent === c[8].textContent === "O" || c[2].textContent === c[4].textContent === c[6].textContent === "O") {
                setTimeout(() => {
                    dialogHeading.textContent = "Player 2 (O) Won!"
                    dialog.showModal();
                }, 100);
        } else {
            // And this too?
            let blank = 0;
            for (let j = 0; j < 9; j++) {
                if (c[j].textContent !== "") {
                    blank += 1;
                    if (blank === 9) {
                        dialogHeading.textContent = "Draw!"
                        dialog.showModal();
                    }
                }
            }
        }
    }

    /* Initialize Game */

    // Get DOM elements
    const mainElement = doc.querySelector("main");
    
    const dialog = doc.querySelector("dialog");
    const dialogHeading = doc.querySelector(".dialog-heading");
    const dialogCloseButton = doc.querySelector(".dialog-close-button");
    dialogCloseButton.addEventListener('click', () => {
        dialog.close();
        resetGame();
    });

    // Setup required variables
    let player, gameGuide, gameBoardGrid;

    // Start Game!
    player = 1;
    gameGuide = generateGameDescription();
    generateGameResetButton();
    gameBoardGrid = generateGameBoardGrid();
 
})(document);