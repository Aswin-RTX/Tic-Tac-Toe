let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");
let scoreText = document.getElementById("score");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let scoreX = parseInt(localStorage.getItem("scoreX")) || 0;
let scoreO = parseInt(localStorage.getItem("scoreO")) || 0;
updateScoreText();

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick() {
  let index = this.getAttribute("data-index");
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add("animate");

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    updateScore(currentPlayer);
    gameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winLines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let line of winLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
}

function updateScore(player) {
  if (player === "X") {
    scoreX++;
    localStorage.setItem("scoreX", scoreX);
  } else {
    scoreO++;
    localStorage.setItem("scoreO", scoreO);
  }
  updateScoreText();
}

function updateScoreText() {
  scoreText.textContent = `Score - X: ${scoreX} | O: ${scoreO}`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("animate");
  });
}

function resetScores() {
  scoreX = 0;
  scoreO = 0;
  localStorage.setItem("scoreX", 0);
  localStorage.setItem("scoreO", 0);
  updateScoreText();
}
