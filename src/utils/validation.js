export const validateSize = size => {
  if (typeof size !== "number") throw new Error("Size must be a number.");
  if (!Number.isInteger(size) || size !== 3) throw new Error("Size must be 3.");
  return size;
};

export const validateSymbol = symbol => {
  if (typeof symbol !== "string") throw new Error("Symbol must be a string.");
  if (symbol.length !== 1)
    throw new Error("Symbol must be a single character.");
  return symbol;
};

export const validateIndex = (index, size) => {
  if (typeof index !== "number") throw new Error("Index must be a number.");
  if (!Number.isInteger(index) || index < 0 || index >= size)
    throw new Error("Index must be a positive integer within the board size.");
  return index;
};

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

export const validatePlayerId = validateIsPositiveInteger("Player id");

export const validateScore = validateIsPositiveInteger("Player score");

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

export const validateIsBoolean = value => {
  if (typeof value !== "boolean") {
    throw new Error("Value must be a boolean");
  }
  return value;
};

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

export const validateWinCells = (winCells, size) => {
  if (!Array.isArray(winCells)) {
    throw new Error("Win cells must be an array");
  }
  if (winCells.length !== size) {
    throw new Error(`Win cells must have a length of ${size}`);
  }
};
