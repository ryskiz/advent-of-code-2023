const directionMap = {
  L: 0,
  R: 1,
};

const part2 = () => {
  const { map, startingNodes } = getDirectionSet();

  const quickestPaths = []
  for (let i = 0; i < startingNodes.length; i++) {
    quickestPaths.push(getQuickestPath(startingNodes[i], map))
  }

  return quickestPaths.reduce((acc, curr) => lcm(acc, curr), 1);
};

const getDirectionSet = () => {
  const map = {};
  const startingNodes = [];
  // FLR: [SXT, CRV]
  for (let i = 0; i < lines.length; i++) {
    const split = lines[i].split(" = ");
    if (split[0][split[0].length - 1] === "A") startingNodes.push(split[0]); // Get all starting nodes that end in "A"
    const LR = split[1].split(/\(|\)|\,|\s/);
    map[split[0]] = [LR[1], LR[3]];
  }
  return { map, startingNodes };
};

const getQuickestPath = (startingNode, map) => {
  let currentLocation = startingNode;
  let directionIndex = 0;
  let steps = 0;
  while (currentLocation[currentLocation.length - 1] !== "Z") {
    const curr = map[currentLocation];
    const direction = directionMap[directions[directionIndex]];
    currentLocation = curr[direction];

    steps += 1;
    if (directionIndex === directions.length - 1) {
      directionIndex = 0;
    } else {
      directionIndex++;
    }
  }

  return steps;
}

function gcd(a, b) {
  while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
  }
  return a;
}

function lcm(a, b) {
  return a * b / gcd(a, b);
}

console.log(part2());
