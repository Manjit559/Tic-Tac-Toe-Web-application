let boxes = document.getElementsByClassName("box");
let turn = "X";
let wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let isGameOver = false;
let turnCount = 0;
let isDarkMode = false;

// on page load
(function () {
  isDarkMode = !(localStorage.getItem("isDarkMode") === "true");
  toggleDarkMode();
})();

//function to switch turn
const changeTurn = () => {
  if (turn === "X") return "O";
  return "X";
};

const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");

  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[2]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[0]].innerText != ""
    ) {
      document.querySelector(".info").innerText =
        boxtexts[e[0]].innerHTML + " Won ! ";
      isGameOver = true;
      var i = 0;
      //animation of winner
      setInterval(() => {
        boxes[e[i]].style.backgroundColor = "rgb(174, 181, 249)";
        i++;
      }, 900);

      const start = () => {
        setTimeout(function () {
          confetti.start();
        }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
      };
      //  Stop
      const stop = () => {
        setTimeout(function () {
          confetti.stop();
        }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
      };
      start();
      stop();
    }
  });
};

Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxText.innerText === "") {
      boxText.innerText = turn;
      checkWin();
      console.log(turnCount);
      if (!isGameOver) {
        turn = changeTurn();
        console.log(turn);
        turnCount++;
        if (turnCount < 9) {
          document.querySelector(".info").innerText = "Turn for : " + turn;
          setTimeout(function () {
            computerTurn();
          }, 400);
        } else document.querySelector(".info").innerText = "Draw";
      } else turn = "";
    }
  });
});

const computerTurn = () => {
  let emptyCells = [];
  let random;
  let boxtexts = document.getElementsByClassName("boxtext");
  for (let i = 0; i < boxtexts.length; i++) {
    if (boxtexts[i].innerText === "") {
      emptyCells.push(i);
    }
  }
  let flag = 1;
  let block;
  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[0]].innerText != "" &&
      boxtexts[e[2]].innerText == ""
    ) {
      console.log("first", e[0], e[1]);
      block = e[2];
      flag = 0;
    }
    if (
      boxtexts[e[0]].innerText === boxtexts[e[2]].innerText &&
      boxtexts[e[0]].innerText != "" &&
      boxtexts[e[1]].innerText == ""
    ) {
      console.log("second");
      block = e[1];
      flag = 0;
    }
    if (
      boxtexts[e[2]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[1]].innerText != "" &&
      boxtexts[e[0]].innerText == ""
    ) {
      console.log("third");
      block = e[0];
      flag = 0;
    }
  });
  if (flag) {
    random = Math.ceil(Math.random() * emptyCells.length) - 1;
    boxtexts[emptyCells[random]].innerText = turn;
  } else {
    boxtexts[block].innerText = turn;
    console.log(boxtexts[block]);
  }
  checkWin();

  if (!isGameOver) {
    turn = changeTurn();
    turnCount++;
    if (turnCount < 9) {
      document.querySelector(".info").innerText = "Turn for : " + turn;
    } else document.querySelector(".info").innerText = "Draw";
  } else turn = "";
};

let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
  isGameOver = false;
  document.location.reload();
});

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  localStorage.setItem("isDarkMode", isDarkMode);

  if (isDarkMode) {
    document.body.className = "dark-mode";
    document.getElementById("toggleDarkModeBtn").innerText = "Light mode";
  } else {
    document.body.className = "light-mode";
    document.getElementById("toggleDarkModeBtn").innerText = "Dark mode";
  }
}
