const gameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const initializeBoard = () => {
        for(i = 0; i < rows; i++) {
            board[i] = [];
            for(j = 0; j < columns; j++){
                board[i][j] = "";
            }
        }
    }

    initializeBoard();
    
    
    const getBoard = () => board;

    const displayBoard = () => console.log(board);

    const placeToken = (row, column, player) => {
        board[row][column] = player;
    }

    const getToken = (row,column) => {
        return board[row][column];
    }

    return {displayBoard,placeToken,getBoard,getToken,initializeBoard}
})();

function  GameController (playerOneName = "Player One", playerTwoName = "Player Two") {
    players = [
        {
            name: playerOneName, 
            token: "X",
            win: 0 },
        {
            name: playerTwoName,
            token: "O",
            win: 0
        }
    ]

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.displayBoard();
       // console.log(`${getActivePlayer().name}'s turn.`);
    };

    const gameWin = () => {
        const activeToken = getActivePlayer().token;

    // Check rows
        for (let i = 0; i < 3; i++) {
            if (gameBoard.getToken(i, 0) === activeToken &&
                gameBoard.getToken(i, 1) === activeToken &&
                gameBoard.getToken(i, 2) === activeToken) {
                return `${getActivePlayer().name}'s win`;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (gameBoard.getToken(0, i) === activeToken &&
                gameBoard.getToken(1, i) === activeToken &&
                gameBoard.getToken(2, i) === activeToken) {
                return `${getActivePlayer().name}'s win`;
            }
        }

        // Check diagonals
        if (gameBoard.getToken(0, 0) === activeToken &&
            gameBoard.getToken(1, 1) === activeToken &&
            gameBoard.getToken(2, 2) === activeToken) {
            return `${getActivePlayer().name}'s win`;
        }

        if (gameBoard.getToken(2, 0) === activeToken &&
            gameBoard.getToken(1, 1) === activeToken &&
            gameBoard.getToken(0, 2) === activeToken) {
            return `${getActivePlayer().name}'s win`;
        }

        return null;
    };

    const gameWinreset = (gameCheck) => {
        if (gameCheck) {
            console.log(gameCheck); // Or handle win state appropriately
            //gameBoard.initializeBoard(); // Reset the board
            switchPlayerTurn();
            return true; // Indicate that a win has occurred
        }
        return false; // No win detected
    };

    const playRound = (row,column) => {


        gameBoard.placeToken(row,column,getActivePlayer().token)


        const gameCheck = gameWin();
        console.log(gameCheck);
        gameWinreset(gameCheck);
            
        switchPlayerTurn();
            
        printNewRound();
    

        

        
        
    };

    printNewRound();

    return {playRound,getActivePlayer,gameWin,gameWinreset,switchPlayerTurn};
};

//const game = GameController("P1","P2");

function ScreenController (playerOneName , playerTwoName ) {

    const game = GameController(playerOneName , playerTwoName);
    const playerDiv = document.querySelector(".player-title");
    const boardDiv = document.querySelector(".content")
    const board = gameBoard.getBoard();
    const reset = gameBoard.initializeBoard;
    const resetButton = document.querySelector(".reset");


    const UpdateScreen = () => {
        

        for(i = 0; i < 3; i++) {
            for(j = 0; j < 3; j++){
                const row = `data-row="${i}"`;
                const column = `data-column="${j}"`
                const element = document.querySelector(`[${row}][${column}]`);
                element.textContent = board[i][j];
            }
        }

        
        const winMessage = game.gameWin();
        
        
        
        playerDiv.textContent = winMessage ? winMessage:`${game.getActivePlayer().name}'s turn.`
        
    }



     // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn && !selectedRow) return;
    if(gameBoard.getToken(selectedRow,selectedColumn) != "") return; // disallow clicking into the same spot again
    
    game.playRound(selectedRow,selectedColumn);
    UpdateScreen();
    if(game.gameWin()) {
        boardDiv.removeEventListener("click", clickHandlerBoard); // when a win happens disable the player being able to click again
        game.getActivePlayer().win++;
        updateScore();
        
        console.log(game.getActivePlayer().win);
      }
  }

  function resetBoard () {
    reset();
    if(game.getActivePlayer().token === "O") {
        game.switchPlayerTurn();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
    UpdateScreen();
  }

  function updateScore () {
    const p1 = document.querySelector(".player1");
    const p2 = document.querySelector(".player2");
    const p1Score = document.querySelector(".p1score");
    const p2Score = document.querySelector(".p2score");
    p1.innerHTML = playerOneName;
    p2.innerHTML = playerTwoName;

    if(game.getActivePlayer().token === "X" && game.getActivePlayer().win !== 0) {
        p1Score.innerHTML = game.getActivePlayer().win;
    } else if  (game.getActivePlayer().token === "O" && game.getActivePlayer().win !== 0) {
        p2Score.innerHTML = game.getActivePlayer().win;
    } else {
        p1Score.innerHTML = 0;
        p2Score.innerHTML = 0;
    }

    

  }

  resetButton.addEventListener("click",resetBoard);

  boardDiv.addEventListener("click", clickHandlerBoard);
  
 

  resetBoard();
  UpdateScreen();
  updateScore();
}

function modal() {
    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("dialog button");

    function closeEvent () {
        ScreenController(document.getElementById("player1").value,document.getElementById("player2").value);
        dialog.close();
    }
    dialog.showModal();
    closeButton.addEventListener("click",closeEvent);

}

//ScreenController();

const startButton = document.querySelector(".start");

startButton.addEventListener("click", modal);
