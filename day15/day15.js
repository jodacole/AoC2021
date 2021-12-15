const fs = require("fs");
const _ = require("lodash");
const SortedArray = require("collections/sorted-array");

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
  const riskMap = data
    .split("\n")
    .map((line) => line.split("").map((c) => parseInt(c, 10)));

  const unvisited = new Set(
    riskMap
      .map((row, i) =>
        row.map((temp, j) => {
          return [i, j].toString();
        })
      )
      .flat()
  );

  const totalRisk = {};
  unvisited.forEach((node) => (totalRisk[node] = Infinity));
  totalRisk[[0, 0].toString()] = 0;

  let currNode = [0, 0].toString();
  let lowestRisks = new SortedArray(
    [],
    (a, b) => a === b,
    (a, b) => totalRisk[b] - totalRisk[a]
  );
  while (!_.isEmpty(unvisited)) {
    for (let neighbor of getNeighbors(currNode, riskMap)) {
      if (!unvisited.has(neighbor)) {
        continue;
      }
      if (
        totalRisk[currNode] + _.get(riskMap, nodeToCoords(neighbor)) <
        totalRisk[neighbor]
      ) {
        totalRisk[neighbor] =
          totalRisk[currNode] + _.get(riskMap, nodeToCoords(neighbor));
        lowestRisks.add(neighbor);
      }
    }
    unvisited.delete(currNode);
    currNode = lowestRisks.pop();
  }
  return totalRisk[[riskMap.length - 1, riskMap[0].length - 1].toString()];
}

function part2(data) {
  const partialRiskMap = data
    .split("\n")
    .map((line) => line.split("").map((c) => parseInt(c, 10)));
  const riskMap = calcFullRiskMap(partialRiskMap);

  const unvisited = new Set(
    riskMap
      .map((row, i) =>
        row.map((temp, j) => {
          return [i, j].toString();
        })
      )
      .flat()
  );

  const totalRisk = {};
  unvisited.forEach((node) => (totalRisk[node] = Infinity));
  totalRisk[[0, 0].toString()] = 0;

  let currNode = [0, 0].toString();
  let lowestRisks = new SortedArray(
    [],
    (a, b) => a === b,
    (a, b) => totalRisk[b] - totalRisk[a]
  );
  while (!_.isEmpty(unvisited)) {
    for (let neighbor of getNeighbors(currNode, riskMap)) {
      if (!unvisited.has(neighbor)) {
        continue;
      }
      if (
        totalRisk[currNode] + _.get(riskMap, nodeToCoords(neighbor)) <
        totalRisk[neighbor]
      ) {
        totalRisk[neighbor] =
          totalRisk[currNode] + _.get(riskMap, nodeToCoords(neighbor));
        lowestRisks.add(neighbor);
      }
    }
    unvisited.delete(currNode);
    currNode = lowestRisks.pop();
  }
  return totalRisk[[riskMap.length - 1, riskMap[0].length - 1].toString()];
}

function calcFullRiskMap(partialRiskMap) {
  const incrementRisk = (risk, inc) => {
    return ((risk - 1 + inc) % 9) + 1;
  };

  const rowWiseConcat = (arr1, arr2) => {
    return arr1.map((row, index) => row.concat(arr2[index]));
  };
  const columnWiseConcat = (arr1, arr2) => {
    return arr1.concat(arr2);
  };

  let fullRow = _.cloneDeep(partialRiskMap);
  for (let i = 1; i <= 4; i++) {
    let incrementedMap = partialRiskMap.map((row) =>
      row.map((c) => incrementRisk(c, i))
    );
    fullRow = rowWiseConcat(fullRow, incrementedMap);
  }
  let fullMap = _.cloneDeep(fullRow);
  for (let i = 1; i <= 4; i++) {
    let incrementedMap = fullRow.map((row) =>
      row.map((c) => incrementRisk(c, i))
    );
    fullMap = columnWiseConcat(fullMap, incrementedMap);
  }
  return fullMap;
}

function nodeToCoords(node) {
  return node.split(",").map((c) => parseInt(c, 10));
}

function getNeighbors(node, riskMap) {
  const coords = nodeToCoords(node);
  return _.compact([
    _.get(riskMap, [coords[0] + 1, coords[1]], false)
      ? [coords[0] + 1, coords[1]].toString()
      : false,
    _.get(riskMap, [coords[0] - 1, coords[1]], false)
      ? [coords[0] - 1, coords[1]].toString()
      : false,
    _.get(riskMap, [coords[0], coords[1] + 1], false)
      ? [coords[0], coords[1] + 1].toString()
      : false,
    _.get(riskMap, [coords[0], coords[1] - 1], false)
      ? [coords[0], coords[1] - 1].toString()
      : false,
  ]);
}
