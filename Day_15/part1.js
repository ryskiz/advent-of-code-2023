const part1 = () => {
  const parts = line.split(',')
  let total = 0
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const split = part.split('')
    total += split.reduce((prev, curr) => {
      let calc = curr.charCodeAt(0) + prev
      calc *= 17
      calc = calc % 256
      prev = calc
      return prev
    }, 0)
  }
  return total
}

console.log(part1())