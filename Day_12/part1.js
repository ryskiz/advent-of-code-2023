const part1 = () => {
  return lines.reduce((prev, curr) => (prev += getPermutations(curr)), 0);
};

function getPermutations(line) {
  const [locations, nums] = line.split(" ");

  const sets = nums.split(",");
  const parsedSets = sets.map((n) => +n);

  return buildPermutations(locations, 0, parsedSets, locations);
}

function buildPermutations(str, index, groups, originalString) {
  if (str.indexOf("?") === -1 && checkString(str, groups, originalString)) {
    return 1;
  }

  if (str[index] === "?") {
    const p1 = str.split("");
    const p2 = str.split("");
    p1[index] = ".";
    p2[index] = "#";
    return (
      buildPermutations(p1.join(""), index + 1, groups, originalString) +
      buildPermutations(p2.join(""), index + 1, groups, originalString)
    );
  }

  for (let i = index; i < str.length; i++) {
    if (str[i] === "?") {
      const p1 = str.split("");
      const p2 = str.split("");
      p1[i] = ".";
      p2[i] = "#";
      return (
        buildPermutations(p1.join(""), i + 1, groups, originalString) +
        buildPermutations(p2.join(""), i + 1, groups, originalString)
      );
    }
  }

  return 0;
}

function checkString(str, groups, originalString) {
  const parsed = str.split(".").filter((n) => !!n);
  if (parsed.length !== groups.length) return false;

  for (let i = 0; i < groups.length; i++) {
    if (parsed[i].length !== groups[i]) return false;
  }

  for (let i = 0; i < str.length; i++) {
    if (originalString[i] === "#" && str[i] !== "#") {
      return false;
    }
  }

  return true;
}

console.log(part1());
