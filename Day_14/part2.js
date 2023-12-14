const part2 = (iterations) => {
  lines = lines.map((l) => l.split(""));

  const directions = [{direction: 'north', roll: rollNorthOrWest}, {direction: 'west', roll: rollNorthOrWest}, {direction: 'south', roll: rollSouth}, {direction: 'east', roll: rollEast}]
  for (let lol = 1; lol <= iterations; lol++) {
    directions.forEach(({ direction, roll }) => {
      roll(direction)
    })
  }

  let num = 0;
  for (let i = 0; i < lines.length; i++) {
    const oCount = lines[i].filter((c) => c === "O").length;
    const multiplier = lines.length - i;
    num += oCount * multiplier;
  }

  return num;
};

function rollNorthOrWest(direction) {
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === "O") {
        rollOInDirection(y, x, direction);
      }
    }
  }
}

function rollSouth(direction) {
  for (let y = lines.length - 1; y >= 0; y--) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === "O") {
        rollOInDirection(y, x, direction);
      }
    }
  }
}

function rollEast(direction) {
  for (let y = 0; y < lines.length; y++) {
    for (let x = lines[0].length - 1; x >= 0; x--) {
      if (lines[y][x] === "O") {
        rollOInDirection(y, x, direction);
      }
    }
  }
}

function rollOInDirection(y, x, direction) {
  let newY = y;
  let newX = x
  while (getConditional(newY, newX, direction)) {
    lines[newY][newX] = ".";

    if (direction === 'north') {
      lines[newY - 1][x] = "O";
      newY--;
    }

    if (direction === 'south') {
      lines[newY + 1][x] = "O";
      newY++;
    }

    if (direction === 'east') {
      lines[y][newX + 1] = "O";
      newX++;
    }

    if (direction === 'west') {
      lines[y][newX - 1] = "O";
      newX--;
    }
  }
}

function getConditional(y, x, direction) {
  if (direction === 'north') {
    return lines[y - 1] && lines[y - 1][x] !== "#" && lines[y - 1] && lines[y - 1][x] !== "O"
  }
  if (direction === 'south') {
    return lines[y + 1] && lines[y + 1][x] !== "#" && lines[y + 1] && lines[y + 1][x] !== "O"
  }
  if (direction === 'east') {
    return lines[y][x + 1] && lines[y][x + 1] !== '#' && lines[y][x + 1] !== 'O'
  }
  if (direction === 'west') {
    return lines[y][x - 1] && lines[y][x - 1] !== '#' && lines[y][x - 1] !== 'O'
  }
}

console.log(part2(1000));