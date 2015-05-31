var Display = function(displayElement) {
  var display = displayElement;
  function setText(message) {
    display.innerText = message;
  }

  return {setMessage: setText};
};

function isValid(btn) {
  return btn.innerText.length === 0;
}

function checkScore(btn, squares) {
  console.log("click");
  console.log(btn);
  console.log(squares);
}

function setMark(btn, players, currentTurn) {
  btn.innerText = players[currentTurn];
}

function checkForWinner(squares, players, currentTurn) {
  if (squares[0].innerText == players[currentTurn] &&
      squares[1].innerText == players[currentTurn] &&
      squares[2].innerText == players[currentTurn])
    return true;

  if (squares[3].innerText == players[currentTurn] &&
      squares[4].innerText == players[currentTurn] &&
      squares[5].innerText == players[currentTurn])
    return true;

  if (squares[6].innerText == players[currentTurn] &&
      squares[7].innerText == players[currentTurn] &&
      squares[8].innerText == players[currentTurn])
    return true;

  if (squares[0].innerText == players[currentTurn] &&
      squares[3].innerText == players[currentTurn] &&
      squares[6].innerText == players[currentTurn])
    return true;

  if (squares[1].innerText == players[currentTurn] &&
      squares[4].innerText == players[currentTurn] &&
      squares[7].innerText == players[currentTurn])
    return true;

  if (squares[2].innerText == players[currentTurn] &&
      squares[5].innerText == players[currentTurn] &&
      squares[8].innerText == players[currentTurn])
    return true;

  if (squares[0].innerText == players[currentTurn] &&
      squares[4].innerText == players[currentTurn] &&
      squares[8].innerText == players[currentTurn])
    return true;

  if (squares[2].innerText == players[currentTurn] &&
      squares[4].innerText == players[currentTurn] &&
      squares[6].innerText == players[currentTurn])
    return true;

  return false;
}

function isFullBoard(squares) {
  for (var i = 0, len = squares.length; i < len; i++)
    if (squares[i].innerText.length === 0)
      return false;

  return true;
}

function isDraw(squares) {
  return (!checkForWinner(squares, ["X"], 0)) && isFullBoard(squares);
}

function main() {
  var squares = document.querySelectorAll("#game button");
  var players = ["X", "O"];
  var currentTurn = 0;
  var isGameOver = false;
  var display = new Display(document.querySelector("#gameDisplay"));

  display.setMessage("Player 'X' begins");

  for (var i = 0, len = squares.length; i < len; i++)
    squares[i].addEventListener("click", function(){
      if (isGameOver)
        return;

      if (!isValid(this)) {
        display.setMessage("Invalid move");
      } else {
        setMark(this, players, currentTurn);

        isGameOver = checkForWinner(squares, players, currentTurn);
        if (isGameOver) {
          display.setMessage("Player '" + players[currentTurn] + "' WINS!");
          return;
        }

        if (isDraw(squares)) {
          display.setMessage("DRAW!");
          return;
        }

        currentTurn += 1;
        currentTurn %= 2;

        display.setMessage("Player '" + players[currentTurn] + "' to move");
      }

    });
}

(function(){ main();})();