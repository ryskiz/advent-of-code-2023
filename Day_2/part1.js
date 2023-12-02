const part1 = () => {
  return lines.reduce((num, line) => num += getValidGame(line), 0)
}
const regex = /\d+\s.*?(?=,|$)/
const getValidGame = (line) => {
  const gameSplit = line.split(':')
  const gameId = +gameSplit[0].split('Game ')[1]
  const sets = gameSplit[1].split(/[,;]/)
  for (let i = 0; i < sets.length; i++) {
    const [num, color] = sets[i].trim().split(' ')
    if (+num > 12 && color === 'red') return 0
    if (+num > 13 && color === 'green') return 0
    if (+num > 14 && color === 'blue') return 0
  }

  return gameId
}

console.log(getValue())