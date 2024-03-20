import {
  validateSize,
  validateSymbol,
  validateIndex,
} from "../utils/validation";

/**
 * The default size of the board.
 * @type {number}
 */
const SIZE = 3;

/**
 * The default filler symbol for each cell in the board.
 * @type {string}
 */
const FILLER = "_";

/**
 * Creates a frozen row of a specified size filled with a specified filler.
 * @param {number} size - The size of the row.
 * @param {string} filler - The filler symbol for each cell in the row.
 * @returns {Array} A frozen array representing a row.
 */
const makeRow = (size, filler) =>
  Object.freeze(Array.from({ length: size }, () => filler));

/**
 * Creates a frozen grid of specified size, with each cell filled with a
 * specified filler.
 * @param {number} size - The size of the grid (number of rows and columns).
 * @param {string} filler - The filler symbol for each cell in the grid.
 * @returns {Array} A frozen 2D array representing the grid.
 */
const makeGrid = (size, filler) =>
  Object.freeze(Array.from({ length: size }, () => makeRow(size, filler)));

/**
 * Factory function to create a board object with its methods.
 * @param {Object} board - An object containing the size, filler, and grid of
 * the board. Defaults to a standard board.
 * @returns {Object} An object representing the board with methods to manipulate
 * and query the board state.
 */
const makeBoard = (
  board = { size: SIZE, filler: FILLER, grid: makeGrid(SIZE, FILLER) },
) => {
  validateSize(board.size);
  validateSymbol(board.filler);

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
    /**
     * Retrieves the size of the board.
     * @returns {number} The size of the board.
     */
    getSize: () => size,

    /**
     * Retrieves the filler symbol of the board.
     * @returns {string} The filler symbol.
     */
    getFiller: () => filler,

    /**
     * Retrieves the board object.
     * @returns {Object} The board object.
     */
    getBoard: () => board,

    /**
     * Resets the board to its initial state.
     * @returns {Object} A new board object with the initial grid.
     */
    resetBoard: () => makeBoard(),

    /**
     * Retrieves the grid of the board.
     * @returns {Array} The 2D array representing the board's grid.
     */
    getGrid: () => grid,

    /**
     * Retrieves the symbol at the specified cell.
     * @param {number} row - The row index of the cell.
     * @param {number} col - The column index of the cell.
     * @returns {string} The symbol at the specified cell.
     */
    getCell: (row, col) => {
      [row, col].forEach(index => validateIndex(index, SIZE));

      return grid[row][col];
    },

    /**
     * Places a symbol at the specified row and column if the cell is empty.
     * @param {number} row - The row index to place the symbol.
     * @param {number} col - The column index to place the symbol.
     * @param {string} symbol - The symbol to place.
     * @returns {Object} A new board object with the updated grid.
     */
    setCell: (row, col, symbol) => {
      [row, col].forEach(index => validateIndex(index, SIZE));

      const updatedGrid = JSON.parse(JSON.stringify(grid));

      if (updatedGrid[row][col] === filler) updatedGrid[row][col] = symbol;

      return makeBoard({ ...board, grid: updatedGrid });
    },

    /**
     * Checks if a given symbol has a winning line starting from a specific
     * cell.
     * @param {number} row - The row index of the starting cell.
     * @param {number} col - The column index of the starting cell.
     * @param {string} symbol - The symbol to check for a win.
     * @returns {boolean} True if there is a winning line, false otherwise.
     */
    hasWin: (row, col, symbol) => {
      [row, col].forEach(index => validateIndex(index, SIZE));
      validateSymbol(symbol);

      if (getRow(row).every(cell => cell === symbol)) return true;
      if (getCol(col).every(cell => cell === symbol)) return true;
      if (getDiag().every(cell => cell === symbol)) return true;
      if (getAntiDiag().every(cell => cell === symbol)) return true;

      return false;
    },

    /**
     * Checks if the game is a tie, meaning the grid is full without any player
     * winning.
     * @param {number} row - The row index to check from.
     * @param {number} col - The column index to check from.
     * @param {string} symbol - The symbol to check for a win.
     * @returns {boolean} True if the game is a tie, false otherwise.
     */
    hasTie: function (row, col, symbol) {
      [row, col].forEach(index => validateIndex(index, SIZE));
      validateSymbol(symbol);

      if (this.hasWin(row, col, symbol)) return false;

      return grid.every(r => !r.some(cell => cell === filler));
    },

    /**
     * Finds all winning cells for a given symbol starting from a specific cell.
     * @param {number} row - The row index of the starting cell.
     * @param {number} col - The column index of the starting cell.
     * @param {string} symbol - The symbol to check for a win.
     * @returns {Array} An array of cell objects that form a winning line.
     */
    getWinCells: (row, col, symbol) => {
      [row, col].forEach(index => validateIndex(index, SIZE));

      const lines = getLines(row, col);
      const winCells = [];

      lines.forEach((line, index) => {
        if (line.every(cell => cell === symbol)) {
          // if the line is all the same symbol, add the cells to winCells
          if (index === 0) {
            // row
            line.forEach((_, c) => winCells.push({ row, col: c }));
          } else if (index === 1) {
            // column
            line.forEach((_, r) => winCells.push({ row: r, col }));
          } else if (index === 2) {
            // diagonal
            line.forEach((_, r) => winCells.push({ row: r, col: r }));
          } else if (index === 3) {
            // anti-diagonal
            line.forEach((_, r) =>
              winCells.push({ row: r, col: size - 1 - r }),
            );
          }
        }
      });

      const updatedWinCells = winCells.map(cell => ({
        row: Number(cell.row),
        col: Number(cell.col),
      }));

      return Object.freeze(updatedWinCells);
    },
  });
};

export default makeBoard;