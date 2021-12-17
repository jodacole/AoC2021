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
  const [xmin, xmax, ymin, ymax] = data
    .replace("target area: ", "")
    .split(",")
    .map((s) =>
      s
        .replace(/[xy]=/, "")
        .split("..")
        .map((s) => parseInt(s, 10))
    )
    .flat();

  const V_MAX = 100;

  let highest = -Infinity;
  for (let x = 0; Math.abs(x) < V_MAX; x += Math.sign(xmax)) {
    for (let y = 0; Math.abs(y) < V_MAX; y++) {
      let position = [0, 0];
      let velocity = [x, y];
      let hi;
      while (position[1] >= ymin) {
        if (velocity[1] === 0) {
          hi = position[1];
        }
        if (position[1] <= ymax && position[0] >= xmin && position[0] <= xmax) {
          highest = Math.max(hi, highest);
          break;
        }
        position = position.map((v, ind) => v + velocity[ind]);
        velocity[0] += -1 * Math.sign(velocity[0]);
        velocity[1]--;
      }
    }
  }

  return highest;
}

function part2(data) {
  const [xmin, xmax, ymin, ymax] = data
    .replace("target area: ", "")
    .split(",")
    .map((s) =>
      s
        .replace(/[xy]=/, "")
        .split("..")
        .map((s) => parseInt(s, 10))
    )
    .flat();

  const V_MAX = 400;

  let numValidVelocities = 0;
  for (let x = 0; Math.abs(x) <= V_MAX; x += Math.sign(xmax)) {
    for (let y = -1 * V_MAX; Math.abs(y) <= V_MAX; y++) {
      let position = [0, 0];
      let velocity = [x, y];
      while (position[1] >= ymin) {
        if (position[1] <= ymax && position[0] >= xmin && position[0] <= xmax) {
          numValidVelocities++;
          break;
        }
        position = position.map((v, ind) => v + velocity[ind]);
        velocity[0] += -1 * Math.sign(velocity[0]);
        velocity[1]--;
      }
    }
  }

  return numValidVelocities;
}
