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
    if (board[row][column].getValue === 0) return;
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
  let value = " ";

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
    {
      playerName: playerOneName,
      marker: "X",
    },
    {
      playerName: playerTwoName,
      marker: "O",
    },
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
    board.placeMarker(row, column, activePlayer.marker);

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();
  return { playRound, getActivePlayer };
}

const game = GameController();
