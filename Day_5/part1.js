const part1 = () => {
  const seedNumbers = lines.shift().split("seeds: ")[1].split(" ");
  const categoryRegex = /\-to\-/g;
  const categoryMappings = {};

  let currentCategory = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Reset category on empty line
    if (line === "") {
      currentCategory = null;
      continue;
    }

    // Set current category on category line
    if (line.match(categoryRegex)) {
      currentCategory = line.split(" map:")[0];
      continue;
    }

    // Init category
    categoryMappings[currentCategory] = categoryMappings[currentCategory] || [];

    // push line to that category
    categoryMappings[currentCategory].push(line);
  }

  const categoryProgression = Object.keys(categoryMappings);
  let lowestNum = null;
  for (let i = 0; i < seedNumbers.length; i++) {
    const seed = seedNumbers[i];
    const locationNumber = getLocationNumberForSeed(
      seed,
      categoryMappings,
      categoryProgression
    );

    if (!lowestNum) lowestNum = locationNumber;
    lowestNum = Math.min(lowestNum, locationNumber);
  }

  return lowestNum;
};

const getLocationNumberForSeed = (
  seedNumber,
  categoryMappings,
  categoryProgression
) => {
  let source = +seedNumber;
  for (let i = 0; i < categoryProgression.length; i++) {
    const catName = categoryProgression[i];
    for (let j = 0; j < categoryMappings[catName].length; j++) {
      const line = categoryMappings[catName][j];
      const [destStart, sourceStart, range] = line.split(" ");
      // If source number is within range of source start get mapped dest number
      if (source >= Number(sourceStart) && source <= Number(sourceStart) + Number(range)) {
        source = Number(destStart) + (source - Number(sourceStart));
        break
      }
    }
  }

  return source;
};

console.log(part1());
