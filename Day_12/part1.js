const part1 = () => {
  return lines.reduce((prev, curr) => prev += getPermutations(curr), 0)
};

function getPermutations(line) {
  const [locations, nums] = line.split(' ')
  
  const sets = nums.split(',')
  const parsedSets = sets.map((n) => +n) // +1 for necessary space
  const validRegex = buildGroupRegex(parsedSets)
  const knownSpotsRegex = buildKnownSpotsRegexStr(locations)

  const calculated = {}
  let possibleLocations = 0
  for (let i = 0; i < sets.length; i++) {
    const num = +sets[i]

    possibleLocations *= getPossibleLocations(trimmedLocations, num, i, parsedSets)
    calculated[num] = possibleLocations
  }
  return possibleLocations
}

function buildKnownSpotsRegexStr(location) {
  let regexStr = ''
  for (let i = 0; i < location.length; i++) {
    if (location[i] !== '?') {
      regex += `\\${location[i]}`
    } else {
      regex += '.'
    }
  }
  return regexStr
}

function buildGroupRegexStr(sets) {
  let regexStr = ''
  for (let i = 0; i < sets.length; i++) {
    regexStr += `#{${sets[i]}}${i === sets.length - 1 ? '' : `\\.+`}`
  }
  return regexStr
}

function moveRightToLeft(start, end, str, offset) {
  const tracked = {}
  const group = str.slice(start, end + 1)
  let matches = 0
  for(let i = start; i >= 0; i--) {
    console.log('????', i)
    let base = new Array(str.length - offset).fill('.')
    base.splice(i, group.length, group)
    let newCopy = base.join('')
    newCopy += str.slice(str.length - offset)
    console.log(newCopy)

    if (!tracked[newCopy]) {
      matches += 1
    }

    tracked[newCopy] = true
  }
}

console.log(part1())
