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
        checkDraw();
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
      const win = checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin();
  
      if (win) {
        printNewRound();
        board = GameBoard();
        activePlayer.score++;
  
        console.log(`${activePlayer.playerName} Wins!`);
        console.log(`${players[0].score} - ${players[1].score}`);
      }
    };
  
    const checkDraw = () => {
      const draw = board.getBoard().every((row) => row.every((cell) => cell.getValue() !== 0));
  
      if(draw){
        printNewRound();
        board = GameBoard();
        console.log(`Draw!`);
        console.log(`${players[0].score} - ${players[1].score}`);
      }
    }
  
    printNewRound();
    return { 
      playRound, 
      getActivePlayer,
      getPlayerScores,
      getBoard: board.getBoard 
    };
  }
  
  function Player(playerName, marker, score = 0) {
    return { playerName, marker, score };
  }
  
  function ScreenController(){
    const game = GameController();
    const boardContainerDiv = document.querySelector(".board-container");
    const playerTurnDiv = document.querySelector(".player-turn");
    
    const playerOneSvg = `<svg class="player-one-icon" width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`;
    const playerTwoSvg = `<svg class="player-two-icon" width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" /></svg>`;

    const updateScreen = () => {
      boardContainerDiv.textContent = "";
      const board = game.getBoard();
  
      for(let row = 0; row < board.length; row++){
        for(let cell = 0; cell < board[row].length; cell++){
          const cellDiv = document.createElement("div");
          cellDiv.classList.add("cell");

          cellValue = board[row][cell].getValue();
          if(cellValue === "X"){
            cellDiv.innerHTML = playerOneSvg;
          }
          else if (cellValue === "O"){
            cellDiv.innerHTML = playerTwoSvg;
          }

  
          cellDiv.dataset.index = `${row}${cell}`;
          boardContainerDiv.appendChild(cellDiv);
        }
      }
    }
    
    function clickHandlerBoard(e) {
      const index = e.target.dataset.index;
  
      // Ensure the clicked element has a data-index attribute
      if (!index) {
        console.warn("Clicked element is not a cell");
        return;
      }
  
      // Extract row and column from the data-index string
      const row = parseInt(index[0]);
      const col = parseInt(index[1]);
  
      // Validate row and col values
      
  
      // Play the round and update the screen
      game.playRound(row, col);
      updateScreen();
    }

    boardContainerDiv.addEventListener("click", clickHandlerBoard);
    
    updateScreen();
  }
  
  ScreenController();
