const greaterThan = />/;
const lessThan = /</;

const part2 = () => {
  const ruleObj = {};

  for (let i = 0; i < rules.length; i++) {
    rule = rules[i];
    const [key, operations] = rule.split(/{|}/);
    ruleObj[key] = operations.split(",");
  }

  const initialParts = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000], currentKey: 'in' }
  const successfulRanges = []

  const queue = [initialParts]
  while(queue.length) {
    const partRange = queue.shift()
    const { currentKey } = partRange
    if (currentKey === "R") {
      continue // skip because this range failed
    }
    if (currentKey === "A") {
      successfulRanges.push(partRange)
      continue
    }

    const currRule = ruleObj[currentKey]
    let currentPartRange = partRange
    for (let i = 0; i < currRule.length; i++) {
      const rule = currRule[i];
      if (rule === "A") {
        queue.push({
          ...currentPartRange,
          currentKey: "A",
        })
        break
      }
      if (rule === "R") {
        break
      }
  
      if (!greaterThan.test(rule) && !lessThan.test(rule)) {
        queue.push({
          ...currentPartRange,
          currentKey: rule,
        })
        break;
      }
  
      const [check, result] = rule.split(":");
      if (greaterThan.test(check)) {
        const [partKey, num] = check.split(">");
        if (isInRange(currentPartRange[partKey], +num)) {
          // Get in range and push to queue and everything else let fall through
          const { inRange, outlier } = getInRangeNumbahs(currentPartRange[partKey], +num, true)
          queue.push({
            ...currentPartRange,
            currentKey: result,
            [partKey]: inRange
          })

          currentPartRange = {
            ...currentPartRange,
            [partKey]: outlier
          }
        }
      } else if (lessThan.test(check)) {
        const [partKey, num] = check.split("<");
        if (isInRange(currentPartRange[partKey], +num)) {
          // Get in range and push to queue and everything else let fall through
          const { inRange, outlier } = getInRangeNumbahs(currentPartRange[partKey], +num, false)
          queue.push({
            ...currentPartRange,
            currentKey: result,
            [partKey]: inRange
          })

          currentPartRange = {
            ...currentPartRange,
            [partKey]: outlier
          }
        }
      } else {
        queue.push({
          ...currentPartRange,
          currentKey: result
        })
        break;
      }
    }
  }

  return calcPermutations(successfulRanges)
};

function calcPermutations(successfulRanges) {
  return successfulRanges.reduce((prev, curr) => {
    delete curr.currentKey
    prev += Object.values(curr).reduce((prev2, curr2) => {
      const [lower, upper] = curr2
      prev2 = prev2 * ((upper - lower) + 1)
      return prev2
    }, 1)
    return prev
  }, 0)
}

function isInRange(range, num) {
  const [lower, upper] = range
  return num >= lower && num <= upper
}

function getInRangeNumbahs(range, num, isGreaterThan) {
  const [lower, upper] = range
  if (isGreaterThan) {
    return { inRange: [num + 1, upper], outlier: [lower, num] }
  }
  return { inRange: [lower, num - 1], outlier: [num, upper] }
}

console.log(part2());
