const inputs = require('./input')

const forest = parseInput(inputs.real)
const maxScenicScore = getMaxScenicScore(forest)

console.clear()
console.log(`Part One Answer is: ${countVisibleTrees(forest)}`)
console.log(`Part Two Answer is: ${maxScenicScore}`)

function getMaxScenicScore(forest) {
  let scenicScores = [];

  Object.values(forest).forEach((row, y) => {
    row.forEach((treeHieght, x) => {
      scenicScores.push(getScenicScore({x, y, forest}))
    })
  })
  return Math.max.apply(Math, scenicScores);
}

function getScenicScore({x, y, forest}){
  const row = forest[y];
  const column = [];

  Object.values(forest).forEach(e => column.push(e[x]))
  const [leftScore, rightScore] = getScorePartials({rowOrColumn: row, index:x})
  const [upScore, downScore] = getScorePartials({rowOrColumn: column, index:y})
  return upScore * downScore * leftScore * rightScore
}

function getScorePartials({rowOrColumn, index}){
  const targetTreeHeight = rowOrColumn[index];
  const treesToLeft = rowOrColumn.slice(0, index).reverse();
  const treesToRight = rowOrColumn.slice(index + 1);
  const scoreToLeft = getScoreInDirection(treesToLeft, targetTreeHeight);
  const scoreToRight = getScoreInDirection(treesToRight, targetTreeHeight);
  return [scoreToLeft, scoreToRight];
}

function getScoreInDirection(treesInTheWay, targetTreeHeight){
  let score = 0;

  if(treesInTheWay.length === 0) {
    return 1
  }
  if(targetTreeHeight > Math.max.apply(Math, treesInTheWay)){
    return treesInTheWay.length
  }

  treesInTheWay.some(e => {
    if (targetTreeHeight > e) {
      score++
      return false;
    } 
    score++
    return true;
  })
  return score;
}


function countVisibleTrees(forest) {
  let count = 0;

  Object.values(forest).forEach((row, y) => {
    row.forEach((treeHieght, x) => {
      if(isTreeVisible({x, y, forest})){
        count++
      }
    })
  })
  return count;
}

function isTreeVisible({x, y, forest}){
  const row = forest[y];
  const column = [];

  Object.values(forest).forEach(e => column.push(e[x]))
  const isVisible = isVisibleInLine({rowOrColumn: row, index:x}) || isVisibleInLine({rowOrColumn: column, index:y}); 
  return isVisible
}


function isVisibleInLine({rowOrColumn, index}) {
  const targetTreeHeight = rowOrColumn[index];
  const treesToLeft = rowOrColumn.slice(0, index);
  const treesToRight = rowOrColumn.slice(index + 1);
  const visibleToLeft = targetTreeHeight > Math.max.apply(Math, treesToLeft);
  const visibleToRight = targetTreeHeight > Math.max.apply(Math, treesToRight);
  return visibleToLeft || visibleToRight;
}

function parseInput (input){
  const split = input
    .split(/\n/)
    .map(e => e.split(''))

  const out = {...split}

  return out;
}
