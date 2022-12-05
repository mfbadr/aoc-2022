const input = require('./input');
const split = input.split(/\n/);


// '4-90,1-4'

function doesContain(pair) {
  // '4-90,1-4'

  const [first, second] = pair.split(',');
  const [firstStart, firstEnd] = first.split('-');
  const [secondStart, secondEnd] = second.split('-');
  
  if((parseInt(firstStart) <= parseInt(secondStart)) && (parseInt(firstEnd) >= parseInt(secondEnd))) {
    // console.log(`${first} contains ${second}`)
    return true
  }
  if((parseInt(firstStart) >= parseInt(secondStart)) && (parseInt(firstEnd) <= parseInt(secondEnd))){ 
    // console.log(`${second} contains ${first}`)
    return true
  }
  
  return false
}

let totalContains = 0;

// console.log(split.length)
split.forEach(pair => {
  if(
    doesContain(pair)
  ) {
    totalContains++
  }
  // console.log(totalContains)
});

console.log(`Total fully conatained is ${totalContains}`)


// part 2
let totalOverlaps = 0

function doesOverlap(pair) {
  // '4-90,1-4'

  const [first, second] = pair.split(',');
  const [firstStart, firstEnd] = first.split('-');
  const [secondStart, secondEnd] = second.split('-');
  
  if(
    ((parseInt(firstStart) < parseInt(secondStart)) && (parseInt(firstEnd) < parseInt(secondStart))) ||
    ((parseInt(secondStart) < parseInt(firstStart)) && (parseInt(secondEnd) < parseInt(firstStart)))
  ) {
    return false
  }
  
  return true
}


split.forEach(pair => {
  if(
    doesOverlap(pair)
  ) {
    totalOverlaps++
  }
  // console.log(totalContains)
});

console.log(`Total overlaps is ${totalOverlaps}`)