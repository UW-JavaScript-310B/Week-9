const startButton = document.getElementById('startButton');
const icons = document.getElementById('icons');
const interface = document.getElementById('interface');
const results = document.getElementById('results');
const userForm = document.createElement('form');
const gamePlayRow = document.getElementById('gamePlay');
const startForm = document.getElementById('startForm');
const rules = document.getElementById('rules');

const iconSet = {
  rock: {
    id: 'rock',
    classes: ['fas', 'fa-hand-rock']
  },
  paper: {
    id: 'paper',
    classes: ['fas', 'fa-hand-paper']
  },
  scissor: {
    id: 'scissor',
    classes: ['fas', 'fa-hand-scissors']
  },
}

localStorage.setItem('computerScore', 0);
localStorage.setItem('playerScore', 0);

function gameReset() {
  startForm.style.display = 'block';
  rules.style.display = 'block';
  icons.style.display = 'block';
  interface.style.display = 'block';
  gamePlayLeft.innerHTML = '';
  gamePlayRight.innerHTML = '';
  results.innerHTML = '';
  localStorage.clear();
  localStorage.setItem('computerScore', 0);
  localStorage.setItem('playerScore', 0);
}

function gamePlay(e) {
  e.preventDefault();

  // Store name and number of rounds locally
  localStorage.setItem('firstName', firstName.value);
  const selectedRound = Array.from(document.getElementsByName('gameRounds')).filter(radio => radio.checked);
  localStorage.setItem('gameRounds', selectedRound[0].value);

  // Hide form and rules button
  startForm.style.display = 'none';
  rules.style.display = 'none';

  // Hide icons
  document.getElementById('results').innerText = '';

  icons.style.display = 'none';
  interface.style.display = 'none';
  
  let playerScoreDisplay = document.createElement('h4');
  playerScoreDisplay.innerText = `Score = ${localStorage.getItem('playerScore')}`;

  let computerScoreDisplay = document.createElement('h4');
  computerScoreDisplay.innerText = `Score = ${localStorage.getItem('computerScore')}`;

  // Add clickable icons to left play area (player)
  let gamePlayLeft = document.getElementById('gamePlayLeft');
  gamePlayLeft.innerHTML = '';
  gamePlayLeft.appendChild(playerScoreDisplay);
  addIcons(gamePlayLeft);

  let playerName = document.createElement('h5');
  playerName.innerText = localStorage.getItem('firstName');
  gamePlayLeft.appendChild(playerName);

  // Add visual icons to right play area (opponent)
  let gamePlayRight = document.getElementById('gamePlayRight');
  gamePlayRight.innerHTML = '';
  gamePlayRight.appendChild(computerScoreDisplay);
  addIcons(gamePlayRight);

  let opponentName = document.createElement('h5');
  opponentName.innerText = 'Computer';
  gamePlayRight.appendChild(opponentName);

  // Add click event listener to left game play div to catch bubbling clicks on icons
  gamePlayLeft.addEventListener('click', initiateComputer);
}

function initiateComputer(e) {
    // Manage user clicks and initiate call to rock paper scissors API
    if(e.target.classList.contains('fas')) {
      e.target.style.borderColor = 'red';
      gamePlayLeft.removeEventListener('click', initiateComputer);
      computerThinks(e.target.id);
    }
}

function computerThinks(playerChoice) {
  document.getElementById('gamePlayRight').querySelector('h5').innerText = 'Thinking';
  
  let counter = 0;
  let thinking = setInterval(() => {
    document.getElementById('gamePlayRight').querySelector('h5').innerText += '.';
    counter++;
    if(counter >= 5) { 
      clearInterval(thinking);
      computerChooses(playerChoice);
    }
  }, 500);
}

function computerChooses(playerChoice) {
  fetch(`https://rock-paper-scissor2.p.rapidapi.com/api/${playerChoice}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "rock-paper-scissor2.p.rapidapi.com",
      "x-rapidapi-key": "cnQ72noorzmsh02s3Fs3vtWTfKgFp1Z4j59jsnWAJadd9knCwY"
    }
  })
  .then(data => data.json())
  .then(response => {
    let side = document.getElementById('gamePlayRight');
    let choice = side.querySelector(`#${response.computer}`);
    choice.style.borderColor = 'red';
    outputResults(response);
  })
  .catch(err => {
    console.error(err);
  });
}

function outputResults(response) {
  const resultsText = document.createElement('h3');
  console.log(response);
  if(response.cstat === 'computer won') {
    resultsText.innerHTML = `${capitalize(response.computer)}<br>BEATS<br>${capitalize(response.you)}<br><hr>Computer<br>Wins<br><hr>`;
    localStorage.setItem('computerScore', +localStorage.getItem('computerScore') + 1)
  }
  else if (response.pstat === 'you won'){
    resultsText.innerHTML = `${capitalize(response.you)}<br>BEATS<br>${capitalize(response.computer)}<br><hr>${localStorage.getItem('firstName')}<br>Wins<br><hr>`;
    localStorage.setItem('playerScore', +localStorage.getItem('playerScore') + 1)
  }
  else {
    resultsText.innerText = `Draw`;
  }
  results.appendChild(resultsText);

  const roundsToWin = Math.ceil(localStorage.getItem('gameRounds') / 2);

  if(localStorage.getItem('playerScore') >= roundsToWin || localStorage.getItem('computerScore') >= roundsToWin ) {
    gameOver();
  }
  else {
    nextRound();
  }
}

function nextRound() {
  let resumeButton = document.createElement('button');
  resumeButton.innerText = `Begin next round`;
  resumeButton.classList.add('btn', 'btn-primary', 'btn-large');
  resumeButton.addEventListener('click', (e) => {
    resumeButton.remove();
    gamePlay(e);
  });
  results.appendChild(resumeButton);
}

function gameOver() {
  let newGameButton = document.createElement('button');
  newGameButton.innerText = `Play again`;
  newGameButton.classList.add('btn', 'btn-primary', 'btn-large');
  newGameButton.addEventListener('click', () => {
    newGameButton.remove();
    gameReset();
  });
  results.appendChild(newGameButton);
}

function addIcons(element) {
  let gamePlayDiv = document.createElement('div');
  gamePlayDiv.id = 'icons';
  gamePlayDiv.classList.add('col-12');

  for(const icon in iconSet) {
    let iconElement = document.createElement('i');
    iconSet[icon].classes.forEach(classToAdd => iconElement.classList.add(classToAdd));
    iconElement.id = iconSet[icon].id;
    gamePlayDiv.appendChild(iconElement);
  }

  element.appendChild(gamePlayDiv);
  gamePlayRow.style.display = 'flex';
}

startForm.addEventListener('submit', gamePlay);

// Helper functions

function setAttributes(element, attributes) {
  for(let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
