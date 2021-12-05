const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(processData(data));
  }
});

function processData(data) {
  let lines = data.split("\n").map((l) => l.split(" -> "));
  return lines;
}
