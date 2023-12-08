const directionMap = {
  L: 0,
  R: 1,
};

const part1 = () => {
  const map = getDirectionSet();

  let currentLocation = "AAA";
  let directionIndex = 0;
  let steps = 0;
  while (currentLocation !== "ZZZ") {
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
};

const getDirectionSet = () => {
  const map = {};
  // FLR: [SXT, CRV]
  for (let i = 0; i < lines.length; i++) {
    const split = lines[i].split(" = ");
    const LR = split[1].split(/\(|\)|\,|\s/);
    map[split[0]] = [LR[1], LR[3]];
  }
  return map;
};

console.log(part1());
