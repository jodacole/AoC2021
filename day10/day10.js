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

const PAIRS = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const SCORES1 = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

function part1(data) {
  const lines = data.split("\n");

  let score = 0;
  for (line of lines) {
    let stack = [];
    for (char of line) {
      if (_.keys(PAIRS).includes(char)) {
        stack.push(char);
      } else {
        let top = stack.pop();
        if (char !== PAIRS[top]) {
          score += SCORES1[char];
          break;
        }
      }
    }
  }
  return score;
}

const SCORES2 = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function part2(data) {
  const lines = data.split("\n");

  let scores = [];
  for (line of lines) {
    let stack = [];
    let isCorrupted = false;
    for (char of line) {
      if (_.keys(PAIRS).includes(char)) {
        stack.push(char);
      } else {
        let top = stack.pop();
        if (char !== PAIRS[top]) {
          isCorrupted = true;
          break;
        }
      }
    }
    if (!isCorrupted) {
      let score = 0;
      while (!_.isEmpty(stack)) {
        score *= 5;
        score += SCORES2[PAIRS[stack.pop()]];
      }
      scores.push(score);
    }
  }
  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
}
