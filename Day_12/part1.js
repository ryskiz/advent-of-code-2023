const part1 = () => {
  return lines.reduce((prev, curr) => prev += getPermutations(curr), 0)
};

function getPermutations(line) {
  const [locations, nums] = line.split(' ')
  
  const sets = nums.split(',')
  const parsedSets = sets.map((n) => +n) // +1 for necessary space
  const validRegex = buildRegex(locations, parsedSets)
  const calculated = {}
  let possibleLocations = 1
  for (let i = 0; i < sets.length; i++) {
    const num = +sets[i]
    if (calculated[num]) possibleLocations += calculated[num]
    const trimmedLocations = trimLocations(locations, i, parsedSets)
    possibleLocations *= getPossibleLocations(trimmedLocations, num, i, parsedSets)
    calculated[num] = possibleLocations
  }
  return possibleLocations
}

function buildRegexStr(sets) {
  let regexStr = ''
  for (let i = 0; i < sets.length; i++) {
    regexStr += `#{${sets[i]}}${i === sets.length - 1 ? '' : `\\.+`}`
  }
  return regexStr
}

const buildInitialString = (line, sets) => {
  const empty = new Array(line.length).fill('.')

  sets.forEach(num => {

  })
}

console.log(part1())
