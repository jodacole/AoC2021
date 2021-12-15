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
  let crabs = data.split(",").map((s) => parseInt(s, 10));
  let lastFuelCost = Infinity;
  let fuelCost = (guess) => {
    return _(crabs)
      .map((position) => Math.abs(position - guess))
      .sum();
  };
  currGuess = 0;
  currFuelCost = fuelCost(currGuess);
  while (currFuelCost <= lastFuelCost) {
    currGuess++;
    lastFuelCost = currFuelCost;
    currFuelCost = fuelCost(currGuess);
  }
  return fuelCost(currGuess - 1);
}

function part2(data) {
  let crabs = data.split(",").map((s) => parseInt(s, 10));
  let lastFuelCost = Infinity;
  let fuelCost = (guess) => {
    return _(crabs)
      .map((position) => {
        let n = Math.abs(position - guess);
        return (n * (n + 1)) / 2;
      })
      .sum();
  };
  currGuess = 0;
  currFuelCost = fuelCost(currGuess);
  while (currFuelCost <= lastFuelCost) {
    currGuess++;
    lastFuelCost = currFuelCost;
    currFuelCost = fuelCost(currGuess);
  }
  return fuelCost(currGuess - 1);
}
