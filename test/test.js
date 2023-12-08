function getInRangeSeeds(seedRangeNumbers, sourceRangeNumbers) {
  const [seedStart, seedRange] = seedRangeNumbers
  const [sourceStart, sourceRange] = sourceRangeNumbers
  const seedMax = seedStart + seedRange
  const sourceMax = sourceStart + sourceRange
  let outliers = []
  let overlapped = null

  // In between
  if (seedStart >= sourceStart && seedMax <= sourceMax) { // in between no outliers because everything is matched
    overlapped = { start: seedStart, range: seedRange }
  } else if (seedStart < sourceStart && seedMax <= sourceMax) { // Bottom
    console.log('bottom')
    outliers.push([seedStart, (sourceStart - 1) - seedStart])
    overlapped = { start: sourceStart, range: seedMax - sourceStart }
  } else if (seedStart >= sourceStart && seedMax > sourceMax) { // Top
    outliers.push([sourceMax + 1, seedMax - (sourceMax - 1)])
    overlapped = { start: seedStart, range: sourceMax - seedStart }
  } else if (seedStart < sourceStart && seedMax > sourceMax) { // All encompassing
    outliers.push([seedStart, (sourceStart - 1) - seedStart]) // bottom
    outliers.push([sourceMax + 1, seedMax - (sourceMax + 1)]) // top
    overlapped = { start: sourceStart, range: sourceRange }
  }

  return {
    overlapped,
    outliers
  }
}

console.log(getInRangeSeeds([50, 10], [40, 10]))