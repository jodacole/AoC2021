const fs = require("fs");
const _ = require("lodash");
const path = require("path");

if (require.main === module) {
  fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(part1Attempt2(data));
    console.log(part2Attempt2(data));
  });
}

//Correct Answer: 1766
function part1Attempt1(data) {
  result = 0;
  const numList = data.split("\n").map((str) => parseInt(str, 10));
  for (let i = 0; i < numList.length; i++) {
    if (numList[i + 1] && numList[i + 1] > numList[i]) {
      result++;
    }
  }
  return result;
}

function part1Attempt2(data) {
  const numList = data.split("\n").map((str) => parseInt(str, 10));
  return numList.reduce(
    (store, next) => {
      if (next > store.prev) {
        return { sum: store.sum + 1, prev: next };
      } else {
        return { sum: store.sum, prev: next };
      }
    },
    { sum: 0, prev: Infinity }
  ).sum;
}

//Correct Answer: 1797
function part2Attempt1(data) {
  result = 0;
  const numList = data.split("\n").map((str) => parseInt(str, 10));
  const threeSumList = (() => {
    let result = [];
    for (let i = 0; i + 2 < numList.length; i++) {
      result.push(numList.slice(i, i + 3));
    }
    return result;
  })().map(_.sum);
  for (let i = 0; i < threeSumList.length; i++) {
    if (threeSumList[i + 1] && threeSumList[i + 1] > threeSumList[i]) {
      result++;
    }
  }
  return result;
}

function part2Attempt2(data) {
  const numList = data.split("\n").map((str) => parseInt(str, 10));
  return numList
    .map((e, i) => {
      let sumList = numList.slice(i, i + 3);
      return sumList.length === 3 ? _.sum(sumList) : null;
    })
    .filter((e) => e)
    .reduce(
      (store, next) => {
        if (next > store.prev) {
          return { sum: store.sum + 1, prev: next };
        } else {
          return { sum: store.sum, prev: next };
        }
      },
      { sum: 0, prev: Infinity }
    ).sum;
}

function getInput() {
  return fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");
}

exports.getInput = getInput;
exports.part1 = part1Attempt2;
exports.part2 = part2Attempt2;
