// Rock paper scissors Tournament

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

// The score for a single round is the score for the shape you selected 
//    (1 for Rock, 2 for Paper, and 3 for Scissors) plus 
// the score for the outcome of the round 
//    (0 if you lost, 3 if the round was a draw, and 6 if you won).
const input = require('./input');
const split = input.split(/\n/);

const throwValues = {
  A: 1,
  X: 1,
  B: 2,
  Y: 2,
  C: 3,
  Z: 3
}

function getScoreFromGame(game) {
  let score = 0;
  const them = game[0];
  const us = game[1];
  
  switch (us) {
    case 'X':
      score = score + 1;
      break;
      case 'Y':
      score = score + 2;
      break;
      case 'Z':
      score = score + 3;
      break;
  }

  let matchResult = throwValues[them] - throwValues[us];

  switch (matchResult) {
    case 0:
      // draw
      score = score + 3
      break;
    case 2:
    case -1:
      // win 6
      score = score + 6;
      break;
    default:
      break;
  }

  return score;
}

console.log(split[0].split(' '))
// console.log(Object.fromEntries(split[0]))
// console.log(split)

const total = split.reduce((acc, curr) => {
  return acc + getScoreFromGame(curr.split(' '))
}, 0)

console.log(total)
// 10994. It's correct!!

