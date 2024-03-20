/**
 * Validates that the given size is a valid size for the board.
 *
 * @param {number} size The size to validate.
 * @returns {number} The validated size.
 */
const validateSize = size => {
  if (typeof size !== "number") throw new Error("Size must be a number.");
  if (!Number.isInteger(size) || size <= 0)
    throw new Error("Size must be a positive integer.");
  return size;
};

/**
 * Validates that the given symbol is a valid symbol for the board.
 *
 * @param {string} symbol The symbol to validate.
 * @returns {string} The validated symbol.
 */
const validateSymbol = symbol => {
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
const validateIndex = (index, size) => {
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
const validateIsPositiveInteger = number => {
  if (typeof number !== "number") {
    throw new Error("Player id must be a number");
  }
  if (number < 0) {
    throw new Error("Player id must be a positive number");
  }
  if (number % 1 === 0) return number;
  throw new Error("Player id must be an integer");
};

/**
 * Validates that the given name is a valid name for the player.
 *
 * @param {string} name The name to validate.
 * @returns {string} The validated name.
 */
const validateName = name => {
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
const validateIsBoolean = value => {
  if (typeof value !== "boolean") {
    throw new Error("Value must be a boolean");
  }
  return value;
};

export {
  validateSize,
  validateSymbol,
  validateIndex,
  validateIsPositiveInteger,
  validateName,
  validateIsBoolean,
};
