const part1 = () => {
  expandUniverse()
  const galaxyLocations = getGalaxyLocations()
  return getSumOfShortestPaths(galaxyLocations)
}

const expandUniverse = () => {
  let emptyRows = []
  let emptyColumns = []
  for (let i = 0; i < lines.length; i++) { // rows
    if (lines[i].indexOf('#') === -1) emptyRows.push(i)
  }

  emptyRows.forEach((emptyRow, i) => {
    const empty = new Array(lines[0].length).fill('.').join('')
    lines.splice(emptyRow + i, 0, empty)
  })

  for (let i = 0; i < lines[0].length; i++) { // columns
    let emptyColumn = true
    for (let j = 0; j < lines.length; j++) {
      if (lines[j][i] === '#') emptyColumn = false
    }
    if (emptyColumn) emptyColumns.push(i)
  }

  for (let i = 0; i < emptyColumns.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      let newLine = lines[j].split('')
      newLine.splice(emptyColumns[i] + i, 0, '.')
      lines[j] = newLine.join('')
    }
  }
}

const getGalaxyLocations = () => {
  const locations = {}
  let acc = 1
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === '#') {
        locations[acc] = [i, j]
        acc += 1
      }
    }
  }
  return locations
}

function getSumOfShortestPaths(galaxyLocations) {
  const locations = Object.keys(galaxyLocations)
  const countedPairs = {}
  let sum = 0
  for (let i = 0; i < locations.length; i++) {
    const currId = locations[i]
    const [currY, currX] = galaxyLocations[`${currId}`]
    for (let j = i; j < locations.length; j++) {
      if (locations[j] !== locations[i]) {
        const nextId = locations[j]
        const [nextY, nextX] = galaxyLocations[`${j + 1}`]
        const pairKey = `${Math.min(currId, nextId)}-${Math.max(currId, nextId)}`
        if (countedPairs[pairKey]) continue

        let add = 0
        if (currX === nextX) {
          add = Math.max(currY, nextY) - Math.min(currY, nextY)
        } else if (currY === nextY) {
          add = Math.max(currX, nextX) - Math.min(currX, nextX)
        } else {
          add = (Math.max(currY, nextY) - Math.min(currY, nextY)) + (Math.max(currX, nextX) - Math.min(currX, nextX))
        }

        sum += add
        countedPairs[pairKey] = add
      }
    }
  }
  return sum
}

console.log(part1())
