const Gameboard = (function () {
  const boardState = [null, null, null, null, null, null, null, null, null];

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

const newPlayer = (name, mark) => {
  return { name, mark };
};

const newGame = (player1, player2) => {
  drawBoard(Gameboard.boardState);
  const drawMark = (player, position) => {
    Gameboard.boardState[position - 1] = player.mark;
    drawBoard(Gameboard.boardState);
    if (checkForwin(player.mark)) {
      win(player);
    }
    if (!Gameboard.boardState.includes(null)) {
      draw();
    }
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
    console.log(`${player.name} has won the game!`);
  };

  const draw = () => {
    console.log("The game has ended in a draw.");
  };

  return {
    player1,
    player2,
    drawMark,
  };
};

const drawBoard = (boardState) => {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i] == null) {
      const div = document.createElement("div");
      div.innerText = "";
      container.appendChild(div);
    } else {
      const div = document.createElement("div");
      div.innerText = boardState[i];
      container.appendChild(div);
    }
  }
};
