// Rock paper scissors Tournament

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

// The score for a single round is the score for the shape you selected 
//    (1 for Rock, 2 for Paper, and 3 for Scissors) plus 
// the score for the outcome of the round 
//    (0 if you lost, 3 if the round was a draw, and 6 if you won).
const input = require('./input');
const split = input.split(/\n/);

function getScoreFromGamePartTwo(game) {
  let score = 0;
  const them = game[0];
  const us = game[1];

  
  // what score do we add from the outcome
  switch (us) {
    case 'X':
      // lose
      if(them === 'A') {
        // they threw rock, we threw scissors
        score = score + 3
      }
      if(them === 'B') {
        // they threw paper, we threw rock
        score = score + 1
      }
      if(them === 'C') {
        // they threw scissors, we threw paper
        score = score + 2
      }
      break;
    case 'Y':
      // draw
      score = score + 3
      if(them === 'A') {
        // they threw rock, we threw rock
        score = score + 1
      }
      if(them === 'B') {
        // they threw paper, we threw paper
        score = score + 2
      }
      if(them === 'C') {
        // they threw scissors, we threw scissors
        score = score + 3
      }
      break;
    case 'Z':
        // win
        score = score + 6
        if(them === 'A') {
          // they threw rock, we threw paper
          score = score + 2
        }
        if(them === 'B') {
          // they threw paper, we threw scissors
          score = score + 3
        }
        if(them === 'C') {
          // they threw scissors, we threw rock
          score = score + 1
        }
      break;
    default: 
        console.log("OH SHIT")
  }

  return score;
}

// TEST CASE: Should log 12
// const sample = 
// `A Y
// B X
// C Z`
// const splitSample = sample.split(/\n/);

// const sampleTotal = splitSample.reduce((acc, curr) => {
//   return acc + getScoreFromGamePartTwo(curr.split(' '))
// }, 0)

// console.log(sampleTotal)
// END TEST CASE

const total = split.reduce((acc, curr, i) => {
  return acc + getScoreFromGamePartTwo(curr.split(' '))
}, 0)
console.log(total)
// 12526 - Gold star!
