const fs = require("fs");

const fileContent = fs.readFileSync("./output.txt", "utf8");
let lines = fileContent.split("\n");

const part1 = (steps) => {
  let startCoords = null
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].split('')
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === 'S') {
        startCoords = [i, j]
      }
    }
  }

  let currentSteps = [startCoords]
  for (let i = 1; i <= steps; i++) {
    currentSteps = makeSteps(currentSteps)
  }

  let count = 0
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === 'O') {
        count += 1
      }
    }
  }

  return count
};

function makeSteps(currentSteps) {
  let newSteps = []
  for (let i = 0; i < currentSteps.length; i++) {
    newSteps = [...newSteps, ...step(currentSteps[i])]
  }
  return newSteps
}

function step(step) {
  const neighbors = [];
  const [ y, x ] = step;
  lines[y][x] = '.'
  // Left
  if (lines[y][x - 1] && isValidStep(lines[y][x - 1])) {
    if (lines[y][x - 1] !== 'O') neighbors.push([y, x - 1])
    lines[y][x - 1] = 'O'
  }
  // Right
  if (lines[y][x + 1] && isValidStep(lines[y][x + 1])) {
    if (lines[y][x + 1] !== 'O') neighbors.push([y, x + 1]);
    lines[y][x + 1] = 'O'
  }
  // Up
  if (lines[y - 1] && lines[y - 1][x] && isValidStep(lines[y - 1][x])) {
    if (lines[y - 1][x] !== 'O') neighbors.push([y - 1, x]);
    lines[y - 1][x] = 'O'
  }
  // Down
  if (lines[y + 1] && lines[y + 1][x] && isValidStep(lines[y + 1][x])) {
    if (lines[y + 1][x] !== 'O') neighbors.push([y + 1, x]);
    lines[y + 1][x] = 'O'
  }

  return neighbors;
}

function isValidStep (char) {
  return char === '.' || char === 'O' || char === 'S'
}

console.log(part1(65 + (2 * 131)))
