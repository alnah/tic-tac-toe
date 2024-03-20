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

export { validateSize, validateSymbol, validateIndex };
