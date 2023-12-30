const part1 = () => {
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].split("");
  }

  const visited = {};

  const queue = new PriorityQueue([{ y: 0, x: 1, slope: ".", costToMove: 0 }]);
  let foundNode;
  let best = 0;
  while (queue.size()) {
    const currentNode = queue.dequeue();
    const neighbors = getNeighbors(currentNode);
    if (
      currentNode.y === lines.length - 1 &&
      currentNode.x === lines[0].length - 2
    ) {
      const sum = getPathSum(currentNode);
      if (sum > best) {
        best = sum;
        foundNode = currentNode;
      }
    }

    neighbors.forEach(({ coords, direction, slope }) => {
      const { x: nX, y: yX } = coords;
      const key = `${yX}-${nX}`;
      const currentCost = currentNode.costToMove;
      const costToMove = currentCost + 1; // Total cost to move to neighbor
      if (
        costToMove > (visited[key] || -Infinity) &&
        checkCanMove(currentNode.slope, direction)
      ) {
        visited[key] = costToMove;
        queue.enqueue({
          x: nX,
          y: yX,
          slope,
          parent: currentNode,
          lastDirection: direction,
          costToMove,
        });
      }
    });
  }

  if (!foundNode) {
    return "NODE NOT FOUND";
  }
  const sum2 = getPathSum(foundNode);
  return sum2;
};

function checkCanMove(lastSlope, nextDirection) {
  if (lastSlope === ".") return true;
  if (lastSlope === ">" && nextDirection === "right") return true;
  if (lastSlope === "<" && nextDirection === "left") return true;
  if (lastSlope === "v" && nextDirection === "down") return true;
  if (lastSlope === "^" && nextDirection === "up") return true;
  return false;
}

function getPathSum(node) {
  let currentNode = node;
  let sum = 0;
  while (currentNode.parent) {
    sum += 1;
    currentNode = currentNode.parent;
  }
  return sum;
}

function getNeighbors(node) {
  const neighbors = [];
  const { y, x, lastDirection } = node;
  // Left
  if (
    lines[y][x - 1] &&
    lines[y][x - 1] !== "#" &&
    lines[y][x - 1] !== ">" &&
    lastDirection !== "right"
  ) {
    neighbors.push({
      slope: lines[y][x - 1],
      coords: { y, x: x - 1 },
      direction: "left",
    });
  }
  // Right
  if (
    lines[y][x + 1] &&
    lines[y][x + 1] !== "#" &&
    lines[y][x + 1] !== "<" &&
    lastDirection !== "left"
  ) {
    neighbors.push({
      slope: lines[y][x + 1],
      coords: { y, x: x + 1 },
      direction: "right",
    });
  }
  // Up
  if (
    lines[y - 1] &&
    lines[y - 1][x] &&
    lines[y - 1][x] !== "#" &&
    lines[y - 1][x] !== "v" &&
    lastDirection !== "down"
  ) {
    neighbors.push({
      slope: lines[y - 1][x],
      coords: { y: y - 1, x },
      direction: "up",
    });
  }
  // Down
  if (
    lines[y + 1] &&
    lines[y + 1][x] &&
    lines[y + 1][x] !== "#" &&
    lines[y + 1][x] !== "^" &&
    lastDirection !== "up"
  ) {
    neighbors.push({
      slope: lines[y + 1][x],
      coords: { y: y + 1, x },
      direction: "down",
    });
  }

  return neighbors;
}

class PriorityQueue {
  constructor(start = []) {
    this.queue = start;
  }

  enqueue(newNode) {
    // Iterating through the entire item array to add element at the correct location of the Queue
    let added = false;
    for (let i = 0; i < this.queue.length; i++) {
      const node = this.queue[i];
      if (newNode.costToMove > node.costToMove) {
        this.queue.splice(i, 0, newNode);
        added = true;
        break;
      }
    }

    if (!added) this.queue.push(newNode);
  }

  dequeue() {
    return this.queue.shift();
  }

  size() {
    return this.queue.length;
  }
}

console.log(part1());
