/**
 * Validates that the given size is 3 for a Tic-Tac-Toe Board.
 *
 * @param {number} size The size to validate.
 * @returns {number} The validated size.
 */
export const validateSize = size => {
  if (typeof size !== "number") throw new Error("Size must be a number.");
  if (!Number.isInteger(size) || size !== 3) throw new Error("Size must be 3.");
  return size;
};

/**
 * Validates that the given symbol is a valid symbol for the board.
 *
 * @param {string} symbol The symbol to validate.
 * @returns {string} The validated symbol.
 */
export const validateSymbol = symbol => {
  if (typeof symbol !== "string") throw new Error("Symbol must be a string.");
  if (symbol.length !== 1)
    throw new Error("Symbol must be a single character.");
  return symbol;
};

/**
 * Validates that the given index is a valid index for the board.
 *
 * @param {number} index The index to validate.
 * @returns {number} The validated index.
 */
export const validateIndex = (index, size) => {
  if (typeof index !== "number") throw new Error("Index must be a number.");
  if (!Number.isInteger(index) || index < 0 || index >= size)
    throw new Error("Index must be a positive integer within the board size.");
  return index;
};

/** Validates that the given number is a positive integer.
 *
 * @param {number} number The number to validate.
 * @returns {number} The validated number.
 */
const validateIsPositiveInteger = parameterName => number => {
  if (typeof number !== "number") {
    throw new Error(`${parameterName} must be a number`);
  }
  if (number < 0) {
    throw new Error(`${parameterName} must be a positive number`);
  }
  if (number % 1 === 0) return number;
  throw new Error(`${parameterName} must be an integer`);
};

/** Validates that the given player id is a valid player id.
 *
 * @param {number} playerId The player id to validate.
 * @returns {number} The validated player id.
 */
export const validatePlayerId = validateIsPositiveInteger("Player id");

/** Validates that the given player score is a valid player score.
 *
 * @param {number} score The player score to validate.
 * @returns {number} The validated player score.
 */
export const validateScore = validateIsPositiveInteger("Player score");

/**
 * Validates that the given name is a valid name for the player.
 *
 * @param {string} name The name to v⁄alidate.
 * @returns {string} The validated name.
 */
export const validateName = name => {
  if (typeof name !== "string") {
    throw new Error("Player name must be a string");
  }
  if (name.length < 1) {
    throw new Error("Player name must be at least 1 character long");
  }
  if (name.length > 12) {
    throw new Error("Player name must be at most 12 characters long");
  }
  return name;
};

/**
 * Validates that the given value is a boolean.
 *
 * @param {boolean} value The value to validate.
 * @returns {boolean} The validated value.
 */
export const validateIsBoolean = value => {
  if (typeof value !== "boolean") {
    throw new Error("Value must be a boolean");
  }
  return value;
};

/**
 * Validates that the given object has all the required methods.
 *
 * @param {Array<string>} requiredMethods An array of strings representing the
 * names of the required methods.
 * @returns {Function} A function that takes an object to validate.
 */
const validateObject = requiredMethods => object => {
  if (typeof object !== "object" || object === null) {
    throw new Error("Object must be a valid object");
  }

  requiredMethods.forEach(method => {
    if (typeof object[method] !== "function") {
      throw new Error(`Object must have a method named ${method}`);
    }
  });
};

/**
 * Validates that a board object has all the required board methods.
 */
export const validateBoard = validateObject([
  "getSize",
  "getFiller",
  "getBoard",
  "resetBoard",
  "getGrid",
  "getCell",
  "setCell",
  "hasWin",
  "hasTie",
  "getWinCells",
]);

/**
 * Validates that a player object has all the required player methods.
 */
export const validatePlayer = validateObject([
  "setId",
  "setName",
  "setSymbol",
  "setIsCurrent",
  "setIsNext",
  "setIsWinner",
  "getPlayer",
  "getId",
  "getName",
  "getSymbol",
  "getIsCurrent",
  "getIsWinner",
  "getScore",
  "incrementScore",
  "resetIsWinner",
  "resetScore",
]);

/**
 * Validates that a tie object has all the required tie methods.
 */
export const validateTie = validateObject([
  "getTie",
  "getScore",
  "getIsTie",
  "setIsTie",
  "incrementScore",
  "resetScore",
  "resetIsTie",
  "resetTie",
]);

/** Validates that the given win cells are valid win cells for the board.
 *
 * @param {Array<number>} winCells The win cells to validate.
 * @param {number} size The size of the board.
 */
export const validateWinCells = (winCells, size) => {
  if (!Array.isArray(winCells)) {
    throw new Error("Win cells must be an array");
  }
  if (winCells.length !== size) {
    throw new Error(`Win cells must have a length of ${size}`);
  }
};
