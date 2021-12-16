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

function part1(data) {
  const bitArray = data
    .split("")
    .map((char) => parseInt(char, 16).toString(2).padStart(4, 0).split(""))
    .flat();

  function getVersionSum(packetObj) {
    if (packetObj.subPackets) {
      return (
        packetObj.version +
        packetObj.subPackets.reduce(
          (total, next) => total + getVersionSum(next),
          0
        )
      );
    } else {
      return packetObj.version;
    }
  }

  return getVersionSum(parsePacket(bitArray)[0]);
}

function part2(data) {
  const bitArray = data
    .split("")
    .map((char) => parseInt(char, 16).toString(2).padStart(4, 0).split(""))
    .flat();

  function getValue(packetObj) {
    if (packetObj.typeId === 0) {
      return _.sum(packetObj.subPackets.map(getValue));
    } else if (packetObj.typeId === 1) {
      return packetObj.subPackets.reduce(
        (total, next) => total * getValue(next),
        1
      );
    } else if (packetObj.typeId === 2) {
      return _.min(packetObj.subPackets.map(getValue));
    } else if (packetObj.typeId === 3) {
      return _.max(packetObj.subPackets.map(getValue));
    } else if (packetObj.typeId === 4) {
      return packetObj.value;
    } else if (packetObj.typeId === 5) {
      return getValue(packetObj.subPackets[0]) >
        getValue(packetObj.subPackets[1])
        ? 1
        : 0;
    } else if (packetObj.typeId === 6) {
      return getValue(packetObj.subPackets[0]) <
        getValue(packetObj.subPackets[1])
        ? 1
        : 0;
    } else if (packetObj.typeId === 7) {
      return getValue(packetObj.subPackets[0]) ===
        getValue(packetObj.subPackets[1])
        ? 1
        : 0;
    } else {
      throw "TypeId not recognized";
    }
  }

  return getValue(parsePacket(bitArray)[0]);
}

function parsePacket(bitArray, index = 0) {
  const packetObj = {};
  packetObj.version = parseInt(bitArray.slice(index, index + 3).join(""), 2);
  packetObj.typeId = parseInt(bitArray.slice(index + 3, index + 6).join(""), 2);
  packetObj.type = packetObj.typeId === 4 ? "literal" : "operator";
  index += 6;

  if (packetObj.type === "literal") {
    let value = "";
    while (true) {
      if (bitArray[index] === "1") {
        value += bitArray.slice(index + 1, index + 5).join("");
        index += 5;
      } else {
        value += bitArray.slice(index + 1, index + 5).join("");
        index += 5;
        break;
      }
    }
    packetObj.value = parseInt(value, 2);
  } else {
    const lengthTypeId = bitArray[index];
    index += 1;
    if (lengthTypeId === "0") {
      const lengthOfSubPackets = parseInt(
        bitArray.slice(index, index + 15).join(""),
        2
      );
      index += 15;
      const subPacketsEndIndex = index + lengthOfSubPackets;
      packetObj.subPackets = [];
      while (index < subPacketsEndIndex) {
        let parseResult = parsePacket(bitArray, index);
        packetObj.subPackets.push(parseResult[0]);
        index = parseResult[1];
      }
    } else {
      const numSubPackets = parseInt(
        bitArray.slice(index, index + 11).join(""),
        2
      );
      index += 11;
      packetObj.subPackets = [];
      for (let i = 0; i < numSubPackets; i++) {
        let parseResult = parsePacket(bitArray, index);
        packetObj.subPackets.push(parseResult[0]);
        index = parseResult[1];
      }
    }
  }
  return [packetObj, index];
}
