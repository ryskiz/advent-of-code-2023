function buildKnownSpotsRegexStr(location) {
  let regexStr = ''
  for (let i = 0; i < location.length; i++) {
    if (location[i] !== '?') {
      regexStr += `\\${location[i]}`
    } else {
      regexStr += '.'
    }
  }
  return regexStr
}


const groups = [[5, 5], [7, 7], [9, 11]]
const start = [9, 11]
const end = [5, 5]
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

const location = '.....#.#.###'
const nextLocation = '#.#.###.....'
function moveLeftToRight(start, end, str, offset) {
  const tracked = {}
  const group = str.slice(start, end + 1)
  let matches = 0
  for(let i = start; i < str.length - end; i++) {
    console.log('????', i)
    let base = new Array(str.length - offset).fill('.')
    base.splice(i, group.length, group)
    let newCopy = base.join('') + str.slice(str.length - offset)
    console.log(newCopy)

    if (!tracked[newCopy]) {
      matches += 1
    }

    tracked[newCopy] = true
  }
}

console.log(moveLeftToRight(0, 6, nextLocation, 0))