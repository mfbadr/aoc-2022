const input = require('./input')

const testInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const testAnswer = 7;
// find index after first 4 non-repeating characters

function findMarker (input, bufferLength = 4){

  let ans = undefined;
  for (let i = 0; i < input.length - bufferLength; i++) {
    const buffer = input.slice(i, i+bufferLength);
    const condensedBuffer = new Set(buffer.split(''))
    if(condensedBuffer.size === bufferLength) {
      ans = i + bufferLength;
      break;
    }
  }
  return ans
}

// Test!
console.assert(findMarker(testInput) === testAnswer, `Test input returned ${findMarker(testInput)}`)

//Part 1;
console.log(`Part 1 Answer: ${findMarker(input)}`)
//Part 2
console.log(`Part 2 Answer: ${findMarker(input, 14)}`)