const lines = [
  "R 6 (#70c710)",
  "D 5 (#0dc571)",
  "L 2 (#5713f0)",
  "D 2 (#d2c081)",
  "R 2 (#59c680)",
  "D 2 (#411b91)",
  "L 5 (#8ceee2)",
  "U 2 (#caa173)",
  "L 1 (#1b58a2)",
  "U 2 (#caa171)",
  "R 2 (#7807d2)",
  "U 3 (#a77fa3)",
  "L 2 (#015232)",
  "U 2 (#7a21e3)",
];

const part1 = () => {
  return getVertices();
};

function getVertices() {
  const vertices = [];
  let currentCoords = [0, 0];
  lines.forEach((l) => {
    const [y, x] = currentCoords;
    const [direction, rawNum] = l.split(" ");
    const num = +rawNum;
    switch (direction) {
      case "R":
        currentCoords = [y, x + num];
        break;
      case "L":
        currentCoords = [y, x - num];
        break;
      case "D":
        currentCoords = [y + num, x];
        break;
      case "U":
        currentCoords = [y - num, x];
        break;
    }
    console.log(";wtf", currentCoords);
    vertices.push(currentCoords);
  });
  vertices.reverse()
  console.log(vertices)
  return shoelace(vertices)
}

function shoelace(vertices) {
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    sum1 = sum1 + vertices[i][0] * vertices[i + 1][1];
    sum2 = sum2 + vertices[i][1] * vertices[i + 1][0];
  }
  sum1 = sum1 + vertices[vertices.length - 1][0] * vertices[0][1];
  sum2 = sum2 + vertices[0][0] * vertices[vertices.length - 1][1];

  area = Math.abs(sum1 - sum2) / 2;
  return area;
}

console.log(part1());
