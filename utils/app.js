"use strict";

let players = undefined;

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");
const winnerEl = document.querySelector(".player-winner");

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add("hidden");

  players = {
    playersScore: [0, 0],
    currentScore: 0,
    activePlayer: 0,
    winningScore: 20,
    isPlaying: true,
  };

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  winnerEl.style.display = "none";
};

const switchPlayer = function () {
  players.currentScore = 0;
  document.querySelector(`#current--${players.activePlayer}`).textContent =
    players.currentScore;
  players.activePlayer = players.activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRollEl.addEventListener("click", function () {
  if (players.isPlaying) {
    const diceRoll = Math.floor(Math.random() * 6 + 1);
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      players.currentScore += diceRoll;
      document.querySelector(`#current--${players.activePlayer}`).textContent =
        players.currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener("click", function () {
  if (players.isPlaying) {
    players.playersScore[players.activePlayer] += players.currentScore;

    document.querySelector(`#score--${players.activePlayer}`).textContent =
      players.playersScore[players.activePlayer];

    if (players.playersScore[players.activePlayer] >= players.winningScore) {
      document
        .querySelector(`.player--${players.activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${players.activePlayer}`)
        .classList.remove("player--active");

      players.isPlaying = false;
      diceEl.classList.add("hidden");
      winnerEl.style.display = "block";
      winnerEl.textContent = `Player ${players.activePlayer + 1} Won`;
    }

    switchPlayer();
  }
});

btnNewEl.addEventListener("click", init);

// Initializing the game
init();
