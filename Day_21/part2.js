// Stolen from scibuff's part 2
// https://pastebin.com/d0tD8Uwx
const simplifiedLagrange = (values) => {
  return {
    a: values[0] / 2 - values[1] + values[2] / 2,
    b: -3 * (values[0] / 2) + 2 * values[1] - values[2] / 2,
    c: values[0],
  };
};

const part2 = () => {
  const values = [3752, 33614, 93252]; // Quadratic solution here 0 = part1(65), 1 = part1(65 + 131), 2 = part1(65 + (2 * 131))
  const poly = simplifiedLagrange(values);
  const target = (26_501_365 - 65) / 131;
  return poly.a * target * target + poly.b * target + poly.c;
};

console.log(part2())