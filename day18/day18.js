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
  return data.split("\n").map((num) => {
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
  });
}

function part1(data) {
  const snailNums = processInput(data);
  console.log(JSON.stringify(snailNums[0], null, 2));
  // return snailNumToString(snailNums[0]);
  return snailNumToString(reduce(snailNums[0]));
}

function reduce(snailNum) {
  console.log(snailNumToString(snailNum));
  const agenda = [["r"], ["l"]];
  let pathToSplittable = false;
  while (!_.isEmpty(agenda)) {
    const currPath = agenda.pop();
    const valueAtCurrPath = _.get(snailNum, currPath);
    if (valueAtCurrPath && currPath.length === 5) {
      console.log("exploding...");
      explode(snailNum, currPath);
      return reduce(snailNum);
    } else if (!Number.isInteger(valueAtCurrPath)) {
      agenda.push(currPath.concat("r"));
      agenda.push(currPath.concat("l"));
    } else if (!pathToSplittable && valueAtCurrPath >= 10) {
      pathToSplittable = currPath;
    }
  }
  if (pathToSplittable) {
    console.log("splitting...");
    split(snailNum, pathToSplittable);
    return reduce(snailNum);
  }
  return snailNum;
}

function split(snailNum, pathToSplittable) {
  const valAtPath = _.get(snailNum, pathToSplittable);
  _.set(snailNum, pathToSplittable, {
    l: Math.floor(valAtPath / 2),
    r: Math.ceil(valAtPath / 2),
  });
}

function explode(snailNum, currPath) {
  const leftDebris = _.get(snailNum, currPath.slice(0, -1).concat("l"));
  const rightDebris = _.get(snailNum, currPath.slice(0, -1).concat("r"));
  let tempPath = currPath.slice(0, -2);
  let leftDebrisAdded = false;
  let rightDebrisAdded = false;
  while (tempPath) {
    currLeftVal = _.get(snailNum, tempPath.concat("l"));
    if (!leftDebrisAdded && Number.isInteger(currLeftVal)) {
      _.set(snailNum, tempPath.concat("l"), currLeftVal + leftDebris);
      leftDebrisAdded = true;
    }

    currRightVal = _.get(snailNum, tempPath.concat("r"));
    if (!rightDebrisAdded && Number.isInteger(currRightVal)) {
      _.set(snailNum, tempPath.concat("r"), currRightVal + rightDebris);
      rightDebrisAdded = true;
    }
    if (_.isEmpty(tempPath)) {
      tempPath = false;
    } else {
      tempPath.pop();
    }
  }
  _.set(snailNum, currPath.slice(0, -1), 0);
}

function snailNumToString(snailNum) {
  if (!snailNum) {
    return snailNum;
  }
  result = "[";
  if (Number.isInteger(snailNum.l)) {
    result += snailNum.l;
  } else {
    result += snailNumToString(snailNum.l);
  }
  result += ",";
  if (Number.isInteger(snailNum.r)) {
    result += snailNum.r;
  } else {
    result += snailNumToString(snailNum.r);
  }
  return result + "]";
}
