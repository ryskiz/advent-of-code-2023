const part2 = (multiplier) => {
  const { emptyRows, emptyColumns } = getEmptyRowsAndColumns()
  const galaxyLocations = getGalaxyLocations(multiplier, emptyRows, emptyColumns)
  return getSumOfShortestPaths(galaxyLocations, multiplier, emptyRows, emptyColumns)
}

const getEmptyRowsAndColumns = () => {
  let emptyRows = []
  let emptyColumns = []
  for (let i = 0; i < lines.length; i++) { // rows
    if (lines[i].indexOf('#') === -1) emptyRows.push(i)
  }

  for (let i = 0; i < lines[0].length; i++) { // columns
    let emptyColumn = true
    for (let j = 0; j < lines.length; j++) {
      if (lines[j][i] === '#') emptyColumn = false
    }
    if (emptyColumn) emptyColumns.push(i)
  }

  return { emptyRows, emptyColumns }
}

const getGalaxyLocations = (multiplier, emptyRows, emptyColumns) => {
  const locations = {}
  let acc = 1
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === '#') {
        const x = getExpandedNumber(multiplier, j, emptyColumns)
        const y = getExpandedNumber(multiplier, i, emptyRows)
        locations[acc] = [y, x]
        acc += 1
      }
    }
  }
  return locations
}

const getExpandedNumber = (multiplier, num, emptyNums) => {
  let newNum = num
  let hits = 0
  emptyNums.forEach((emptyNum) => {
    if (emptyNum < num) hits += multiplier
  })

  return hits ? newNum + (hits) : newNum
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

console.log(part2(999999))