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

function  gameController (playerOneName = "Player One", playerTwoName = "Player Two") {
    players = [
        {
            name: playerOneName, 
            token: "X"},
        {
            name: playerTwoName,
            token: "O"
        }
    ]

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.displayBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const gameWin = () => {
        const activeToken = getActivePlayer().token;

        //Checking row wins
        for(i = 0; i < 3; i++){
            for(j = 0; j < 3; j++){
                if(gameBoard.getToken(i,j)=== activeToken && j != 2) {continue}
                else if(gameBoard.getToken(i,j)=== activeToken && j === 2) {return (`${getActivePlayer().name}'s win`);}
                else {break;}
            }
        }
        //Checking column wins
        for(i = 0; i < 3; i++){
            for(j = 0; j < 3; j++){
                if(gameBoard.getToken(j,i)=== activeToken && j != 2) {continue}
                else if(gameBoard.getToken(j,i)=== activeToken && j === 2) {return (`${getActivePlayer().name}'s win`);}
                else {break;}
            }
        }

        //Checking diagonal win
        if(gameBoard.getToken(0,0) === activeToken){
            if(gameBoard.getToken(1,1) === activeToken) {
                if(gameBoard.getToken(2,2) === activeToken) {
                    return (`${getActivePlayer().name}'s win`);
                }
            }
        }

        //Checking diagonal win
        if(gameBoard.getToken(2,0) === activeToken){
            if(gameBoard.getToken(1,1) === activeToken) {
                if(gameBoard.getToken(0,2) === activeToken) {
                    return (`${getActivePlayer().name}'s win`);
                }
            }
        }

    }

    const gameWinreset = (gameCheck) => {
        if(gameCheck === `${getActivePlayer().name}'s win`) {
            console.log(`${getActivePlayer().name}'s win`);
            if(getActivePlayer().name === players[0].name) {
                switchPlayerTurn();
            }
            gameBoard.initializeBoard();
        }
    }

    const playRound = (row,column) => {


        gameBoard.placeToken(row,column,getActivePlayer().token)


        const gameCheck = gameWin();
        gameWinreset(gameCheck);

        

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {playRound,getActivePlayer};
};

const game = gameController("P1","P2");
