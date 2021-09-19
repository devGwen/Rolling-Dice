'use strict';

// querySelector and getElementById have same effect
//but getElementById is supposed to be a little bit faster than query
//Selecting elements
const player1El = document.querySelector('.player--1');
const player0El = document.querySelector('.player--0');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;

//Starung conditions
const init = function () {
  //JS will automatically convert them to strings and display on pages
  //Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;

  // add style to HTML by JS
  diceEl.classList.add('hidden');

  // This cannot be inside function because it will be set to 0 each time we clicked the button
  currentScore = 0;

  //score of player number1 will be at position 0; the score of player 2 will be at position 1
  scores = [0, 0];
  activePlayer = 0; // 0 or 1

  // game end or not
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();
//repeat this same code, so don't need parameter
const switchPlayer = function () {
  //Switch to next player. The original player's score set to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //if the player is 0, we want the player to be 1, else is will be 0.
  activePlayer = activePlayer === 0 ? 1 : 0; //swift 1 and 0

  //add the class if it is not in HTML file. Otherwise, if it it in HTML file, it will remove it
  //change background color
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    //use the source property .src to show photos
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      //player 0 first and show the cumulative number
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player'score
    //scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //remove the darker background color
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // If the game hasn't finished, then switch to the next player
      switchPlayer();
    }
  }
});

//reset all score
btnNew.addEventListener('click', init);
