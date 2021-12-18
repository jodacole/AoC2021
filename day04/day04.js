const fs = require("fs");
const _ = require("lodash");
const path = require("path");

if (require.main === module) {
  fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(part1(data));
    console.log(part2(data));
  });
}

function processData(data) {
  const splitData = data.split("\n").filter((e) => e.trim() !== "");
  const drawnNumbers = splitData[0].split(",");

  const boards = [];
  let currBoard = [];
  let boardLine = 1;
  for (line of splitData.slice(1)) {
    currBoard.push(line.split(/ +/).filter((e) => e.length > 0));
    boardLine++;
    if (boardLine > currBoard[0].length) {
      boards.push(currBoard);
      currBoard = [];
      boardLine = 1;
    }
  }

  return { drawnNumbers: drawnNumbers, boards: boards };
}

class BingoBoard {
  static transpose(board) {
    return board[0].map((e, colIndex) => board.map((row) => row[colIndex]));
  }
  constructor(board) {
    this.rows = board;
    this.cols = BingoBoard.transpose(board);
  }

  isWinner(numbersSelectedSet) {
    for (let row of this.rows) {
      if (!row.map((e) => numbersSelectedSet.has(e)).includes(false)) {
        return true;
      }
    }
    for (let col of this.cols) {
      if (!col.map((e) => numbersSelectedSet.has(e)).includes(false)) {
        return true;
      }
    }
    return false;
  }

  winningLine(numbersSelectedSet) {
    for (let row of this.rows) {
      if (!row.map((e) => numbersSelectedSet.has(e)).includes(false)) {
        return row;
      }
    }
    for (let col of this.cols) {
      if (!col.map((e) => numbersSelectedSet.has(e)).includes(false)) {
        return col;
      }
    }
    return null;
  }

  score(numbersSelectedSet, lastNumCalled) {
    let uncalled = this.rows
      .flat()
      .filter((num) => !numbersSelectedSet.has(num))
      .map((num) => parseInt(num, 10));
    let sumUncalled = _.sum(uncalled);
    return sumUncalled * parseInt(lastNumCalled, 10);
  }
}

function part1(data) {
  let { drawnNumbers: allDrawnNumbers, boards: rawBoards } = processData(data);
  let boards = rawBoards.map((b) => new BingoBoard(b));

  let drawnNumberSet = new Set();
  for (let draw of allDrawnNumbers) {
    drawnNumberSet.add(draw);
    let winningBoards = boards.filter((b) => b.isWinner(drawnNumberSet));
    if (winningBoards.length > 0) {
      return winningBoards[0].score(drawnNumberSet, draw);
    }
  }
}

function part2(data) {
  let { drawnNumbers: allDrawnNumbers, boards: rawBoards } = processData(data);
  let boards = rawBoards.map((b) => new BingoBoard(b));

  let drawnNumberSet = new Set();
  let lastLosingBoard = null;
  for (let draw of allDrawnNumbers) {
    drawnNumberSet.add(draw);
    let stillLosingBoards = boards.filter((b) => !b.isWinner(drawnNumberSet));
    if (stillLosingBoards.length === 0) {
      return lastLosingBoard.score(drawnNumberSet, draw);
    }
    lastLosingBoard = stillLosingBoards[0];
  }
}

function getInput() {
  return fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");
}

module.exports = {
  getInput,
  part1,
  part2,
};
