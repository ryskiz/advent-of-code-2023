const part2 = () => lines.reduce((num, line) => num += getPower(line), 0)

const getPower = (line) => {
  const gameSplit = line.split(':')
  const sets = gameSplit[1].split(/[,;]/)
  let maxRed = 0
  let maxGreen = 0
  let maxBlue = 0

  for (let i = 0; i < sets.length; i++) {
    const [num, color] = sets[i].trim().split(' ')
    if (color === 'red' && +num > maxRed) maxRed = +num
    if (color === 'green' && +num > maxGreen) maxGreen = +num
    if (color === 'blue' && +num > maxBlue) maxBlue = +num
  }

  return maxRed * maxGreen * maxBlue
}

console.log(part2())