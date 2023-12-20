const part1 = () => {
  const ruleObj = {};

  for (let i = 0; i < rules.length; i++) {
    rule = rules[i];
    const [key, operations] = rule.split(/{|}/);
    ruleObj[key] = operations.split(",");
  }

  let sum = 0;
  for (let i = 0; i < parts.length; i++) {
    const checkedPart = runPartWorkflow(parts[i], ruleObj);
    if (checkedPart) {
      sum += Object.values(checkedPart).reduce(
        (prev, curr) => (prev += curr),
        0
      );
    }
  }
  return sum;
};

const greaterThan = />/;
const lessThan = /</;

function runPartWorkflow(part, ruleObj) {
  const [_, raw] = part.split(/{|}/);
  const parsedParts = raw.split(",").reduce((prev, curr) => {
    const [key, num] = curr.split("=");
    prev[key] = +num;
    return prev;
  }, {});

  let currKey = "in";
  while (true) {
    if (currKey === false || currKey === "R") return false;
    if (currKey === "A") return parsedParts;
    const currRule = ruleObj[currKey];
    currKey = evaluate(currKey, currRule, parsedParts);
  }
}

function evaluate(currKey, currRule, parsedParts) {
  for (let i = 0; i < currRule.length; i++) {
    const rule = currRule[i];
    if (rule === "A") return "A";
    if (rule === "R") return false;

    if (!greaterThan.test(rule) && !lessThan.test(rule)) {
      currKey = rule;
      break;
    }

    const [check, result] = rule.split(":");
    if (greaterThan.test(check)) {
      const [partKey, num] = check.split(">");
      if (parsedParts[partKey] > +num) {
        currKey = result;
        break;
      }
    } else if (lessThan.test(check)) {
      const [partKey, num] = check.split("<");
      if (parsedParts[partKey] < +num) {
        currKey = result;
        break;
      }
    } else {
      currKey = result;
      break;
    }
  }
  return currKey;
}

console.log(part1());
