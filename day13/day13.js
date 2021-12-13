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

function processInput(data) {
  let [dots, folds] = data.split("\n\n");
  dots = dots.split("\n").map((d) => d.split(",").map((s) => parseInt(s, 10)));
  folds = folds
    .split("\n")
    .map((f) => _.last(f.split(" ")))
    .map((f) => {
      return { axis: f[0], val: parseInt(f.substring(2), 10) };
    });
  return { dots: dots, folds: folds };
}

function part1(data) {
  let { dots, folds } = processInput(data);
  for (const fold of folds) {
    dots = dots.map((d) => {
      if (fold.axis === "x") {
        d[0] = fold.val - Math.abs(d[0] - fold.val);
      } else {
        d[1] = fold.val - Math.abs(d[1] - fold.val);
      }
      return d;
    });
    return _.uniqBy(dots, (d) => d.toString()).length;
  }
}

function part2(data) {
  let { dots, folds } = processInput(data);
  for (const fold of folds) {
    dots = _(dots)
      .map((d) => {
        if (fold.axis === "x") {
          d[0] = fold.val - Math.abs(d[0] - fold.val);
        } else {
          d[1] = fold.val - Math.abs(d[1] - fold.val);
        }
        return d;
      })
      .tap(translateToOrigin)
      .uniqBy((d) => d.toString())
      .value();
  }
  return printDots(dots);
}

function translateToOrigin(dots) {
  [minX, minY] = dots.reduce(
    (min, next) => {
      min[0] = next[0] < min[0] ? next[0] : min[0];
      min[1] = next[1] < min[1] ? next[1] : min[1];
      return min;
    },
    [Infinity, Infinity]
  );
  return dots.map((d) => [d[0] - minX, d[1] - minY]);
}

function printDots(dots) {
  const [maxX, maxY] = dots.reduce(
    (max, next) => {
      max[0] = next[0] > max[0] ? next[0] : max[0];
      max[1] = next[1] > max[1] ? next[1] : max[1];
      return max;
    },
    [-Infinity, -Infinity]
  );
  let result = [...Array(maxX + 1)].map((e) => Array(maxY + 1).fill(" "));
  for (let dot of dots) {
    _.set(result, dot, "#");
  }
  result = result[0].map((_, colIndex) => result.map((row) => row[colIndex])); //transpose
  return result.map((row) => row.join("")).join("\n");
}
