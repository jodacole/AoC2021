const day1 = require("./day1/day1.js");
const day2 = require("./day2/day2.js");
const day3 = require("./day3/day3.js");
const day4 = require("./day4/day4.js");
const day5 = require("./day5/day5.js");
const day6 = require("./day6/day6.js");
const day7 = require("./day7/day7.js");
const day8 = require("./day8/day8.js");
const day9 = require("./day9/day9.js");
const day10 = require("./day10/day10.js");
const day11 = require("./day11/day11.js");
const day12 = require("./day12/day12.js");

const DAYS = 12;

for (let d = 1; d <= DAYS; d++) {
  const data = eval(`day${d}.getInput()`);
  console.time(`day${d}_part1`);
  day1.part1(data);
  console.timeEnd(`day${d}_part1`);
  console.time(`day${d}_part2`);
  day1.part2(data);
  console.timeEnd(`day${d}_part2`);
}
