const part1 = () => {
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

  const coords = maps.map((m, i) => {
    const horizontal = getMirrorLine(m, i)
    const vertical = getMirrorLineColumns(m, i)

    if (horizontal && !vertical) return horizontal
    if (vertical && !horizontal) return vertical
    if (horizontal && vertical) {
      return horizontal.matchingLines > vertical.matchingLines ? horizontal : vertical
    }
  })

  return coords.reduce((prev, { direction, center }) => prev += direction === 'vertical' ? center[0] + 1 : (center[0] + 1) * 100, 0)
};

function getColumn(x, map) {
  let column = '';
  for (let y = 0; y < map.length; y++) {
    column += map[y][x];
  }
  return column;
}

function getMirrorLine(map, i) {
  let left = 0;
  let middle = 1;
  let right = 2;
  let largestMatch = null
  while (middle < map.length) {
    // find center
    if (map[left] === map[middle]) {
      const matchingLines = validateMirror(map, left, middle)
      if (matchingLines && (!largestMatch || matchingLines > largestMatch.matchingLines)) largestMatch = { matchingLines, center: [left, middle], direction: 'horizontal' }
    } else if (map[left] === map[right]) { // Check center mirror
      const matchingLines = validateMirror(map, left, right)
      if (matchingLines && (!largestMatch || matchingLines > largestMatch.matchingLines)) largestMatch = { matchingLines, center: [middle, middle], direction: 'horizontal' }
    }

    left++
    right++
    middle++
  }
  return largestMatch;
}

function getMirrorLineColumns(map, i) {
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
      const matchingLines = validateColumnMirror(map, left, middle)
      if (matchingLines && (!largestMatch || matchingLines > largestMatch.matchingLines)) largestMatch = { matchingLines, center: [left, middle], direction: 'vertical' }
    } else if (lineLeft === lineRight) { // Check center mirror
      const matchingLines = validateColumnMirror(map, left, right)
      if (matchingLines && (!largestMatch || matchingLines > largestMatch.matchingLines)) largestMatch = { matchingLines, center: [middle, middle], direction: 'vertical' }
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
    return null
  }
  return matchingLines
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
    return null
  }
  return matchingLines
}

console.log(part1());
