const symbolRegex = /\*/g;

const part2 = () => {
  let finalNumber = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (symbolRegex.test(line)) finalNumber += addAjacentNumbers(i, line);
  }

  return finalNumber;
};

const addAjacentNumbers = (lineIndex, line) => {
  let sum = 0;

  for (let i = 0; i < line.length; i++) {
    const char = lines[lineIndex][i];
    if (symbolRegex.test(char)) sum += getSumOfAjacentNumbers(i, lineIndex, line);
  }

  return sum;
};

const getSumOfAjacentNumbers = (symbolIndex, lineIndex) => {
  let nums = []
  // left
  if (lines[lineIndex][symbolIndex - 1] && !isNaN(+lines[lineIndex][symbolIndex - 1])) nums.push(getNumber(symbolIndex - 1, lineIndex))
  // right
  if (lines[lineIndex][symbolIndex + 1] && !isNaN(+lines[lineIndex][symbolIndex + 1])) nums.push(getNumber(symbolIndex + 1, lineIndex))
  // top
  if (lines[lineIndex - 1] && lines[lineIndex - 1][symbolIndex] && !isNaN(+lines[lineIndex - 1][symbolIndex]) && nums.length < 2) nums.push(getNumber(symbolIndex, lineIndex - 1))
  // bottom
  if (lines[lineIndex + 1] && lines[lineIndex + 1][symbolIndex] && !isNaN(+lines[lineIndex + 1][symbolIndex]) && nums.length < 2) nums.push(getNumber(symbolIndex, lineIndex + 1))

  // Top left diag
  if (lines[lineIndex - 1] && lines[lineIndex - 1][symbolIndex - 1] && !isNaN(+lines[lineIndex - 1][symbolIndex - 1]) && nums.length < 2) nums.push(getNumber(symbolIndex - 1, lineIndex - 1))
  // Top right diag
  if (lines[lineIndex - 1] && lines[lineIndex - 1][symbolIndex + 1] && !isNaN(+lines[lineIndex - 1][symbolIndex + 1]) && nums.length < 2) nums.push(getNumber(symbolIndex + 1, lineIndex - 1))
  // Bottom left diag
  if (lines[lineIndex + 1] && lines[lineIndex + 1][symbolIndex - 1] && !isNaN(+lines[lineIndex + 1][symbolIndex - 1]) && nums.length < 2) nums.push(getNumber(symbolIndex - 1, lineIndex + 1))
  // Bottom right diag
  if (lines[lineIndex + 1] && lines[lineIndex + 1][symbolIndex + 1] && !isNaN(+lines[lineIndex + 1][symbolIndex + 1]) && nums.length < 2) nums.push(getNumber(symbolIndex + 1, lineIndex + 1))

  return nums.length < 2 ? 0 : nums.reduce((prev, curr) => prev * curr, 1)
};

const getNumber = (currIndex, lineIndex) => {
  let number = lines[lineIndex][currIndex];

  // replace right
  for (let i = currIndex + 1; i < lines[lineIndex].length; i++) {
    if (isNaN(+lines[lineIndex][i])) break

    number = number + lines[lineIndex][i]
    replaceNumberWithDot(i, lineIndex)
  }

  // replace left
  for (let i = currIndex - 1; i >= 0; i--) {
    if (isNaN(+lines[lineIndex][i])) break

    number = lines[lineIndex][i] + number
    replaceNumberWithDot(i, lineIndex)
  }

  return +number
};

const replaceNumberWithDot = (currIndex, lineIndex) => {
  const arr = lines[lineIndex].split('')
  arr.splice(currIndex, 1, '.')
  const newStr = arr.join('')
  lines[lineIndex] = newStr
}

console.log(part2());