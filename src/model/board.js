import { validateIndex } from "../utils/validators";

const SIZE = 3;
const FILLER = "_";

const makeRow = (size, filler) =>
  Object.freeze(Array.from({ length: size }, () => filler));

const makeGrid = (size, filler) =>
  Object.freeze(Array.from({ length: size }, () => makeRow(size, filler)));

const makeBoard = (
  board = { size: SIZE, filler: FILLER, grid: makeGrid(SIZE, FILLER) },
) => {
  const { size, filler, grid } = board;

  const getRow = row => grid[validateIndex(row, SIZE)];

  const getCol = col => grid.map(r => r[validateIndex(col, SIZE)]);

  const getDiag = () => grid.map((r, i) => r[i]);

  const getAntiDiag = () => grid.map((r, i) => r[size - 1 - i]);

  const getLines = (row, col) => [
    getRow(row),
    getCol(col),
    getDiag(),
    getAntiDiag(),
  ];

  return Object.freeze({
    getSize: () => size,

    getFiller: () => filler,

    getBoard: () => board,

    resetBoard: () => makeBoard(),

    getGrid: () => grid,

    getCell: (row, col) => grid[row][col],

    setCell: (row, col, symbol) => {
      const updatedGrid = JSON.parse(JSON.stringify(grid));
      if (updatedGrid[row][col] === filler) updatedGrid[row][col] = symbol;
      return makeBoard({ ...board, grid: updatedGrid });
    },

    hasWin: (row, col, symbol) => {
      if (getRow(row).every(cell => cell === symbol)) return true;
      if (getCol(col).every(cell => cell === symbol)) return true;
      if (getDiag().every(cell => cell === symbol)) return true;
      if (getAntiDiag().every(cell => cell === symbol)) return true;

      return false;
    },

    hasTie: function (row, col, symbol) {
      if (this.hasWin(row, col, symbol)) return false;
      return grid.every(r => !r.some(cell => cell === filler));
    },

    getWinCells: (row, col, symbol) => {
      const lines = getLines(row, col);
      const winCells = [];

      lines.forEach((line, index) => {
        if (line.every(cell => cell === symbol)) {
          if (index === 0) {
            line.forEach((_, c) => winCells.push({ row, col: c }));
          } else if (index === 1) {
            line.forEach((_, r) => winCells.push({ row: r, col }));
          } else if (index === 2) {
            line.forEach((_, r) => winCells.push({ row: r, col: r }));
          } else if (index === 3) {
            line.forEach((_, r) =>
              winCells.push({ row: r, col: size - 1 - r }),
            );
          }
        }
      });

      const updatedWinCells = winCells.map(cell => ({
        row: cell.row,
        col: cell.col,
      }));

      return Object.freeze(updatedWinCells);
    },
  });
};

export default makeBoard;
