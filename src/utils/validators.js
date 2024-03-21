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
  return object;
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
  return winCells;
};

export const validateIsHTMLElement = element => {
  if (!(element instanceof HTMLElement)) {
    throw new Error("Element must be an HTMLElement");
  }
  return element;
};

export const validateIsEvent = event => {
  if (!(event instanceof Event)) {
    throw new Error("Event must be an Event");
  }
  return event;
};

export const validateHandler = handler => {
  if (typeof handler !== "function") {
    throw new Error("Handler must be a function");
  }
  return handler;
};

export const validateEventType = eventType => {
  if (typeof eventType !== "string") {
    throw new Error("Event type must be a string");
  }
  return eventType;
};

export const validateType = type => {
  if (typeof type !== "string" || type.trim() === "") {
    throw new Error("Type must be a non-empty string.");
  }
  return type;
};

export const validatePayload = payload => {
  if (!(typeof payload === "function" || typeof payload === "object")) {
    throw new Error("Payload must be a function or an object");
  }
  return payload;
};

export const validateNotify = notify => {
  if (typeof notify !== "function") {
    throw new Error("Notify must be a function");
  }
  return notify;
};
