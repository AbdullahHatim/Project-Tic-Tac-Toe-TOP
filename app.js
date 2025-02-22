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
    return !!board
      .getBoard()
      .find((row) =>
        row.every(
          (cell) =>
            cell.getValue() === row[0].getValue() && cell.getValue() !== 0
        )
      );
  };
  const checkVerticalWin = () => {};
  const checkDiagonalWin = () => {};

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
  return { playRound, getActivePlayer };
}

function Player(playerName, marker, score = 0) {
  return { playerName, marker, score };
}

const game = GameController();
