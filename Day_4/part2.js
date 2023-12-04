const part2 = () => {
  const cardsMultiplier = {}
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const { numWins, cardNum } = getWinningNumbers(line)
    cardsMultiplier[+cardNum] = cardsMultiplier[+cardNum] || 0
    cardsMultiplier[+cardNum] = cardsMultiplier[+cardNum] + 1

    if (!numWins) continue

    for (let i = 1; i <= cardsMultiplier[+cardNum]; i++) {
      for (let j = 1; j <= numWins; j++) {
        const num = +cardNum + j
        cardsMultiplier[num] = cardsMultiplier[num] || 0
        cardsMultiplier[num] = cardsMultiplier[num] + 1
      }
    }
  }

  return Object.values(cardsMultiplier).reduce((prev, curr) => prev + curr, 0)
}

const getWinningNumbers = (line) => {
  let numWins = 0
  const [card, game] = line.split(':')
  const [_, cardNum] = card.split('Card ')
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

  return { numWins, cardNum: cardNum.trim() }
}

console.log(part2())