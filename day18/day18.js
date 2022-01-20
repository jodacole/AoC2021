const fs = require("fs");
const _ = require("lodash");
const { parse } = require("querystring");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(part1(data));
    //console.log(part2(data));
  }
});

function processInput(data) {
  return data.split("\n").map((num) => {
    let result = {};
    let currPath = [];
    for (let char of num) {
      if (char === "[") {
        currPath.push("left");
      } else if (char === ",") {
        currPath.pop();
        currPath.push("right");
      } else if (char === "]") {
        currPath.pop();
      } else {
        _.set(result, currPath, parseInt(char, 10));
      }
    }
    return result;
  });
}

function part1(data) {
  const snailNums = processInput(data);
  console.log(_.get(snailNums[0], ["left"]));
  return JSON.stringify(snailNums[0], null, 2);
}

function reduce(snailNum) {}

function explode(snailNum) {
  const agenda = [["left"], ["right"]];
  while (!_.isEmpty(agenda)) {
    currPath = agenda.unshift();
    if (currPath.length > 4) {
    }
  }
}

function isNumber(obj) {
  return Number.isInteger(obj);
}
