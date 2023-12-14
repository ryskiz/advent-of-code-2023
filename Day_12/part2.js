
function getPossibleLocations(trimmedLocations, index, allNums) {
  const currentNum = allNums[index]
  const positions = {}

  // Handle case of there only being one position
  const allHashtagGroups = trimmedLocations.split(/\?|\./g)
  for (let i = 0; i < allHashtagGroups.length; i++) {
    if (allHashtagGroups[i].length === currentNum && trimmedLocations.length === currentNum) {
      return {
        str: 
      }
    }
  }

  const allQuestionGroups = trimmedLocations.split('\.|#')

}

function trimLocations(locations, currIndex, nums) {
  const roomTakenBehind = nums.slice(0, currIndex).reduce((prev, curr) => prev += curr + 1, 0)
  const roomTakenAhead = nums.slice(currIndex + 1).reduce((prev, curr) => prev += curr + 1, 0)
  console.log(roomTakenBehind, roomTakenAhead)
  const step1 = locations.split('').slice(roomTakenBehind)
  const end = step1.length - roomTakenAhead
  const final = step1.slice(0, end)

  return final
}

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
      result *= i;
  }
  return result;
}

function combinations(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}
