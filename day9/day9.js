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
  const grid = data
    .split("\n")
    .map((r) => r.split("").map((r) => parseInt(r, 10)));

  let risk = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const isLowPoint =
        grid[i][j] < _.get(grid, [i + 1, j], Infinity) &&
        grid[i][j] < _.get(grid, [i - 1, j], Infinity) &&
        grid[i][j] < _.get(grid, [i, j + 1], Infinity) &&
        grid[i][j] < _.get(grid, [i, j - 1], Infinity);
      if (isLowPoint) {
        risk += 1 + grid[i][j];
      }
    }
  }
  return risk;
}

function part2(data) {
  const grid = data
    .split("\n")
    .map((r) => r.split("").map((r) => parseInt(r, 10)));

  let lowPoints = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const isLowPoint =
        grid[i][j] < _.get(grid, [i + 1, j], Infinity) &&
        grid[i][j] < _.get(grid, [i - 1, j], Infinity) &&
        grid[i][j] < _.get(grid, [i, j + 1], Infinity) &&
        grid[i][j] < _.get(grid, [i, j - 1], Infinity);
      if (isLowPoint) {
        lowPoints.push([i, j]);
      }
    }
  }

  basins = [];
  for (let lp of lowPoints) {
    basins.push(calcBasin(lp, grid));
  }
  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((p, n) => p * n);
}

function calcBasin(low, grid) {
  let visited = new Set();
  let agenda = [low];
  while (agenda.length > 0) {
    currPoint = agenda.shift();
    if (visited.has(currPoint.toString())) {
      continue;
    }
    visited.add(currPoint.toString());
    for (let dx of [1, -1]) {
      if (_.get(grid, [currPoint[0] + dx, currPoint[1]], 10) < 9) {
        agenda.push([currPoint[0] + dx, currPoint[1]]);
      }
    }
    for (let dy of [1, -1]) {
      if (_.get(grid, [currPoint[0], currPoint[1] + dy], 10) < 9) {
        agenda.push([currPoint[0], currPoint[1] + dy]);
      }
    }
  }
  return visited.size;
}
