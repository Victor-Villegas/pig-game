'use strict';

const diceImage = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdScore = document.querySelector('.btn--hold');

const playerVar = {
  totalP1: document.querySelector('#score--0'),
  totalP2: document.querySelector('#score--1'),
  scoreP1: document.querySelector('#current--0'),
  scoreP2: document.querySelector('#current--1'),
  playerP1: document.querySelector('.player--0'),
  playerP2: document.querySelector('.player--1')
};

let playerTurn = 1;

const changePlayer = function () {
  playerVar[`scoreP${playerTurn}`].textContent = 0;
  playerVar[`playerP${playerTurn}`].classList.remove('player--active');

  playerTurn = playerTurn === 1 ? 2 : 1;
  playerVar[`playerP${playerTurn}`].classList.add('player--active');
};

rollDice.addEventListener('click', function () {
  const randNum = Math.ceil(Math.random() * 6);

  if (randNum === 1) return changePlayer();

  playerVar[`scoreP${playerTurn}`].textContent -= -randNum;
  diceImage.src = `dice-${randNum}.png`;
});

holdScore.addEventListener('click', function () {
  playerVar[`totalP${playerTurn}`].textContent -= -playerVar[`scoreP${playerTurn}`].textContent;

  if (playerVar[`totalP${playerTurn}`].textContent >= 100) {
    rollDice.classList.add('hidde');
    holdScore.classList.add('hidde');
    playerVar[`scoreP${playerTurn}`].textContent = 0;
    playerVar[`totalP${playerTurn}`].style.color = '#3670c7';
    return;
  }
  changePlayer();
});

newGame.addEventListener('click', function () {
  if (rollDice.classList.contains('hidde')) rollDice.classList.remove('hidde');
  if (holdScore.classList.contains('hidde')) holdScore.classList.remove('hidde');
  diceImage.src = 'dice-1.png';

  for (let i = 2; i >= 1; i--) {
    playerVar[`scoreP${i}`].textContent = 0;
    playerVar[`totalP${i}`].textContent = 0;
    playerVar[`playerP${i}`].classList.remove('player--active');
    playerVar[`totalP${playerTurn}`].style.color = '#c7365f';
  }

  playerTurn = 1;
  playerVar[`playerP${playerTurn}`].classList.add('player--active');
});
