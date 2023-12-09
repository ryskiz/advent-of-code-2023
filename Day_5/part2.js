const part2 = () => {
  const seedNumbers = lines.shift().split("seeds: ")[1].split(" ");
  const seedRanges = getSeedRanges(seedNumbers);
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
    const [destination, source, range] = line.split(" ");
    categoryMappings[currentCategory].push([+destination, +source, +range]);
  }

  const categoryProgression = Object.keys(categoryMappings);
  let lowestNum = null;
  for (let i = 0; i < seedRanges.length; i++) {
    const seedRange = seedRanges[i];
    const lowestLocationNumber = getLowestLocationNumber(
      [[...seedRange, "seed-to-soil"]],
      categoryMappings,
      categoryProgression
    );

    lowestNum = getLowerNum(lowestNum, lowestLocationNumber);
  }

  return lowestNum;
};

function getLowestLocationNumber(
  seedRange,
  categoryMappings,
  categoryProgression
) {
  let lowestRangeNumber = null;
  while (seedRange.length) {
    const seed = seedRange.shift();
    const currentSeedRange = [seed[0], seed[1]];
    const currentCategory = seed[2];
    const currentCategoryMappings = categoryMappings[currentCategory];
    for (let i = 0; i < currentCategoryMappings.length; i++) {
      const [destination, source, range] = currentCategoryMappings[i];
      const { overlapped, outliers } = getInRangeSeeds(
        currentSeedRange,
        [source, range],
        destination
      );

      // Keep the seed outliers falling through the current iteration
      if (outliers && outliers.length) {
        outliers.forEach((outlier) => {
          if (currentCategory === "humidity-to-location" && i === currentCategoryMappings.length - 1) {
            lowestRangeNumber = getLowerNum(lowestRangeNumber, outlier[0]);
          } else {
            const next = i === currentCategoryMappings.length - 1 ? categoryProgression[categoryProgression.indexOf(currentCategory) + 1] : currentCategory
            seedRange.push([...outlier, next]);
          }
        })
      }

      // Map the overlapped numbers and break
      if (overlapped) {
        if (currentCategory === "humidity-to-location") {
          lowestRangeNumber = getLowerNum(lowestRangeNumber, overlapped.start);
        } else {
          const nextCategory =categoryProgression[categoryProgression.indexOf(currentCategory) + 1];
          seedRange.push([overlapped.start, overlapped.range, nextCategory]);
        }
        break;
      }

      if (currentCategory === "humidity-to-location" && i === currentCategoryMappings.length - 1) {
        lowestRangeNumber = getLowerNum(lowestRangeNumber, currentSeedRange[0]);
      } else if (i === currentCategoryMappings.length - 1) {
        const nextCategory = categoryProgression[categoryProgression.indexOf(currentCategory) + 1];
        seedRange.push([currentSeedRange[0], currentSeedRange[1], nextCategory]);
      }
    }
  }

  return lowestRangeNumber;
}

function getInRangeSeeds(seedRangeNumbers, sourceRangeNumbers, destination) {
  const [seedStart, seedRange] = seedRangeNumbers;
  const [sourceStart, sourceRange] = sourceRangeNumbers;
  const seedMax = seedStart + seedRange;
  const sourceMax = sourceStart + sourceRange;
  let outliers = [];
  let overlapped = null;

  // In between
  if (seedStart >= sourceStart && seedMax <= sourceMax) {
    // in between no outliers because everything is matched
    overlapped = { start: destination + (seedStart - sourceStart), range: seedRange };
  } else if (seedStart < sourceStart && seedMax <= sourceMax && seedMax >= sourceStart) { // Bottom
    outliers.push([seedStart, (sourceStart - 1) - seedStart]);
    overlapped = { start: destination, range: seedMax - sourceStart };
  } else if (seedStart <= sourceMax && seedMax > sourceMax && sourceStart <= seedStart) { // Top
    outliers.push([sourceMax + 1, seedMax - (sourceMax + 1)]);
    overlapped = { start: destination + (seedStart - sourceStart), range: sourceMax - seedStart };
  } else if (seedStart < sourceStart && seedMax > sourceMax) {
    // Complete Overlap
    outliers.push([seedStart, sourceStart - 1 - seedStart]); // bottom outlier
    outliers.push([sourceMax + 1, seedMax - (sourceMax + 1)]); // top outlier
    overlapped = { start: destination, range: sourceRange };
  }

  return { overlapped, outliers };
}

function getSeedRanges(seeds) {
  const seedRanges = [];
  for (let i = 1; i < seeds.length; i += 2) {
    seedRanges.push([+seeds[i - 1], +seeds[i]]);
  }
  return seedRanges;
}

function getLowerNum(baseNum, newNum) {
  if (!baseNum) return newNum;
  return Math.min(baseNum, newNum);
}

console.log(part2());
