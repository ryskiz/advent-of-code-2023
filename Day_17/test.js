const lines = [
  '2413432311323',
  '3215453535623',
  '3255245654254',
  '3446585845452',
  '4546657867536',
  '1438598798454',
  '4457876987766',
  '3637877979653',
  '4654967986887',
  '4564679986453',
  '1224686865563',
  '2546548887735',
  '4322674655533',
];

class Node {
  constructor(y, x, cost) {
    this.x = x;
    this.y = y;
    this.cost = cost;
    this.parent = null;
    this.consecutiveMoves = 0;
    this.lastDirection = null;
    this.g = Infinity; // cost from following the path from the start node to current node
    this.h = 0; // heuristic cost
    this.f = 0; // total cost of moving from each node g + h
  }
}

const part1 = () => {
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].split("");
  }

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      lines[i][j] = new Node(i, j, +lines[i][j]);
    }
  }

  const { y, x, cost } = lines[0][0]
  const start = new Node(y, x, cost);
  const { x: lx, y: ly, cost: lcost } = lines[lines.length - 1][lines[0].length - 1]
  const end = new Node(ly, lx, lcost);
  const { paths, sum } = aStar(start, end);
  paths.forEach(([y, x, lastDirection]) => {
    if (lastDirection === 'right') lines[y][x] = ">";
    if (lastDirection === 'left') lines[y][x] = "<";
    if (lastDirection === 'up') lines[y][x] = "^";
    if (lastDirection === 'down') lines[y][x] = "v";
  });
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] !== ">" && lines[i][j] !== "v" && lines[i][j] !== "<" && lines[i][j] !== "^") lines[i][j] = "X";
    }
  }
  console.log(lines)
  return sum;
};

function getNeighbors(node) {
  const neighbors = [];
  const { y, x } = node;
  // Left
  if (lines[y][x - 1]) {
    neighbors.push({ neighbor: lines[y][x - 1], direction: "left" });
  }
  // Right
  if (lines[y][x + 1]) {
    neighbors.push({ neighbor: lines[y][x + 1], direction: "right" });
  }
  // Up
  if (lines[y - 1] && lines[y - 1][x]) {
    neighbors.push({ neighbor: lines[y - 1][x], direction: "up" });
  }
  // Down
  if (lines[y + 1] && lines[y + 1][x]) {
    neighbors.push({ neighbor: lines[y + 1][x], direction: "down" });
  }

  return neighbors;
}

console.log(part1());
