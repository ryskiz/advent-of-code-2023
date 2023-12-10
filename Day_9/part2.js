const part2 = () => {
  return lines.reduce((num, curr) => num + getNextNum(curr.split(" ").map((n) => +n)), 0);
};

const getNextNum = (line) => {
  let matchingNums = {};
  const sequence = [line]
  while (true) {
    matchingNums = {};
    const currSequence = sequence[sequence.length - 1]
    const nextSequence = []
    for (let i = 1; i < currSequence.length; i++) {
      const num1 = currSequence[i - 1];
      const num2 = currSequence[i];
      const diff = num2 - num1;
      matchingNums[diff] = matchingNums[diff] || 0;
      matchingNums[diff] += 1;
      nextSequence.push(diff)
    }

    sequence.push(nextSequence)

    if (Object.values(matchingNums).length === 1) {
      baseNum = true
      break;
    }
  }

  sequence.reverse();
  for (let i = 1; i < sequence.length; i++) {
    const lastNum = sequence[i][0];
    sequence[i].unshift(
      lastNum - sequence[i - 1][0]
    );
  }
  const num = sequence[sequence.length - 1].shift()
  return num;
};

console.log(part2());