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
let player;
let computer;
let result;

let playerWager = 0

let score = JSON.parse(localStorage.getItem('score')) || {
    Wins : 0,
    Draws : 0,
    Losses : 0
  };
/*
if (!score){
  score = {
    Wins : 0,
    Draws : 0,
    Losses : 0
  }
}
*/

let mScore = JSON.parse(localStorage.getItem('mScore')) ||{
  mWins : 0,
  mLosses : 0,
  mDraws : 0,
  totalRunningSim : 0,
  totalPlayerPot : 0
};
/*
if (!mScore){
  mScore = {
    mWins : 0,
    mLosses : 0,
    mDraws : 0,
    totalRunningSim : 0,
    totalPlayerPot : 0
  }
}
*/
choiceBtns.forEach(button => button.addEventListener("click", () => {

  player = button.textContent;
  computerTurn();
  playerText.textContent = `Player: ${player}`;
  computerText.textContent = `Computer: ${computer}`;
  resultText.textContent = checkWinner();
  updateScore();
  localStorage.setItem('score',JSON.stringify(score))
}))

mChoiceBtns.forEach(button => button.addEventListener("click", () => {

  numberOfSim = prompt("How many games would you like to simulate? keep it under 100,000");
  numberOfSim = parseInt(numberOfSim);
  playerWager = prompt("Would you like to make a wager? No higher than 50 dollars is allowed");
  playerWager = parseInt(playerWager);
  const wagerLimit = 50;
  const myLimit = 100000
  if (isNaN(playerWager) != true && playerWager <= wagerLimit)
  {
    if (isNaN(numberOfSim) != true && (numberOfSim < myLimit) || numberOfSim === null) 
    {;
      player = button.textContent;
      mPlayerText.textContent = `Player: ${player}`;
      for (let i = 0; i < numberOfSim; i++)
      {
        computerTurn();
        mCheckWinner();
        mScore.totalRunningSim++;
        mUpdateScore();
        localStorage.setItem('mScore',JSON.stringify(mScore))
      }
      mComputerText.textContent = `Number Of Simulations So Far: ${mScore.totalRunningSim}`;
      if (mScore.totalPlayerPot > 0)
      {
        mResultText.textContent = `You won $${mScore.totalPlayerPot}`
      }
      else{
        tempPot = mScore.totalPlayerPot * -1
        mResultText.textContent = `You lost $${tempPot}`
      }
      mResultText.textContent = (`Earnings:  $${mScore.totalPlayerPot}`);
    }
    else{
      
      alert("you did not enter a proper number; shame on you");
    }
  }
  else{

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

function checkWinner()
{
  if (player == "Paper" & computer == "Paper")
    {
        score.Draws++;
        let tempString = "Draw!"
        return tempString;
    }
    else if (player == "Paper" & computer == "Rock")
    {
      score.Wins++;
      let tempString = "You Win!";
      return tempString;
    }
    else if (player == "Paper" & computer == "Scissors")
    {
      score.Losses++
        let tempString = "You Lose";
        return tempString;
    }

    if(player == "Rock" & computer == "Paper")
    {
      score.Losses++
      let tempString = "You Lose";
      return tempString;
    }
    else if(player == "Rock" & computer == "Rock")
    {
      score.Draws++
      let tempString = "Draw!"
      return tempString;
    }
    else if(player == "Rock" & computer == "Scissors")
    {
      score.Wins++
      let tempString = "You Win!";
      return tempString;
    }

    if(player == "Scissors" & computer == "Paper")
    {
      score.Wins++
      let tempString = "You Win!";
      return tempString;
    }
    else if(player == "Scissors" & computer == "Scissors")
    {
      score.Draws++
      let tempString = "Draw!"
      return tempString;
    }
    else if(player == "Scissors" & computer == "Rock")
    {
      score.Losses++;
      let tempString = "You Lose";
      return tempString;
    }
}
function mCheckWinner()
{
  if (player == "Paper" & computer == "Paper")
    {
      mScore.mDraws++
        let tempString = "Draw!"
        return tempString;
    }
    else if (player == "Paper" & computer == "Rock")
    {
      mScore.mWins++
      let tempString = "You Win!";
      mScore.totalPlayerPot += playerWager;
      return tempString;
    }
    else if (player == "Paper" & computer == "Scissors")
    {
      mScore.mLosses++;
        let tempString = "You Lose";
        mScore.totalPlayerPot -= playerWager;
        return tempString;
    }

    if(player == "Rock" & computer == "Paper")
    {
      mScore.mLosses++;
      let tempString = "You Lose";
      mScore.totalPlayerPot -= playerWager;
      return tempString;
    }
    else if(player == "Rock" & computer == "Rock")
    {
      mScore.mDraws++
      let tempString = "Draw!"
      return tempString;
    }
    else if(player == "Rock" & computer == "Scissors")
    {
      mScore.mWins++
      let tempString = "You Win!";
      mScore.totalPlayerPot += playerWager;
      return tempString;
    }

    if(player == "Scissors" & computer == "Paper")
    {
      mScore.mWins++
      let tempString = "You Win!";
      mScore.totalPlayerPot += playerWager;
      return tempString;
    }
    else if(player == "Scissors" & computer == "Scissors")
    {
      mScore.mDraws++
      let tempString = "Draw!"
      return tempString;
    }
    else if(player == "Scissors" & computer == "Rock")
    {
      mScore.mLosses++;
      let tempString = "You Lose";
      mScore.totalPlayerPot -= playerWager;
      return tempString;
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
/*
  let ele= document.getElementById("mDrawCount");
  ele.innerText = `Total Draws: ${mScore.mDraws}`;
  let ele2= document.getElementById("mLossCount");
  ele2.innerText = `Total Losses: ${mScore.mLosses}`;
  let ele3= document.getElementById("mWinCount");
  ele3.innerText = `Total Wins: ${mScore.mWins}`;
  let ele4= document.getElementById("mHighestOutcome");
  ele4.innerText = "Player Pot: $0";
  localStorage.removeItem('mScore');
}*/
function resetScore()
{

  score.Draws = 0;
  score.Wins = 0;
  score.Losses = 0;
  document.querySelector('.js-score')
    .innerHTML = `Total Wins: ${score.Wins}, Total Losses: ${score.Losses}, Total Draws: ${score.Draws}`;

  localStorage.removeItem('score');
/*
  let ele= document.getElementById("drawCount");
  ele.innerText = `Total Draws: ${score.Draws}`;
  let ele2= document.getElementById("lossCount");
  ele2.innerText = `Total Losses: ${score.Losses}`;
  let ele3= document.getElementById("winCount");
  ele3.innerText = `Total Wins: ${score.Wins}`;
  */
}
function mUpdateScore()
{
  document.querySelector('.js-mScore')
  .innerHTML = `Total Wins: ${mScore.mWins}, Total Losses: ${mScore.mLosses}, Total Draws: ${mScore.mDraws}, Player Pot: $${mScore.totalPlayerPot} `;
  
}
function updateScore()
{
/*
  let ele= document.getElementById("drawCount");
  ele.innerText = `Total Draws: ${score.Draws}`;
  let ele2= document.getElementById("lossCount");
  ele2.innerText = `Total Losses: ${score.Losses}`;
  let ele3= document.getElementById("winCount");
  ele3.innerText = `Total Wins: ${score.Wins}`;
  */
  console.log(document.querySelector('.js-score'));
  document.querySelector('.js-score').innerHTML = `Total Wins: ${score.Wins}, Total Losses: ${score.Losses}, Total Draws: ${score.Draws}`;
}