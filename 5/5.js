const cratePile = require('./start.js')
let instructions = require('./instructions.js');

const testPile = {
  1: ['N', 'Z'],
  2: ['D', 'C', 'M'],
  3: ['P'],
}

const testInstructions = 
`move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split(/\n/)
instructions = instructions.split(/\n/)

// console.log(instructions)

function crateMover9000 (quantity, start, end) {
  for (let i = 0; i < quantity; i++) {
    const crate = cratePile[start].shift()
    cratePile[end].unshift(crate)
    // cratePile[end].shift(cratePile[start].unshift());
  }
}

// testInstructions.forEach(instruction => {
//   const split = instruction.split(' ');
//   console.log(instruction)

//   console.log(split[1], split[3], split[5])
//   crateMover9000(split[1], split[3], split[5])
// });

// console.log(cratePile)
instructions.forEach(instruction => {
  const split = instruction.split(' ');

  crateMover9000(split[1], split[3], split[5])
});

// crateMover9000(2, 1, 2)

// console.log(cratePile)

let output = '';

Object.values(cratePile).forEach(e => {
  output += e[0]
})

console.log(output)