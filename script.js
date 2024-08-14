const gameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];


    for(i = 0; i < rows; i++) {
        board[i] = [];
        for(j = 0; j < columns; j++){
            board[i][j] = "X";
        }
    }
    
    const getBoard = () => board;

    const displayBoard = () => console.log(board);

    const placeToken = (row, column, player) => {
        board[row][column] = player;
    }

    const getToken = (row,column) => {
        return board[row][column];
    }

    return {displayBoard,placeToken,getBoard,getToken}
})();


