const part2 = () => {
  const maps = [];

  let rows = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") {
      maps.push(rows);
      rows = [];
    } else {
      rows.push(line);
    }
  }
  maps.push(rows);

  const ogCoords = maps.map((m) => search(m))

  const coords = []
  for (let i = 0; i < maps.length; i++) {
    const map = maps[i]
    let largestMatch = null
    for(let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        const charReplacement = map[y][x] === '#' ? '.' : '#'
        const newMap = [...map]
        const newStr = replaceStr(newMap[y], x, charReplacement)
        newMap[y] = newStr
        const mirrorLine = search(newMap, ogCoords[i], [y, x])
        if (mirrorLine) {
          if (!largestMatch) {
            largestMatch = mirrorLine
          } else if (mirrorLine && mirrorLine.matchingLines > largestMatch.matchingLines) {
            largestMatch = mirrorLine
          }
        }
      }
    }
    coords.push(largestMatch)
  }

  return coords.reduce((prev, { direction, center }) => prev += direction === 'vertical' ? center[0] + 1 : (center[0] + 1) * 100, 0)
};

function search(m, oldCoords, smudgeLocation) {
  const horizontal = getMirrorLine(m, oldCoords, smudgeLocation)
  const vertical = getMirrorLineColumns(m, oldCoords, smudgeLocation)

  if (horizontal && !vertical) return horizontal
  if (vertical && !horizontal) return vertical
  if (horizontal && vertical) {
    return horizontal.matchingLines > vertical.matchingLines ? horizontal : vertical
  }
}

function getColumn(x, map) {
  let column = '';
  for (let y = 0; y < map.length; y++) {
    column += map[y][x];
  }
  return column;
}

function getMirrorLine(map, oldCoords, smudgeLocation) {
  let left = 0;
  let middle = 1;
  let right = 2;
  let largestMatch = null
  while (middle < map.length) {
    // find center
    if (map[left] === map[middle]) {
      const { matchingLines, outBounds } = validateMirror(map, left, middle)
      const newCoords = { matchingLines, center: [left, middle], direction: 'horizontal', map, smudgeLocation, outBounds }
      if (oldCoords && matchingLines) {
        if (!matchingCoords(newCoords, oldCoords) && smudgeLocation[0] >= outBounds[0] && smudgeLocation[0] <= outBounds[1]) {
          largestMatch = newCoords
          break
        }
      } else if (matchingLines && (!largestMatch || matchingLines > largestMatch.matchingLines)) {
        largestMatch = newCoords
      }
    } else if (map[left] === map[right]) { // Check center mirror
      const { matchingLines, outBounds } = validateMirror(map, left, right)
      const newCoords = { matchingLines, center: [middle, middle], direction: 'horizontal', map, smudgeLocation, outBounds }
      if (oldCoords && matchingLines) {
        if (!matchingCoords(newCoords, oldCoords) && smudgeLocation[0] >= outBounds[0] && smudgeLocation[0] <= outBounds[1]) {
          largestMatch = newCoords
          break
        }
      } else if (matchingLines && (!largestMatch || matchingLines > largestMatch.matchingLines)) {
        largestMatch = newCoords
      }
    }

    left++
    right++
    middle++
  }
  return largestMatch;
}

function matchingCoords(newCoords, oldCoords) {
  if (!oldCoords) return
  return (
    newCoords.center[0] === oldCoords.center[0] &&
    newCoords.center[1] === oldCoords.center[1] &&
    newCoords.direction === oldCoords.direction
  )
}

function getMirrorLineColumns(map, oldCoords, smudgeLocation) {
  let left = 0;
  let middle = 1;
  let right = 2;
  let largestMatch = null
  while (middle < map[0].length) {
    // find center
    const lineLeft = getColumn(left, map)
    const lineMiddle = getColumn(middle, map)
    const lineRight = getColumn(right, map)

    if (lineLeft === lineMiddle) {
      const { matchingLines, outBounds } = validateColumnMirror(map, left, middle)
      const newCoords = { matchingLines, center: [left, middle], direction: 'vertical', map, smudgeLocation, outBounds }
      if (oldCoords && matchingLines) {
        if (!matchingCoords(newCoords, oldCoords) && smudgeLocation[1] >= outBounds[0] && smudgeLocation[1] <= outBounds[1]) {
          largestMatch = newCoords
          break
        }
      } else if (matchingLines && (!largestMatch || matchingLines > largestMatch.matchingLines)) {
        largestMatch = newCoords
      }
    } else if (lineLeft === lineRight) { // Check center mirror
      const { matchingLines, outBounds } = validateColumnMirror(map, left, right)
      const newCoords = { matchingLines, center: [middle, middle], direction: 'vertical', map, smudgeLocation, outBounds }
      if (oldCoords && matchingLines) {
        if (!matchingCoords(newCoords, oldCoords) && smudgeLocation[1] >= outBounds[0] && smudgeLocation[1] <= outBounds[1]) {
          largestMatch = newCoords
          break
        }
      } else if (matchingLines && (!largestMatch || matchingLines > largestMatch.matchingLines)) {
        largestMatch = newCoords
      }
    }

    left++
    right++
    middle++
  }

  return largestMatch;
}

function validateMirror(map, left, right) {
  let matchingLines = 0
  let newLeft = left
  let newRight = right
  while(map[newLeft] === map[newRight] && newLeft >= 0) {
    matchingLines += 1
    if (newLeft === 0 || newRight === map.length - 1) {
      break
    }
    newLeft--
    newRight++
  }

  if (map[newLeft] !== map[newRight]) {
    return {}
  }
  return { matchingLines, outBounds: [newLeft, newRight] }
}

function validateColumnMirror(map, left, right) {
  let matchingLines = 0
  let newLeft = left
  let newRight = right
  let colLeft = getColumn(newLeft, map)
  let colRight = getColumn(newRight, map)

  while(colLeft === colRight && newLeft >= 0) {
    matchingLines += 1
    if (newLeft === 0 || newRight === map[0].length - 1) {
      break
    }
    newLeft--
    newRight++
    colLeft = getColumn(newLeft, map)
    colRight = getColumn(newRight, map)
  }

  if (colLeft !== colRight) {
    return {}
  }

  return { matchingLines, outBounds: [newLeft, newRight] }
}

function replaceStr(str, i, char) {
  return str.slice(0, i) + char + str.slice(i + 1)
}

console.log(part2());
