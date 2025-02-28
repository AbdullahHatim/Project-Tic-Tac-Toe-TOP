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
    let win = false;
    let draw = false;
    let winner;
  
    const players = [
      Player(playerOneName, "X", 0, 0),
      Player(playerTwoName, "O", 0, 1),
    ];
    
    const updatePlayerName = (playerIndex, newName) => {
      players[playerIndex].playerName = newName || (playerIndex === 0 ? "Player One" : "Player Two");
    };
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
      win = checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin();
  
      if (win) {
        winner = activePlayer
        activePlayer.score++;
        console.log(`${activePlayer.playerName} Wins!`);
        console.log(`${players[0].score} - ${players[1].score}`);
      }
    };
  
    const checkDraw = () => {
      draw = board.getBoard().every((row) => row.every((cell) => cell.getValue() !== 0));
  
      if(draw){
      }
    }
    
    const getBoard = () => {
      return board.getBoard();
    }

    const resetBoard = () => {
      board = GameBoard();
    }

    const getWinAndDraw = () => {
      return { win, draw };
    }

    const resetWinAndDraw = () => {
      win = false;
      draw = false;
    }

    const getWinner = () => winner;
    printNewRound();
    const resetScores = () => {
      players[0].score = 0;
      players[1].score = 0;
    };

    return { 
      playRound, 
      getActivePlayer,
      getPlayerScores,
      getBoard,
      resetBoard,
      getWinAndDraw,
      resetWinAndDraw,
      getWinner,
      updatePlayerName,
      resetScores
    };
  }
  
  function Player(playerName, marker, score = 0, index = 0) {
    return { playerName, marker, score, index};
  }


function ScreenController(){
    const game = GameController();
    const gameContainer = document.querySelector(".container");
    const boardContainerDiv = document.querySelector(".board-container");
    const playerTurnDiv = document.querySelector(".player-turn");
    const playerScoreDiv = document.querySelector(".player-score");
    const playerOneMarker = document.querySelector(".player-one-marker");
    const playerTwoMarker = document.querySelector(".player-two-marker");
    //Form Controls
    const settingsIcon = document.querySelector(".settings-icon");
    const settingsOverlay = document.getElementById("settingsOverlay");
    const saveSettingsBtn = document.getElementById("saveSettings");
    const resetGameBtn = document.getElementById("resetGame");
    const closeSettingsBtn = document.getElementById("closeSettings");
    const playerOneNameInput = document.getElementById("playerOneName");
    const playerTwoNameInput = document.getElementById("playerTwoName");
    
    const playerOneSvg = `<svg class="player-one-icon" width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`;
    const playerTwoSvg = `<svg class="player-two-icon" width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" /></svg>`;

    const updateScreen = () => {
      setTimeout(setContainerBackground,0);
      setTimeout(highlightActivePlayer,0);
      setTimeout(setPlayerTurnDiv,0);
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

    const clearBoard = () => {
      game.resetBoard()
      setTimeout(() => 
        {gameContainer.style["background-color"] = "white"; 
        }, 0);
      updateScreen();
    }

    function clickHandlerBoard(e) {
      if ( game.getWinAndDraw().win || game.getWinAndDraw().draw ){
        clearBoard();
        game.resetWinAndDraw();
      }
      else
      placeMarker(e);
    }

    const setContainerBackground = () => {
      if (game.getWinAndDraw().win) {
        if(!game.getWinner().index){
          gameContainer.style["background-color"] = "var(--player-one-marker-color)";
        } else {
          gameContainer.style["background-color"] = "var(--player-two-marker-color)";
        }
      } else if (game.getWinAndDraw().draw){
        gameContainer.style["background-color"] = 
        "color-mix(in srgb, var(--player-one-marker-color) 50%, var(--player-two-marker-color) 50%)";
      }
    }

    const highlightActivePlayer = () => {
      
      if (!game.getWinAndDraw().win && !game.getWinAndDraw().draw){
        if (!game.getActivePlayer().index){
        playerTurnDiv.style["background-color"] = "var(--player-one-marker-color)";
      } else {
        playerTurnDiv.style["background-color"] = "var(--player-two-color)";
      }
    } else {
      playerTwoMarker.classList.remove("animation");
      playerOneMarker.classList.remove("animation");
    }
    }

    const setPlayerTurnDiv = () => {
      if (game.getWinAndDraw().win){
        playerTurnDiv.textContent = `${game.getWinner().playerName} WINS!`;
        playerTurnDiv.style["background-color"] = "";
      } else if (game.getWinAndDraw().draw){
          playerTurnDiv.style["background-color"] = "";
          playerTurnDiv.textContent = `DRAW!`;  
        } else {
          playerTurnDiv.textContent = `${game.getActivePlayer().playerName}'s Turn`;
        }
        setPlayerScoreDiv()
    }

    const setPlayerScoreDiv = () => {
        playerScoreDiv.textContent = 
        `${game.getPlayerScores()[0].score} - ${game.getPlayerScores()[1].score}`;
        
        
    }

    //From Here the Author is AI
    const placeMarker = (e) => {
      const index = e.target.dataset.index;
      if (!index) {
        console.warn("Clicked element is not a cell");
        return;
      }

      game.playRound(parseInt(index[0]), parseInt(index[1]));
      updateScreen();
    }
    // Settings form event handlers
    settingsIcon.addEventListener("click", () => {
      // Show the settings overlay
      settingsOverlay.style.display = "flex";
      
      // Populate inputs with current player names
      playerOneNameInput.value = game.getPlayerScores()[0].playerName;
      playerTwoNameInput.value = game.getPlayerScores()[1].playerName;
    });
    
    closeSettingsBtn.addEventListener("click", () => {
      // Hide the settings overlay
      settingsOverlay.style.display = "none";
    });
    
    saveSettingsBtn.addEventListener("click", () => {
      // Update player names in the game controller using the updatePlayerName function
      game.updatePlayerName(0, playerOneNameInput.value);
      game.updatePlayerName(1, playerTwoNameInput.value);
      
      // Update the display
      updateScreen();
      
      // Hide the settings overlay
      settingsOverlay.style.display = "none";
    });
    
    resetGameBtn.addEventListener("click", () => {
      // Reset the board
      game.resetBoard();
      game.resetWinAndDraw();
      
      // Reset scores using the dedicated method
      game.resetScores();
      
      // Update the display
      updateScreen();
      
      // Hide the settings overlay
      gameContainer.style["background-color"] = "";
      settingsOverlay.style.display = "none";
    });
    
    boardContainerDiv.addEventListener("click", clickHandlerBoard);
    
    updateScreen();
  }
  
  ScreenController();
