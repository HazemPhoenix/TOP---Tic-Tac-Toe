const emptyBoard = () => {
  return new Array(9).fill(null);
};

const start = document.querySelector("#startBtn");

start.addEventListener("click", (event) => {
  event.preventDefault();
  const player1Name = document.querySelector(".player1Name");
  const player2Name = document.querySelector(".player2Name");
  newGame(newPlayer(player1Name.value, "x"), newPlayer(player2Name.value, "o"));
});

const Gameboard = (function () {
  const boardState = emptyBoard();

  const winningPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  return {
    boardState,
    winningPositions,
  };
})();

const drawBoard = () => {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let i = 0; i < Gameboard.boardState.length; i++) {
    const div = document.createElement("div");
    div.addEventListener("click", () => {
      alert("Please choose the names of the players first.");
    });
    container.appendChild(div);
  }
};

const newPlayer = (name, mark) => {
  return { name, mark };
};

addEventListener("load", () => {
  drawBoard();
});

const newGame = (player1, player2) => {
  let currentTurn = player1;
  const updateBoard = (boardState) => {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    for (let i = 0; i < boardState.length; i++) {
      const div = document.createElement("div");
      div.addEventListener("click", () => {
        if (Gameboard.boardState[i]) {
          alert("Position already taken!");
          return;
        }
        drawMark(currentTurn, i + 1);
        if (currentTurn == player1) currentTurn = player2;
        else currentTurn = player1;
      });
      if (!boardState[i]) {
        div.innerText = "";
      } else {
        div.innerText = boardState[i];
      }
      container.appendChild(div);
    }
  };
  for (let i = 1; i <= 9; i++) {
    if (i % 2 != 0) {
      currentTurn = player1;
    } else {
      currentTurn = player2;
    }
    updateBoard(Gameboard.boardState);
  }

  updateBoard(Gameboard.boardState);
  const drawMark = (player, position) => {
    Gameboard.boardState[position - 1] = player.mark;
    updateBoard(Gameboard.boardState);
    setTimeout(() => {
      if (checkForwin(player.mark)) {
        win(player);
      }
      if (!Gameboard.boardState.includes(null)) {
        draw();
      }
    }, 100);
  };

  const checkForwin = (mark) => {
    const sameMarkPositions = [];
    for (let i = 0; i < Gameboard.boardState.length; i++) {
      if (Gameboard.boardState[i] === mark) {
        sameMarkPositions.push(i + 1);
      }
    }

    for (let i = 0; i < Gameboard.winningPositions.length; i++) {
      if (
        Gameboard.winningPositions[i].every((el) =>
          sameMarkPositions.includes(el)
        )
      )
        return true;
    }
    return false;
  };

  const win = (player) => {
    alert(`${player.name} has won the game!`);
    clearBoard();
  };

  const draw = () => {
    alert("The game has ended in a draw.");
    clearBoard();
  };

  const clearBoard = () => {
    Gameboard.boardState = emptyBoard();
  };

  return {
    player1,
    player2,
  };
};
