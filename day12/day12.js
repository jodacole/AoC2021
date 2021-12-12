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
  let edges = data
    .split("\n")
    .map((e) => e.split("-"))
    .reduce((allEdges, next) => {
      allEdges[next[0]] = _.get(allEdges, next[0], []).concat(
        next[1] === "start" ? [] : next[1]
      );
      allEdges[next[1]] = _.get(allEdges, next[1], []).concat(
        next[0] === "start" ? [] : next[0]
      );
      return allEdges;
    }, {});
  return edges;
}

function part1(data) {
  const edges = processInput(data);
  let numPaths = 0;
  let agenda = [["start"]];
  while (!_.isEmpty(agenda)) {
    currPath = agenda.pop();
    if (_.last(currPath) === "end") {
      numPaths++;
      continue;
    }
    for (let cave of edges[_.last(currPath)] || []) {
      if (isUpper(cave) || !currPath.includes(cave)) {
        agenda.push(currPath.concat(cave));
      }
    }
  }
  return numPaths;
}

function part2(data) {
  const edges = processInput(data);
  let numPaths = 0;
  let agenda = [["start"]];
  while (!_.isEmpty(agenda)) {
    currPath = agenda.pop();
    if (_.last(currPath) === "end") {
      numPaths++;
      continue;
    }
    for (let cave of edges[_.last(currPath)] || []) {
      if (canBeAdded(currPath, cave)) {
        agenda.push(currPath.concat(cave));
      }
    }
  }
  return numPaths;
}

function canBeAdded(currPath, cave) {
  if (isUpper(cave)) {
    return true;
  }
  if (!currPath.includes(cave)) {
    return true;
  }
  smallCaves = currPath.filter((c) => !isUpper(c));
  return _.uniq(smallCaves).length === smallCaves.length;
}

function isUpper(str) {
  return str === str.toUpperCase();
}
