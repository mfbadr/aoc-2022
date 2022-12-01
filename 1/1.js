const input = require('./input')
const split = input.split(/\n/);

let sums = [0];
let sumIndex = 0;

split.forEach(element => {
  if(element === ''){
    sumIndex++;
    sums.push(0);
    return
  }

  sums[sumIndex] += parseInt(element);
});

//find elf carrying the most
sums.sort().reverse()
console.log(sums[0])
// Answer is: 67622! That's correct :D

//sum of top 3 elves is: 
const [first, second, third] = sums;

// could use reduce here
console.log(first + second +third)
