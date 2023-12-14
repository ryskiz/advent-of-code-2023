const part1 = () => {
  lines = lines.map((l) => l.split(""));
  for (let y = 1; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === "O") {
        rollONorth(y, x);
      }
    }
  }

  let num = 0;
  for (let i = 0; i < lines.length; i++) {
    const oCount = lines[i].filter((c) => c === "O").length;
    const multiplier = lines.length - i;
    num += oCount * multiplier;
  }

  return num;
};

function rollONorth(y, x) {
  let newY = y;
  while (
    lines[newY - 1] &&
    lines[newY - 1][x] !== "#" &&
    lines[newY - 1] &&
    lines[newY - 1][x] !== "O"
  ) {
    lines[newY][x] = ".";
    lines[newY - 1][x] = "O";
    newY--;
  }
}

console.log(part1());
