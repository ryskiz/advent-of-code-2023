const visited = {}

let originalCoords = null
let init = false

const part1 = () => {
  const startingPosition = /S/g
  let startingCoords = []

  lines = lines.map((l, i) => {
    const found = startingPosition.exec(l)
    if (found) startingCoords = [i, found.index]
    return l.split('')
  })

  lines[startingCoords[0]][startingCoords[1]] = '7' // Manually figure out starting S pipe
  originalCoords = startingCoords
  return getPathLength(startingCoords, 0)
}

const getPathLength = (startPosition, steps) => {
  const [originalY, originalX] = originalCoords
  const [y, x] = startPosition
  const currentPosition = lines[y][x]

  if (y === originalY && x === originalX && steps > 0) {
    return steps // Once we've hit a tile that's already been visited then we can exit
  }
  if (init) visited[`${y}-${x}`] = true
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

console.log(part1())