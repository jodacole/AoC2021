const fs = require("fs");
const _ = require("lodash");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(part1(data));
    console.log(part2(data));
  }
});

function part1(data) {
  let octopi = data
    .split("\n")
    .map((l) => l.split("").map((oStr) => parseInt(oStr, 10)));

  const NUM_STEPS = 100;
  let totalFlashes = 0;
  for (let i = 0; i < NUM_STEPS; i++) {
    octopi = octopi.map((l) => l.map((o) => o + 1));

    let flashed = new Set();
    let tilesToFlash = getTilesToFlash(octopi, flashed);
    while (!_.isEmpty(tilesToFlash)) {
      tilesToFlash.forEach((n) => {
        _.set(octopi, n, 0);
        incrementAdjacent(octopi, flashed, ...n);
        flashed.add(n.toString());
      });
      tilesToFlash = getTilesToFlash(octopi, flashed);
    }
    totalFlashes += flashed.size;
  }
  return totalFlashes;
}

function part2(data) {
  let octopi = data
    .split("\n")
    .map((l) => l.split("").map((oStr) => parseInt(oStr, 10)));

  let step = 1;
  while (true) {
    octopi = octopi.map((l) => l.map((o) => o + 1));

    let flashed = new Set();
    let tilesToFlash = getTilesToFlash(octopi, flashed);
    while (!_.isEmpty(tilesToFlash)) {
      tilesToFlash.forEach((n) => {
        _.set(octopi, n, 0);
        incrementAdjacent(octopi, flashed, ...n);
        flashed.add(n.toString());
      });
      tilesToFlash = getTilesToFlash(octopi, flashed);
    }
    if (flashed.size === octopi.flat().length) {
      return step;
    }
    step++;
  }
}

function getTilesToFlash(octopi, flashed) {
  let result = [];
  for (let i = 0; i < octopi.length; i++) {
    for (let j = 0; j < octopi[0].length; j++) {
      if (octopi[i][j] > 9 && !flashed.has([i, j].toString())) {
        result.push([i, j]);
      }
    }
  }
  return result;
}

function incrementAdjacent(octopi, flashed, i, j) {
  for (dx of [-1, 0, 1]) {
    for (dy of [-1, 0, 1]) {
      if (
        (dx || dy) &&
        i + dx >= 0 &&
        i + dx < octopi.length &&
        j + dy >= 0 &&
        j + dy < octopi[0].length &&
        !flashed.has([i + dx, j + dy].toString())
      ) {
        octopi[i + dx][j + dy] += 1;
      }
    }
  }
}
