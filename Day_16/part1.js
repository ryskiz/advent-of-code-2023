const fs = require("fs");

const visited = {};

const fileContent = fs.readFileSync("input.txt", "utf8");
let lines = fileContent.split("\n");

const part1 = () => {
  lines = lines.map((l) => l.split(""));
  const queue = [{ y: 0, x: 0, direction: "down" }];
  while (queue.length) {
    const { y, x, direction } = queue.shift();
    visited[`${y}-${x}-${direction}`] = true;
    const moved = moveInDirection({ y, x, direction });
    if (moved) {
      moved.forEach((m) => {
        if (lines[m.y][m.x] !== '.' || !visited[`${m.y}-${m.x}-${direction}`]) {
          queue.push(m)
        }
      });
    }
  }

  const finalVisited = {};
  Object.keys(visited).forEach((v) => {
    const [y, x, direction] = v.split("-");
    finalVisited[`${y}-${x}`] = true;
  });
  return Object.keys(finalVisited).length;
};

function moveInDirection({ y, x, direction }) {
  switch (direction) {
    case "right":
      return moveRight({ y, x });
    case "left":
      return moveLeft({ y, x });
    case "up":
      return moveUp({ y, x });
    case "down":
      return moveDown({ y, x });
  }
}

function moveRight({ y, x }) {
  if (lines[y][x + 1]) {
    switch (lines[y][x + 1]) {
      case "\\":
        return [{ y, x: x + 1, direction: "down" }];
      case "/":
        return [{ y, x: x + 1, direction: "up" }];
      case "|":
        return [
          { y, x: x + 1, direction: "up" },
          { y, x: x + 1, direction: "down" },
        ];
      default:
        return [{ y, x: x + 1, direction: "right" }];
    }
  }
}

function moveLeft({ y, x }) {
  if (lines[y][x - 1]) {
    switch (lines[y][x - 1]) {
      case "\\":
        return [{ y, x: x - 1, direction: "up" }];
      case "/":
        return [{ y, x: x - 1, direction: "down" }];
      case "|":
        return [
          { y, x: x - 1, direction: "up" },
          { y, x: x - 1, direction: "down" },
        ];
      default:
        return [{ y, x: x - 1, direction: "left" }];
    }
  }
}

function moveUp({ y, x }) {
  if (lines[y - 1] && lines[y - 1][x]) {
    switch (lines[y - 1][x]) {
      case "\\":
        return [{ y: y - 1, x, direction: "left" }];
      case "/":
        return [{ y: y - 1, x, direction: "right" }];
      case "-":
        return [
          { y: y - 1, x, direction: "left" },
          { y: y - 1, x, direction: "right" },
        ];
      default:
        return [{ y: y - 1, x, direction: "up" }];
    }
  }
}

function moveDown({ y, x }) {
  if (lines[y + 1] && lines[y + 1][x]) {
    switch (lines[y + 1][x]) {
      case "\\":
        return [{ y: y + 1, x, direction: "right" }];
      case "/":
        return [{ y: y + 1, x, direction: "left" }];
      case "-":
        return [
          { y: y + 1, x, direction: "left" },
          { y: y + 1, x, direction: "right" },
        ];
      default:
        return [{ y: y + 1, x, direction: "down" }];
    }
  }
}

console.log(part1());
