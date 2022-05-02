const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
window.onload = function () {
  var reload = localStorage.getItem('reload');
  if (reload) {
    localStorage.removeItem('reload');
    document.querySelector('.highscore').textContent =
      localStorage.getItem('highScore');
  }
};
document.querySelector('.guess').addEventListener('keypress', function (event) {
  console.log(event);
  if (event.key === 'Enter') {
    guess();
  }
});
document.querySelector('.check').addEventListener('click', function () {
  guess();
});

const contentText = text =>
  (document.querySelector('.message').textContent = text);

const scoreText = () => {
  document.querySelector('.score').textContent = score;
};

const guess = () => {
  const guess = Number(document.querySelector('.guess').value);

  if (guess > 20) {
    contentText('Between 1 and 20');
    return;
  }
  console.log(typeof guess);

  if (!guess) {
    contentText('⛔ No number!');
  } else if (guess === secretNumber && score >= 1) {
    contentText('🎉 Correct number!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;

      document.querySelector('.highscore').textContent = highScore;
      localStorage.setItem('highScore', highScore);
    }
  } else if (guess < secretNumber && score >= 1) {
    contentText('📉 Too low...');
    score = score - 1;
    scoreText();
  } else if (score >= 1) {
    contentText('📈 Too high...');
    score = score - 1;
    scoreText();
  } else {
    contentText('😢 You lost the game');
  }
};
// document.querySelector('.again').addEventListener('click', function () {
//   document.querySelector('body').style.backgroundColor = '#222';
//   document.querySelector('.message').textContent = 'Start guessing...';
//   document.querySelector('.number').style.width = '15rem';
//   document.querySelector('.number').textContent = '?';
//   document.querySelector('.guess').value = '';

//   document.querySelector('.score').textContent = '20';
// });

document.querySelector('.again').addEventListener('click', function () {
  localStorage.setItem('reload', true);
  document.location.reload();
});
