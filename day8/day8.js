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

fs.readFile("test_input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(part1(data));
    console.log(part2(data));
  }
});

const numSegmentsToNumbers = {
  2: [1],
  3: [7],
  4: [4],
  5: [2, 3, 5],
  6: [0, 6, 9],
  7: [8],
};

//T=top, M=middle, B=bottom, L=left, R=right
const numbersToSegments = {
  0: new Set(["T", "TL", "TR", "BL", "BR", "B"]),
  1: new Set(["TR", "BR"]),
  2: new Set(["T", "TR", "M", "BL", "B"]),
  3: new Set(["T", "TR", "M", "BR", "B"]),
  4: new Set(["TL", "TR", "M", "BR"]),
  5: new Set(["T", "TL", "M", "BR", "B"]),
  6: new Set(["T", "TL", "M", "BL", "BR", "B"]),
  7: new Set(["T", "TR", "BR"]),
  8: new Set(["T", "TL", "TR", "M", "BL", "BR", "B"]),
  9: new Set(["T", "TL", "TR", "M", "BR", "B"]),
};

function part1(data) {
  let entries = data.split("\n").map((e) => {
    let temp = e.split(" | ");
    return { signals: temp[0], outputs: temp[1] };
  });
  return _(entries)
    .map((e) => e.outputs)
    .map(
      (digits) =>
        digits
          .split(" ")
          .filter((d) => numSegmentsToNumbers[d.length].length === 1).length
    )
    .sum();
}

function part2(data) {
  let entries = data.split("\n").map((e) => {
    let temp = e.split(" | ").map((e) => e.split(" "));
    return { signals: temp[0], outputs: temp[1] };
  });
  let result = 0;
  for (let entry of entries) {
    let charToPossibleSegments = {
      a: ["T", "TL", "TR", "M", "BL", "BR", "B"],
      b: ["T", "TL", "TR", "M", "BL", "BR", "B"],
      c: ["T", "TL", "TR", "M", "BL", "BR", "B"],
      d: ["T", "TL", "TR", "M", "BL", "BR", "B"],
      e: ["T", "TL", "TR", "M", "BL", "BR", "B"],
      f: ["T", "TL", "TR", "M", "BL", "BR", "B"],
      g: ["T", "TL", "TR", "M", "BL", "BR", "B"],
    };
    allDigits = entry.signals.concat(entry.outputs);

    for (const digit of _.filter(
      allDigits,
      (d) => numSegmentsToNumbers[d.length].length === 1
    )) {
      let segments = numbersToSegments[numSegmentsToNumbers[digit.length][0]];
      for (const char of digit) {
        charToPossibleSegments[char] = charToPossibleSegments[char].filter(
          (s) => segments.has(s)
        );
      }
    }

    removeContradictions(charToPossibleSegments);

    let agenda = [_.cloneDeep(charToPossibleSegments)];
    while (agenda.length > 0) {
      let currMapping = agenda.shift();
      for (char in currMapping) {
        if (currMapping[char].length > 1) {
          for (seg of currMapping[char]) {
            newMapping = _.cloneDeep(currMapping);
            newMapping[char] = [seg];
            removeContradictions(newMapping);
            agenda.push(newMapping);
          }
          continue;
        }
      }
      if (isMappingPossible(currMapping, allDigits)) {
        result += translate(currMapping, entry.outputs);
        break;
      }
    }
  }
  return result;
}

function removeContradictions(mapping) {
  for (const char1 in mapping) {
    for (const char2 in mapping) {
      if (!isStrictSubset(mapping[char2], mapping[char1])) {
        continue;
      }
      let diff = setDifference(mapping[char2], mapping[char1]);

      if (diff.length > 0) {
        mapping[char2] = diff;
      }
    }
  }
}

function isMappingPossible(mapping, digits) {
  const validSegmentSets = Object.values(numbersToSegments);
  for (let digit of digits) {
    let segments = new Set(Array.from(digit).map((c) => mapping[c][0]));
    if (
      !validSegmentSets.reduce(
        (result, next) => result || setEq(segments, next),
        false
      )
    ) {
      return false;
    }
  }
  return true;
}

function translate(mapping, digits) {
  let result = "";
  for (let digit of digits) {
    let segments = new Set(Array.from(digit).map((c) => mapping[c][0]));
    for (number in numbersToSegments) {
      if (setEq(numbersToSegments[number], segments)) {
        result += number;
        break;
      }
    }
  }
  return parseInt(result, 10);
}

function setEq(as, bs) {
  if (as.size !== bs.size) return false;
  for (var a of as) if (!bs.has(a)) return false;
  return true;
}

function setDifference(list1, list2) {
  return _.filter(list1, (e) => !list2.includes(e));
}

function isStrictSubset(list1, list2) {
  return list2.reduce((result, next) => result && list1.includes(next), true);
}
