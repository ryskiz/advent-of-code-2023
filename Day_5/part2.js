// dear god
const lines = [
  "seeds: 79 14 55 13",
  "",
  "seed-to-soil map:",
  "50 98 2",
  "52 50 48",
  "",
  "soil-to-fertilizer map:",
  "0 15 37",
  "37 52 2",
  "39 0 15",
  "",
  "fertilizer-to-water map:",
  "49 53 8",
  "0 11 42",
  "42 0 7",
  "57 7 4",
  "",
  "water-to-light map:",
  "88 18 7",
  "18 25 70",
  "",
  "light-to-temperature map:",
  "45 77 23",
  "81 45 19",
  "68 64 13",
  "",
  "temperature-to-humidity map:",
  "0 69 1",
  "1 0 69",
  "",
  "humidity-to-location map:",
  "60 56 37",
  "56 93 4",
];

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
    const [destination, source, range] = lines.split(' ')
    categoryMappings[currentCategory].push([+destination, +source, +range]);
  }

  const categoryProgression = Object.keys(categoryMappings);
  let lowestNum = null;
  for (let i = 0; i < seedNumbers.length; i++) {
    const seedRange = seedNumbers[i];

    // if (!lowestNum) lowestNum = locationNumber;
    // lowestNum = Math.min(lowestNum, locationNumber);
  }

  return lowestNum;
};

function getInRangeSeeds(seedRangeNumbers, sourceRangeNumbers) {
  const [seedStart, seedRange] = seedRangeNumbers
  const [sourceStart, sourceRange] = sourceRangeNumbers
  const seedMax = seedStart + seedRange
  const sourceMax = sourceStart + sourceRange
  let outliers = []
  let overlapped = null
  let overlappedStart = null

  // In between
  if (seedStart >= sourceStart && seedMax <= sourceMax) {
    if (seedStart !== sourceStart) outliers.push([sourceStart, (seedStart - 1) - sourceStart])// outlier left
    if (seedMax !== sourceMax) outliers.push([seedMax + 1, ]) // outlier right
    const outlierLeft = []
    const outlierRight = []
    outliers = [outlierLeft, outlierRight]
    overlapped = { start: seedStart, range: seedRange }

  }

  return {
    overLapped,
    outliers: []
  }
}

function getSeedRanges(seeds) {
  const seedRanges = [];
  for (let i = 1; i < seeds.length; i += 2) {
    seedRanges.push([+seeds[i - 1], +seeds[i]]);
  }
  return seedRanges;
}

console.log(part2());
