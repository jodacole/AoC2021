const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(part1(data));
  }
});

function part1(data) {
  let fishes = data.split(",").map((f) => parseInt(f, 10));

  const days = 80;
  for (let i = 0; i < days; i++) {
    console.log(fishes[0]);
    fishes = fishes.map((f) => f - 1);
    let newFishes = fishes.reduce((total, fish) => {
      return fish < 0 ? total + 1 : total;
    });
    fishes = fishes.map((f) => (f < 0 ? 6 : f));
    fishes = fishes.concat(new Array(newFishes).fill(7));
  }

  return fishes.length;
}
