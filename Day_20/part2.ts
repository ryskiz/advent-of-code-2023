// For my test case, must get least common multiple of:
// xj, qs, kz, and km -> where it sends a low pulse to gq (because gq is connected to rx)
// xj: 3733
// qs: 4019
// kz: 3911
// km: 4093

const gcd = (a: number, b: number) => {
  while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
  }
  return a;
}

const lcm = (a: number, b: number) => {
  return a * b / gcd(a, b);
}

console.log([3733, 4019, 3911, 4093].reduce((acc, curr) => lcm(acc, curr), 1));