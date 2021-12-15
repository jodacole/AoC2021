const fs = require("fs");
const _ = require("lodash");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(part1("3,4,3,1,2"));
    console.log(part1(data));
    console.log(part2("3,4,3,1,2"));
    console.log(part2(data));
  }
});

function part1(data) {
  let fishes = data.split(",").map((f) => parseInt(f, 10));

  const days = 80;
  for (let i = 0; i < days; i++) {
    fishes = _.map(fishes, (f) => f - 1);
    let newFishes = _.reduce(
      fishes,
      (total, fish) => {
        return fish < 0 ? total + 1 : total;
      },
      0
    );
    fishes = _.map(fishes, (f) => (f < 0 ? 6 : f));
    fishes = fishes.concat(new Array(newFishes).fill(8));
  }

  return fishes.length;
}

function part2(data) {
  let fishes = data.split(",").map((f) => parseInt(f, 10));
  fishTimers = new Array(9).fill(0);
  fishes.map((f) => (fishTimers[f] += 1));
  const days = 256;
  for (let d = 0; d < days; d++) {
    const numZeros = fishTimers[0];
    for (let i = 0; i < 8; i++) {
      fishTimers[i] = fishTimers[i + 1];
    }
    fishTimers[6] += numZeros;
    fishTimers[8] = numZeros;
  }
  return _.sum(fishTimers);
}
