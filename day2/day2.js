const fs = require("fs");

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
  const finalPosition = data
    .split("\n")
    .map((command) => {
      return {
        direction: command.split(" ")[0].trim(),
        amount: parseInt(command.split(" ")[1], 10),
      };
    })
    .reduce(
      (currPosition, nextCommand) => {
        switch (nextCommand.direction) {
          case "up":
            currPosition.depth -= nextCommand.amount;
            break;
          case "down":
            currPosition.depth += nextCommand.amount;
            break;
          case "forward":
            currPosition.horizontal += nextCommand.amount;
            break;
          default:
            throw "Command direction not recognized";
        }
        return currPosition;
      },
      { horizontal: 0, depth: 0 }
    );
  return finalPosition.horizontal * finalPosition.depth;
}

function part2(data) {
  const finalPosition = data
    .split("\n")
    .map((command) => {
      return {
        direction: command.split(" ")[0].trim(),
        amount: parseInt(command.split(" ")[1], 10),
      };
    })
    .reduce(
      (currPosition, nextCommand) => {
        switch (nextCommand.direction) {
          case "up":
            currPosition.aim -= nextCommand.amount;
            break;
          case "down":
            currPosition.aim += nextCommand.amount;
            break;
          case "forward":
            currPosition.horizontal += nextCommand.amount;
            currPosition.depth += currPosition.aim * nextCommand.amount;
            break;
          default:
            throw "Command direction not recognized";
        }
        return currPosition;
      },
      { horizontal: 0, depth: 0, aim: 0 }
    );
  return finalPosition.horizontal * finalPosition.depth;
}
