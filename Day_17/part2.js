const part2 = () => {
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].split("");
  }

  const visited = {}

  const queue = new PriorityQueue([{ y: 0, x: 0, lastDirection: 'right', consecutiveMoves: 1, costToMove: 0 }]);
  let foundNode
  let best = Infinity
  while (queue.size()) {
    const currentNode = queue.dequeue();
    const neighbors = getNeighbors(currentNode);
    if (currentNode.y === lines.length - 1 && currentNode.x === lines[0].length - 1 && currentNode.consecutiveMoves >= 4) {
      const sum = getPathSum(currentNode)
      console.log('SUM', sum)
      if (sum < best) {
        best = sum
        foundNode = currentNode
        break
      }
    }

    neighbors.forEach(({ cost, coords, direction }) => {
      const { x: nX, y: yX } = coords
      const nextConsecutive = direction === currentNode.lastDirection ? currentNode.consecutiveMoves + 1 : 1
      const currentCost = currentNode.costToMove;
      const costToMove = currentCost + cost; // Total cost to move to neighbor
      const key = `${yX}-${nX}-${direction}-${nextConsecutive}`
      const canMove = direction !== currentNode.lastDirection ? currentNode.consecutiveMoves >= 4 : true
      if (costToMove < (visited[key] || Infinity) && nextConsecutive <= 10 && canMove) {
        visited[key] = costToMove
        queue.enqueue({ x: nX, y: yX, lastDirection: direction, consecutiveMoves: nextConsecutive, parent: currentNode, costToMove })
      }
    })
  }

  if (!foundNode) {
    return 'NODE NOT FOUND'
  }
  const sum2 = getPathSum(foundNode, true)
  return sum2
};

function getPathSum(node, update) {
  let currentNode = node
  let sum = 0
  while (currentNode.parent) {
    const { y, x } = currentNode
    sum += +lines[y][x]
    if (update) {
      lines[y][x] = getChar(currentNode)
    }
    currentNode = currentNode.parent
  }
  return sum
}

function getChar(node) {
  switch(node.lastDirection) {
    case 'left':
      return '<'
    case 'right':
      return '>'
    case 'up':
      return '^'
    case 'down':
      return 'v'
  }
}

function getNeighbors(node) {
  const neighbors = [];
  const { y, x, lastDirection } = node;
  // Left
  if (lines[y][x - 1] && lastDirection !== 'right') {
    neighbors.push({ cost: +lines[y][x - 1], coords: { y, x: x - 1 }, direction: "left" });
  }
  // Right
  if (lines[y][x + 1] && lastDirection !== 'left') {
    neighbors.push({ cost: +lines[y][x + 1], coords: { y, x: x + 1 }, direction: "right" });
  }
  // Up
  if (lines[y - 1] && lines[y - 1][x] && lastDirection !== 'down') {
    neighbors.push({ cost: +lines[y - 1][x], coords: { y: y - 1, x }, direction: "up" });
  }
  // Down
  if (lines[y + 1] && lines[y + 1][x] && lastDirection !== 'up') {
    neighbors.push({ cost: +lines[y + 1][x], coords: { y: y + 1, x }, direction: "down" });
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
      const node = this.queue[i]
      if (newNode.costToMove < node.costToMove) {
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

console.log(part2());
