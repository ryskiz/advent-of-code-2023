const boxes = {}

const part2 = () => {
  const parts = line.split(",");
  for (let i = 0; i <= 255; i++) {
    boxes[i] = { list: [], storedLens: {} } // storedLens = [key: true] // list -> [{lens: ab, focal: 1}]
  }

  const addRegex = /\=/
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const [lens, focal] = part.split(/-|=/)
    const boxNumber = hash(lens);

    if (addRegex.test(part)) {
      appendLensToBox(boxNumber, lens, focal)
    } else {
      removeLensFromBox(boxNumber, lens)
    }
  }

  return Object.keys(boxes).reduce((prev, curr) => {
    prev += getBoxCalc(boxes[curr], curr)
    return prev
  }, 0)
};

function getBoxCalc(box, boxNumber) {
  const { list } = box
  if (!list.length) return 0
  return list.reduce((prev, curr, index) => {
    prev += ((+boxNumber + 1) * (index + 1) * curr.focal)
    return prev
  }, 0)
}

function appendLensToBox(boxNumber, lens, focal) {
  const { storedLens } = boxes[boxNumber]
  if (storedLens[lens]) {
    const i = findLensIndex(lens, boxNumber)
    boxes[boxNumber].list[i].focal = focal
  } else {
    boxes[boxNumber].list.push({lens, focal})
    boxes[boxNumber].storedLens[lens] = true
  }
}

function removeLensFromBox(boxNumber, lens) {
  const { storedLens } = boxes[boxNumber]
  if (storedLens[lens]) {
    const i = findLensIndex(lens, boxNumber)
    boxes[boxNumber].list.splice(i, 1)
    delete boxes[boxNumber].storedLens[lens]
  }
}

function findLensIndex(lens, boxNumber) {
  for (let i = 0; i < boxes[boxNumber].list.length; i++) {
    if (boxes[boxNumber].list[i].lens === lens) return i
  }
}

function hash(part) {
  const split = part.split("");
  return split.reduce((prev, curr) => {
    let calc = curr.charCodeAt(0) + prev;
    calc *= 17;
    calc = calc % 256;
    prev = calc;
    return prev;
  }, 0);
}

console.log(part2())
