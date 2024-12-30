let score = JSON.parse(localStorage.getItem("userScore")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let isAutoPlaying = false;
let intervalId;

document.querySelector('.auto-btn').addEventListener('click', () => {
  autoPlay()
})


function autoPlay() {
  if (!isAutoPlaying) {
    document.querySelector('.auto-btn').innerHTML = 'Stop'
    intervalId = setInterval(function () {
      const playerMove = generateComputerMove();
      playGame(playerMove);
    }, 1500);
    isAutoPlaying = true;

  } else {
    document.querySelector('.auto-btn').innerHTML = 'Auto Play'
    clearInterval(intervalId);
    isAutoPlaying = false
  }
}

document.querySelector('.btn1').addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.btn2').addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.btn3').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('rock')
  } else if(event.key === 'p') {
    playGame('paper')
  } else if(event.key === 's') {
    playGame('scissors')
  } else if(event.key === 'a') {
    autoPlay()
  } else if(event.key === 'Backspace') {
    confirmReset()
  }
})

function playGame(playerMove) {
  const computerMove = generateComputerMove();
  let resetScoreDisplay = document.getElementById("resetScoreDisplay");
  let resultDisplay = document.getElementById("resultDisplay");
  let resultMove = document.getElementById("resultMove");
  let scoreDisplay = document.getElementById("scoreDisplay");

  resetScoreDisplay.innerHTML = "";

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You lose";
    } else if (computerMove === "scissors") {
      result = "You win";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("userScore", JSON.stringify(score));

  resultDisplay.innerHTML = result;
  resultMove.innerHTML = `You <img src="img/${playerMove}-emoji.png" alt="${playerMove}" width="40px"> <img src="img/${computerMove}-emoji.png" alt="${computerMove}" width="40px"> Computer`;
  scoreDisplay.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

document.querySelector(".rstScore-btn").addEventListener('click', () => {
  confirmReset()
})

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  let resetScoreDisplay = document.getElementById("resetScoreDisplay");
  let scoreDisplay = document.getElementById("scoreDisplay");

  scoreDisplay.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
  resetScoreDisplay.innerHTML = "Resets score";
}

function generateComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function confirmReset() {
  const confirm = document.querySelector('.confirm-reset')
  confirm.innerHTML = `
  <p class="confirm">Are you sure?</p>
  <button class="yes">Yes</button>
  <button class="no">No</button>
  `
  document.querySelector('.yes').addEventListener('click', () => {
    resetScore()
    localStorage.removeItem('userScore')
    confirm.innerHTML = ''
  })
  document.querySelector('.no').addEventListener('click', () => {
    confirm.innerHTML = ''
  })
}

