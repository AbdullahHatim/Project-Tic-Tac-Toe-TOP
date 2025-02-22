// Focus on Console Version First
// PlaceMarker, Populate Board with cells, getBoard
function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  const getBoard = () => board;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const placeMarker = (row, column, marker) => {
    if (board[row][column].getValue() !== 0) return -1;
    board[row][column].setMarker(marker);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, placeMarker, printBoard };
}

function Cell() {
  let value = 0;

  const setMarker = (marker) => {
    value = marker;
  };

  const getValue = () => value;

  return { setMarker, getValue };
}

// GameController to handle players and turns
function GameController() {
  let playerOneName = "Player One";
  let playerTwoName = "Player Two";
  let board = GameBoard();

  const players = [
    Player(playerOneName, "X", 0),
    Player(playerTwoName, "O", 0),
  ];
  const getPlayerScores = () => players.map((player) => {
    return {playerName: player.playerName, score: player.score}
  });
  
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    board.printBoard();
    console.log(`${activePlayer.playerName}'s turn..`);
  };

  const playRound = (row, column) => {
    if (board.placeMarker(row, column, activePlayer.marker) !== -1) {
      checkWin();
      switchPlayerTurn();
    }
    printNewRound();
  };

  const checkHorizontalWin = () => {
    for (row of board.getBoard()) {
      if (row.every((cell) => cell.getValue() !== 0 && cell.getValue() === row[0].getValue())) return true;
    }
    return false;
  };

  const checkVerticalWin = () => {
    const transposedBoard = board.getBoard()[0].map((_, col) => board.getBoard().map((row) => row[col]));
    for (column of transposedBoard) {
      if (column.every((cell) => cell.getValue() !== 0 && cell.getValue() === column[0].getValue())) return true;
    }
    return false;
  };
  const checkDiagonalWin = () => {
    
    // 0,0 1,1 2,2
    const diagonalArray = [];
    for (let i = 0; i < board.getBoard().length; i++)
      diagonalArray.push(board.getBoard()[i][i]);

    let firstCellValue = board.getBoard()[0][0].getValue();
    if (diagonalArray.every((cell) => (cell.getValue() === firstCellValue) && firstCellValue !== 0)) return true;
    

    const rotatedBoard = board.getBoard().slice().reverse();

    diagonalArray.length = 0;
    for (let i = 0; i < rotatedBoard.length; i++)
      diagonalArray.push(rotatedBoard[i][i]);

    firstCellValue = rotatedBoard[0][0].getValue();
    if (diagonalArray.every((cell) => (cell.getValue() === firstCellValue) && firstCellValue !== 0)) return true;

  };

  const checkWin = () => {
    let win = checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin();

    if (win) {
      printNewRound();
      board = GameBoard();
      activePlayer.score++;

      console.log(`${activePlayer.playerName} Wins!`);
      console.log(`${players[0].score} - ${players[1].score}`);
    }
  };

  printNewRound();
  return { playRound, getActivePlayer, getPlayerScores };
}

function Player(playerName, marker, score = 0) {
  return { playerName, marker, score };
}

const game = GameController();
