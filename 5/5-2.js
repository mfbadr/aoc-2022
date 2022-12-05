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

function crateMover9001 (quantity, start, end) {
    const crate = cratePile[start].splice(0, quantity)
    cratePile[end].unshift(...crate)
}

instructions.forEach(instruction => {
  const split = instruction.split(' ');
  crateMover9001(split[1], split[3], split[5])
});

let output = '';

Object.values(cratePile).forEach(e => {
  output += e[0]
})

console.log(output)