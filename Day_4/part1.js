const part1 = () => {
  return lines.reduce((num, line) => num += getWinningNumbers(line), 0)
}

const getWinningNumbers = (line) => {
  let numWins = 0
  const [_, game] = line.split(':')
  const [cardNums, winningNums] = game.split('|')
  const splitCardNums = cardNums.split(' ')
  const splitWinningNums = winningNums.split(' ')

  const allCardNums = {}
  splitCardNums.forEach((num) => {
    if (!isNaN(+num)) allCardNums[+num] = true
  })

  splitWinningNums.forEach((num) => {
    if (num !== '' && !isNaN(+num) && allCardNums[+num]) {
      numWins += 1
    }
  })

  if (!numWins) return 0
  if (numWins === 1) return 1
  return Math.pow(2, numWins - 1)
}

console.log(part1())


