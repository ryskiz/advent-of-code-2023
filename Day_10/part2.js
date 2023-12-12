const visited = {}
const filledIn = {}

let originalCoords = null
let init = false

const part2 = () => {
  const startingPosition = /S/g
  let startingCoords = []

  lines = lines.map((l, i) => {
    const found = startingPosition.exec(l)
    if (found) startingCoords = [i, found.index]
    return l.split('')
  })

  lines[startingCoords[0]][startingCoords[1]] = '7' // Manually enter starting position here
  originalCoords = startingCoords
  getPathLength(startingCoords, 0)
  const insideTiles = countInsideTiles()

  return insideTiles
}

const getPathLength = (startPosition, steps, dir) => {
  const [originalY, originalX] = originalCoords
  const [y, x] = startPosition
  const currentPosition = lines[y][x]

  if (y === originalY && x === originalX && steps > 0) {
    visited[`${y}-${x}`] = true
    return steps // Once we've hit a tile that's already been visited then we can exit
  }
  if (init) {
    visited[`${y}-${x}`] = true
  }
  init = true
  const left = lines[y][x - 1] && !visited[`${y}-${x - 1}`] ? { char: lines[y][x - 1], coords: [y, x - 1] } : null
  const right = lines[y][x + 1] && !visited[`${y}-${x + 1}`] ? { char: lines[y][x + 1], coords: [y, x + 1] } : null
  const up = lines[y - 1] && !visited[`${y - 1}-${x}`] ? { char: lines[y - 1][x], coords: [y - 1, x] } : null
  const down = lines[y + 1] && !visited[`${y + 1}-${x}`] ? { char: lines[y + 1][x], coords: [y + 1, x] } : null

  // Horizontal pipes
  if (left && isCompatibleLeftHorizontal(left.char) && isCompatibleRightHorizontal(currentPosition)) getPathLength(left.coords, steps + 1)
  if (right && isCompatibleRightHorizontal(right.char) && isCompatibleLeftHorizontal(currentPosition)) getPathLength(right.coords, steps + 1)

  // Vertical pipes
  if (up && isCompatibleUpVertical(up.char) && isCompatibleDownVertical(currentPosition)) getPathLength(up.coords, steps + 1)
  if (down && isCompatibleDownVertical(down.char) && isCompatibleUpVertical(currentPosition)) getPathLength(down.coords, steps + 1)

  return null
}

function countInsideTiles() {
  let insideTiles = 0
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const hasVisited = visited[`${i}-${j}`]
      const isAlreadyFilledIn = filledIn[`${i}-${j}`]
      if (!hasVisited && !isAlreadyFilledIn && oddRightIntersections(i, j)) {
        insideTiles += countSurroundingTiles(i, j)
      }
    }
  }

  return insideTiles
}

function countSurroundingTiles(y, x) {
  let stack = [[y, x]]
  let tiles = 0
  while(stack.length) {
    tiles += 1
    const [currY, currX] = stack.shift()
    filledIn[`${currY}-${currX}`] = true
    if (lines[currY - 1] && !visited[`${currY - 1}-${currX}`] && !filledIn[`${currY - 1}-${currX}`]) { // up
      filledIn[`${currY - 1}-${currX}`] = true
      stack.push([currY - 1, currX])
    }
    if (lines[currY + 1] && !visited[`${currY + 1}-${currX}`] && !filledIn[`${currY + 1}-${currX}`]) { // down
      filledIn[`${currY + 1}-${currX}`] = true
      stack.push([currY + 1, currX])
    }
    if (lines[currY][currX - 1] && !visited[`${currY}-${currX - 1}`] && !filledIn[`${currY}-${currX - 1}`]) { // left
      filledIn[`${currY}-${currX - 1}`] = true
      stack.push([currY, currX - 1])
    }
    if (lines[currY][currX + 1] && !visited[`${currY}-${currX + 1}`] && !filledIn[`${currY}-${currX + 1}`]) { // right
      filledIn[`${currY}-${currX + 1}`] = true
      stack.push([currY, currX + 1])
    }
  }
  return tiles
}

function oddRightIntersections(y, x) {
  let hitEdges = 0
  for (let i = x; i < lines[0].length; i++) {
    const char = lines[y][i]
    if (visited[`${y}-${i}`] && (char === '|' || char === 'J' || char === 'L')) {
      hitEdges += 1
    }
  }
  return hitEdges % 2 === 1
}

function isCompatibleUpVertical(char) {
  return (
    char === '|' ||
    char === 'F' ||
    char === '7'
  )
}

function isCompatibleDownVertical(char) {
  return (
    char === '|' ||
    char === 'L' ||
    char === 'J'
  )
}

function isCompatibleLeftHorizontal(char) {
  return (
    char === '-' || char === 'F' || char === 'L'
  )
}

function isCompatibleRightHorizontal(char) {
  return (
    char === '-' || char === '7' || char === 'J'
  )
}

console.log(part2())