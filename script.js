'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const currentEl = document.querySelector('.current');

const rectangleElements = document.querySelector('.rectangle');
const point = document.querySelector('.points');
const btnChange = document.querySelector('.btn--change');
const bntHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnInfo = document.querySelector('.btn--info');
const info = document.querySelector('.instruction');
const btnCloseInstruction = document.querySelector('.close');
const overlay = document.querySelector('.overlay');

let score, currentScore, activePlayer, playing;
const hiddenPoints = function () {
  point.classList.add('hidden');
};
const visiblePoints = function () {
  point.classList.remove('hidden');
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  setTimeout(function () {
    rectangleElements.classList.add('hidden');
  }, 500);
  point.classList.add('hidden');
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const timeForPoints = function () {
  setTimeout(visiblePoints, 200);
  setTimeout(hiddenPoints, 700);
};

btnChange.addEventListener('click', function () {
  if (playing) {
    const rectangle = Math.trunc(Math.random() * 8 + 1);

    rectangleElements.classList.remove('hidden');
    rectangleElements.src = `Rectangle ${rectangle}.png`;
    //setTimeout(visiblePoints, 200);

    if (rectangle !== 1 && rectangle !== 8) {
      point.src = `+1.png`;
      timeForPoints();
      currentScore++;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (rectangle === 8 && currentScore !== 0) {
      timeForPoints();
      point.src = `-1.png`;
      currentScore--;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (rectangle === 8 && currentScore === 0) {
      timeForPoints();
      point.src = `0.png`;
      currentScore = 0;
    } else {
      switchPlayer();
    }
  }
});

bntHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    console.log(score);

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    rectangleElements.classList.add('hidden');

    if (score[activePlayer] >= 50) {
      rectangleElements.classList.add('hidden');
      document;
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      document
        .querySelector(`.current--${activePlayer}`)
        .classList.add('hidden');

      btnInfo.classList.add('hidden');
      btnChange.classList.add('hidden');
      bntHold.classList.add('hidden');
      btnNew.style.top = '27rem';
      overlay.classList.remove('hidden');
      document
        .querySelector(`.winner--${activePlayer}`)
        .classList.remove('hidden');
    } else {
      hiddenPoints();
      switchPlayer();
    }
  }
});

const newGame = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  rectangleElements.classList.add('hidden');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  playing = true;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  current0.textContent = 0;
  current1.textContent = 0;
  document.querySelector(`.current--0`).classList.remove('hidden');
  document.querySelector(`.current--1`).classList.remove('hidden');

  btnInfo.classList.remove('hidden');
  btnChange.classList.remove('hidden');
  bntHold.classList.remove('hidden');
  btnNew.style.top = '4rem';
  overlay.classList.add('hidden');

  document.querySelector(`.winner--0`).classList.add('hidden');
  document.querySelector(`.winner--1`).classList.add('hidden');

  hiddenPoints();
};

const closeInstruction = function () {
  info.classList.add('hidden');
  overlay.classList.add('hidden');
  btnNew.style.top = '4rem';
};

btnNew.addEventListener('click', function () {
  setTimeout(newGame, 400);
});

btnInfo.addEventListener('click', function () {
  info.classList.remove('hidden');
  overlay.classList.remove('hidden');
  btnNew.style.top = '27rem';
});

btnCloseInstruction.addEventListener('click', function () {
  closeInstruction();
});
overlay.addEventListener('click', function () {
  closeInstruction();
});
