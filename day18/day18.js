const fs = require("fs");
const _ = require("lodash");

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
  return data
    .split("\n")
    .map((n) =>
      n
        .split("")
        .map((char) =>
          Number.isInteger(parseInt(char, 10)) ? parseInt(char, 10) : char
        )
    );
}

function part1(data) {
  const snailNums = processInput(data);
  console.log(snailNums.reduce(sumSnailNums).join(""));
  return magnitude(snailNums.reduce(sumSnailNums));
}

function magnitude(snailNum, firstCall = true) {
  const snailNumToTree = (num) => {
    let result = {};
    let currPath = [];
    for (let char of num) {
      if (char === "[") {
        currPath.push("l");
      } else if (char === ",") {
        currPath.pop();
        currPath.push("r");
      } else if (char === "]") {
        currPath.pop();
      } else {
        _.set(result, currPath, parseInt(char, 10));
      }
    }
    return result;
  };
  const snailNumTree = firstCall ? snailNumToTree(snailNum) : snailNum;
  if (!snailNumTree) {
    return snailNumTree;
  }
  let result = 0;
  if (Number.isInteger(snailNumTree.l)) {
    result += 3 * snailNumTree.l;
  } else {
    result += 3 * magnitude(snailNumTree.l, false);
  }
  if (Number.isInteger(snailNumTree.r)) {
    result += 2 * snailNumTree.r;
  } else {
    result += 2 * magnitude(snailNumTree.r, false);
  }
  return result;
}

function sumSnailNums(a, b) {
  if (a.length === 0) return b;
  if (b.length === 0) return a;
  return reduce(_.concat([], "[", a, ",", b, "]"));
}

function reduce(snailNum) {
  //console.log(snailNum.join(""));
  const exploded = explode(snailNum);
  if (!_.isEqual(exploded, snailNum)) {
    //console.log("exploding...");
    return reduce(exploded);
  }

  const splitted = split(snailNum);
  if (!_.isEqual(splitted, snailNum)) {
    //console.log("splitting...");
    return reduce(splitted);
  }

  return snailNum;
}

function split(snailNum) {
  for (let i = 0; i < snailNum.length; i++) {
    const char = snailNum[i];
    if (Number.isInteger(char) && char >= 10) {
      return _.concat(
        snailNum.slice(0, i),
        "[",
        Math.floor(char / 2),
        ",",
        Math.ceil(char / 2),
        "]",
        snailNum.slice(i + 1)
      );
    }
  }
  return snailNum;
}

function explode(snailNum) {
  let depth = 0;
  for (let i = 0; i < snailNum.length; i++) {
    const char = snailNum[i];
    if (char === "[") {
      depth++;
    } else if (char === "]") {
      depth--;
    }

    if (depth === 5) {
      let result = _.clone(snailNum);
      const leftDebris = snailNum[i + 1];
      const rightDebris = snailNum[i + 3];
      if (!Number.isInteger(leftDebris) || !Number.isInteger(rightDebris)) {
        console.log(leftDebris, rightDebris);
        throw "Could not parse debris to explode";
      }

      for (let left = i; left >= 0; left--) {
        if (Number.isInteger(snailNum[left])) {
          result[left] += leftDebris;
          break;
        }
      }

      for (let right = i + 4; right < snailNum.length; right++) {
        if (Number.isInteger(snailNum[right])) {
          result[right] += rightDebris;
          break;
        }
      }

      result = _.concat(result.slice(0, i), 0, result.slice(i + 5));
      return result;
    }
  }
  return _.clone(snailNum);
}
