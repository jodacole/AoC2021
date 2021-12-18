const { performance } = require("perf_hooks");
const day1 = require("./day01/day01");
const day2 = require("./day02/day02.js");
// const day3 = require("./day3/day3.js");
// const day4 = require("./day4/day4.js");
// const day5 = require("./day5/day5.js");
// const day6 = require("./day6/day6.js");
// const day7 = require("./day7/day7.js");
// const day8 = require("./day8/day8.js");
// const day9 = require("./day9/day9.js");
// const day10 = require("./day10/day10.js");
// const day11 = require("./day11/day11.js");
// const day12 = require("./day12/day12.js");

const DAYS = 2;

const dayModules = {};
for (let d = 1; d <= DAYS; d++) {
  dayModules[d] = eval(`day${d}`);
}

performance.mark("start");
for (let day in dayModules) {
  console.time(`day${day}-getInput`);
  const data = dayModules[day].getInput();
  console.timeEnd(`day${day}-getInput`);
  console.time(`day${day}-part1`);
  console.log(dayModules[day].part1(data));
  console.timeEnd(`day${day}-part1`);
  console.time(`day${day}-part2`);
  console.log(dayModules[day].part2(data));
  console.timeEnd(`day${day}-part2`);
}
performance.mark("end");

console.log(
  "total duration: ",
  performance.measure("", "start", "end").duration
);
