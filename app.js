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
  let value = 0;

  const setMarker = (marker) => {
    value = marker;
  };

  const getValue = () => value;

  return { setMarker, getValue };
}
