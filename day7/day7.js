const fs = require("fs");
const _ = require("lodash");
const { parse } = require("path");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(part1(data));
    //console.log(part2(data));
  }
});

function part1(data) {
  let crabList = data.split(",").map((s) => parseInt(s, 10));
  let average1 = Math.ceil(_.sum(crabList) / crabList.length);
  let average2 = Math.floor(_.sum(crabList) / crabList.length);
  return [
    _.sum(crabList.map((c) => Math.abs(c - average1))),
    _.sum(crabList.map((c) => Math.abs(c - average2))),
  ];
}
