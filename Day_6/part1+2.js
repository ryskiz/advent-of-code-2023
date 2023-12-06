const part1 = () => {
  const total = []
  input.forEach(([time, recordDistance]) => {
    let waysToWin = 0
    for (let i = 1; i <= time; i++) {
      if (buttonHoldWin(i, time, recordDistance)) waysToWin += 1
    }
    if (waysToWin) total.push(waysToWin)
  })

  return total.reduce((prev, curr) => prev * curr, 1)
}

const buttonHoldWin = (holdTime, time, recordDistance) => {
  const distanceToTravel = time - holdTime
  const distanceTraveled = holdTime * distanceToTravel
  return distanceTraveled > recordDistance
}

console.log(part1())