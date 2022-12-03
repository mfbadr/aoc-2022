/**
  - Dictionary of the priorities
  - split lines into equal compartments
  - find item duplicated in each compartment
  - sum the priorities
**/

const input = require('./input');
const prioritiesDict = makePrioritiesDict();
const split = input.split(/\n/);
let sum = 0; 


// findDuplicate(split[0])

split.forEach(rucksack => {
  const duplicate = findDuplicate(rucksack);
  sum = sum + prioritiesDict[duplicate] 
});

console.log(`Part one answer is ${sum}`)

//part -2 find duplicate in each set of 3. sum those
// array of arrays
const groups = makeGroups();

let sumpart2 = 0;

groups.forEach(group => {

  const first = new Set(group[0]);
  const second = new Set(group[1]);
  const third = new Set(group[2]);

  const duplicate = [...first, ...second, ...third].filter((e, i, a) => a.indexOf(e) !== i)[0];

  sumpart2 = sumpart2 + prioritiesDict[duplicate] 
})

console.log(`Part two answer is ${sumpart2}`)



//for each group find item that appears in all 3



// sort into groups
function makeGroups (){
  const groups = []
  for (let i = 0; i < split.length; i++) {
    const rucksack = split[i];
    const groupIndex = Math.floor((i / 3));
    // console.log(groupIndex)

    if(Array.isArray(groups[groupIndex])) {
      groups[groupIndex].push(rucksack)
    } else {
      groups[groupIndex] = [rucksack];
    }
  }

  return groups;
}

function makePrioritiesDict () {
  const alphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  const priorities = {};
  for (let i = 1; i <= alphabet.length; i++) {
    const item = alphabet[i - 1];
    priorities[item] = i;
  }
  
  return priorities
}

function findDuplicate(rucksack){
  const first = new Set(rucksack.slice(0, rucksack.length/2))
  const second = new Set(rucksack.slice(rucksack.length/2, rucksack.length));
  const duplicate = [...first, ...second].filter((e, i, a) => a.indexOf(e) !== i)[0];
  console.assert(first.length === second.length, 'Compartment lengths not equal')

  return duplicate;
}

