const fs = require("fs");
const _ = require("lodash");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(part1(data));
  }
});

function processData(data) {
  return data.split("\n").map((line) =>
    line
      .split(" -> ")
      .map((coord) => coord.split(",").map((str) => parseInt(str, 10)))
      .map((coord) => {
        return { x: coord[0], y: coord[1] };
      })
  );
}

function part1(data) {
  lines = processData(data).filter(
    (line) => line[0].x === line[1].x || line[0].y === line[1].y
  );
  let squaresToNumVents = {};
  for (let line of lines) {
    currSquare = JSON.parse(JSON.stringify(line[0]));
    while (!_.isEqual(currSquare, line[1])) {
      let key = "x" + currSquare.x + "y" + currSquare.y;
      squaresToNumVents[key] = squaresToNumVents[key] + 1 || 1;
      currSquare.x += Math.sign(line[1].x - currSquare.x);
      currSquare.y += Math.sign(line[1].y - currSquare.y);
    }
    let key = "x" + line[1].x + "y" + line[1].y;
    squaresToNumVents[key] = squaresToNumVents[key] + 1 || 1;
  }
  return Object.values(squaresToNumVents).filter((n) => n >= 2).length;
}
