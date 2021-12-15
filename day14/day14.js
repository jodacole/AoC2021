const fs = require("fs");
const { intersection, result } = require("lodash");
const _ = require("lodash");
const { start } = require("repl");

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
  let [startPolymer, temp] = data.split("\n\n");
  let insertionRules = {};
  temp.split("\n").forEach((rule) => {
    let [pair, insert] = rule.split(" -> ");
    insertionRules[pair] = insert;
  });
  return [startPolymer, insertionRules];
}

function part1(data) {
  const [startPolymer, insertionRules] = processInput(data);

  let pairCount = {};
  for (let i = 0; i < startPolymer.length - 1; i++) {
    const pair = startPolymer.substring(i, i + 2);
    _.set(pairCount, pair, _.get(pairCount, pair, 0) + 1);
  }
  const STEPS = 10;
  for (let i = 0; i < STEPS; i++) {
    let newPairCount = {};
    for (const pair in pairCount) {
      const insert = insertionRules[pair];
      [pair[0] + insert, insert + pair[1]].forEach((newPair) => {
        _.set(
          newPairCount,
          newPair,
          _.get(newPairCount, newPair, 0) + pairCount[pair]
        );
      });
    }
    pairCount = newPairCount;
  }
  const elementCounts = elementCount(pairCount);
  return (
    _.max(Object.values(elementCounts)) - _.min(Object.values(elementCounts))
  );
}

function part2(data) {
  const [startPolymer, insertionRules] = processInput(data);

  let pairCount = {};
  for (let i = 0; i < startPolymer.length - 1; i++) {
    const pair = startPolymer.substring(i, i + 2);
    _.set(pairCount, pair, _.get(pairCount, pair, 0) + 1);
  }
  const STEPS = 40;
  for (let i = 0; i < STEPS; i++) {
    let newPairCount = {};
    for (const pair in pairCount) {
      const insert = insertionRules[pair];
      [pair[0] + insert, insert + pair[1]].forEach((newPair) => {
        _.set(
          newPairCount,
          newPair,
          _.get(newPairCount, newPair, 0) + pairCount[pair]
        );
      });
    }
    pairCount = newPairCount;
  }
  const elementCounts = elementCount(pairCount);
  return (
    _.max(Object.values(elementCounts)) - _.min(Object.values(elementCounts))
  );
}

function elementCount(pairCount) {
  let result = {};
  for (const [pair, amt] of Object.entries(pairCount)) {
    _.set(result, pair[0], _.get(result, pair[0], 0) + amt);
    _.set(result, pair[1], _.get(result, pair[1], 0) + amt);
  }
  Object.keys(result).forEach((key) => {
    result[key] = Math.ceil(result[key] / 2);
  });
  return result;
}
