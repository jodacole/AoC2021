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
  const binaries = data.split("\n");
  const binLength = binaries[0].length;
  const relativeFreqs = binaries.reduce(
    (freqs, nextBin) =>
      freqs.map((value, index) =>
        nextBin[index] === "1" ? value + 1 : value - 1
      ),
    new Array(binLength).fill(0)
  );
  const gamma = parseInt(relativeFreqs.map((e) => +(e > 0) + "").join(""), 2);
  const epsilon = parseInt(relativeFreqs.map((e) => +(e < 0) + "").join(""), 2);
  return gamma * epsilon;
}

function part2(data) {
  function getRelativeFreqs(bins) {
    return bins.reduce(
      (freqs, nextBin) =>
        freqs.map((value, index) =>
          nextBin[index] === "1" ? value + 1 : value - 1
        ),
      new Array(binLength).fill(0)
    );
  }
  const binaries = data.split("\n");
  const binLength = binaries[0].length;

  let o2 = [...binaries],
    co2 = [...binaries];
  for (let i = 0; i < binLength; i++) {
    let o2Freqs = getRelativeFreqs(o2);
    if (o2.length > 1) {
      o2 = o2.filter((bin) => bin[i] === Number(o2Freqs[i] >= 0).toString());
    }
    let co2Freqs = getRelativeFreqs(co2);
    if (co2.length > 1) {
      co2 = co2.filter((bin) => bin[i] !== Number(co2Freqs[i] >= 0).toString());
    }
  }

  const o2Rating = parseInt(o2[0], 2);
  const co2Rating = parseInt(co2[0], 2);

  return o2Rating * co2Rating;
}
