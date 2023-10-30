/*

In this project I practiced with logical operators, loops, objects, storing and retrieving
data from local storage, changing information dynamically on webpage, retrieving and utilizing
user input, using JSON objects and methods
*/


const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const mPlayerText = document.querySelector("#mPlayerText");
const mComputerText = document.querySelector("#mComputerText");
const mResultText = document.querySelector("#mResultText");
const choiceBtns = document.querySelectorAll(".choiceBtn");
const mChoiceBtns = document.querySelectorAll(".mChoiceBtn")
const resetBtns = document.querySelectorAll(".resetBtn");
const mResetBtns = document.querySelectorAll(".mResetBtn");
const choices = {
  Rock: { winsAgainst: "Scissors", losesAgainst: "Paper" },
  Paper: { winsAgainst: "Rock", losesAgainst: "Scissors" },
  Scissors: { winsAgainst: "Paper", losesAgainst: "Rock" }
};
let player;
let computer;
let result;
let playerWager = 0

let score = JSON.parse(localStorage.getItem('score')) || {
    Wins : 0,
    Draws : 0,
    Losses : 0
  };

let mScore = JSON.parse(localStorage.getItem('mScore')) ||{
  mWins : 0,
  mLosses : 0,
  mDraws : 0,
  totalRunningSim : 0,
  totalPlayerPot : 0
};

choiceBtns.forEach(button => button.addEventListener("click", () => {

  player = button.textContent;
  computerTurn();
  playerText.textContent = `Player: ${player}`;
  computerText.textContent = `Computer: ${computer}`;
  resultText.textContent = checkWinner(player, computer, score);
  updateScore();
  localStorage.setItem('score',JSON.stringify(score))
}))

mChoiceBtns.forEach(button => button.addEventListener("click", () => {
  let numberOfSim;
  let playerWager;

  numberOfSim = prompt("How many games would you like to simulate? Keep it under 100,000");
  if (numberOfSim === null) return; // Exit if user presses ESC
  numberOfSim = Number(numberOfSim);

  playerWager = prompt("Would you like to make a wager? No higher than 50 dollars is allowed");
  if (playerWager === null) return; // Exit if user presses ESC
  playerWager = Number(playerWager);

  const wagerLimit = 50;
  const myLimit = 100000;

  if (!isNaN(playerWager) && playerWager <= wagerLimit) {
    if ((!isNaN(numberOfSim) && (numberOfSim < myLimit)) || numberOfSim === null) {
     player = button.textContent;
      mPlayerText.textContent = `Player: ${player}`;
      for (let i = 0; i < numberOfSim; i++) {
        computerTurn();
        mCheckWinner(player, computer, mScore, playerWager);
        mScore.totalRunningSim++;
        mUpdateScore();
        localStorage.setItem('mScore', JSON.stringify(mScore));
      }
      mComputerText.textContent = `Number Of Simulations So Far: ${mScore.totalRunningSim}`;

      // Update earnings color based on positive/negative value
      if (mScore.totalPlayerPot > 0) {
        mResultText.innerHTML = `Earnings: $<b>${mScore.totalPlayerPot}</b>`;
        mResultText.style.color = 'green';
      } else {
        tempPot = Math.abs(mScore.totalPlayerPot);
        mResultText.innerHTML = `Earnings: $<b>${tempPot}</b>`;
        mResultText.style.color = 'red';
      }
    } else {
      alert("Please enter a valid number of games within the limit.");
    }
  } else {
    alert("Please enter a valid wager amount within the limit.");
  }
}));

resetBtns.forEach(button => button.addEventListener("click", () => {
resetScore();
}));

mResetBtns.forEach(button => button.addEventListener("click", () => {
  mResetScore();
  }));


function computerTurn()
{
    const randNum = Math.floor(Math.random() * 3) + 1;

    switch(randNum)
    {
case 1:
  computer = "Rock";
  break;
case 2: 
  computer = "Paper";
  break;
case 3:
  computer = "Scissors";
  break;
    }
}

function checkWinner(player, computer, score) {
  if (player === computer) {
    score.Draws++;
    return "Draw!";
  } else if (choices[player].winsAgainst === computer) {
    score.Wins++;
    return "You Win!";
  } else {
    score.Losses++;
    return "You Lose";
  }
}
function mCheckWinner(player, computer, mScore, playerWager) {
  if (player === computer) {
    mScore.mDraws++;
    return "Draw!";
  } else if (choices[player].winsAgainst === computer) {
    mScore.mWins++;
    mScore.totalPlayerPot += playerWager;
    return "You Win!";
  } else {
    mScore.mLosses++;
    mScore.totalPlayerPot -= playerWager;
    return "You Lose";
  }
}
function mResetScore()
{

  mScore.mDraws = 0;
  mScore.mWins = 0;
  mScore.mLosses = 0;
  playerWager = 0
  mScore.totalPlayerPot = 0
  mScore.totalRunningSim = 0;
  mComputerText.textContent = `Number Of Simulations So Far: ${mScore.totalRunningSim}`;
  mResultText.textContent = (`Earnings:  $${mScore.totalPlayerPot}`);

  document.querySelector('.js-mScore')
  .innerHTML = `Total Wins: ${mScore.mWins}, Total Losses: ${mScore.mLosses}, Total Draws: ${mScore.mDraws}, Player Pot: $${mScore.totalPlayerPot} `;
}

function resetScore()
{

  score.Draws = 0;
  score.Wins = 0;
  score.Losses = 0;
  document.querySelector('.js-score')
    .innerHTML = `Total Wins: ${score.Wins}, Total Losses: ${score.Losses}, Total Draws: ${score.Draws}`;

  localStorage.removeItem('score');

}
function mUpdateScore()
{
  document.querySelector('.js-mScore')
  .innerHTML = `Total Wins: ${mScore.mWins}, Total Losses: ${mScore.mLosses}, Total Draws: ${mScore.mDraws}, Player Pot: $${mScore.totalPlayerPot} `;
  
}
function updateScore()
{

  console.log(document.querySelector('.js-score'));
  document.querySelector('.js-score').innerHTML = `Total Wins: ${score.Wins}, Total Losses: ${score.Losses}, Total Draws: ${score.Draws}`;
}
const playerChoice = document.getElementById('playerChoice');
const computerChoice = document.getElementById('computerChoice');
const playButton = document.querySelector('.choiceBtn');
