'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// initialize
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;

// rolling dice
function roll() {
  const dice = Math.trunc(Math.random() * 6 + 1);
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice === 1) {
    // switch to another player
    document.getElementById(`current--${activePlayer}`).textContent = 0; 
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  } else {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
}
btnRoll.addEventListener('click', roll);
