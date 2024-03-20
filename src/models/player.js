import {
  validateId,
  validateName,
  validateSymbol,
  validateIsBoolean,
} from "../utils/validation";

/**
 * Defines the initial score for a player.
 */
const INIT_SCORE = 0;

/**
 * Defines the initial state of the isWinner property for a player.
 */
const INIT_IS_WINNER = false;

/**
 * Factory function to create a player object with properties and methods to
 * manipulate and query the player's state.
 * @param {Object} player - An object representing the player's initial state.
 * @returns {Object} A frozen player object with methods for state manipulation
 * and querying.
 */
const makePlayer = (
  player = {
    id: undefined,
    name: undefined,
    symbol: undefined,
    isCurrent: undefined,
    isWinner: INIT_IS_WINNER,
    score: INIT_SCORE,
  },
) => {
  const { id, name, score, symbol, isCurrent, isWinner } = player;

  if (id) validateId(id);
  if (name) validateName(name);
  if (symbol) validateSymbol(symbol);
  if (isCurrent) validateIsBoolean(isCurrent);
  validateIsBoolean(isWinner);

  return Object.freeze({
    /**
     * Sets a new ID for the player.
     * @param {string} newId - The new ID to be set for the player.
     * @returns {Object} A new player object with the updated ID.
     */
    setId: newId => makePlayer({ ...player, id: validateId(newId) }),

    /**
     * Sets a new name for the player, truncated to 12 characters.
     * @param {string} newName - The new name to be set for the player.
     * @returns {Object} A new player object with the updated name.
     */
    setName: newName =>
      makePlayer({ ...player, name: validateName(newName).slice(0, 12) }),

    /**
     * Sets a new symbol for the player.
     * @param {string} newSymbol - The new symbol to be set for the player.
     * @returns {Object} A new player object with the updated symbol.
     */
    setSymbol: newSymbol =>
      makePlayer({ ...player, symbol: validateSymbol(newSymbol) }),

    /**
     * Marks the player as the current player.
     * @returns {Object} A new player object with isCurrent set to true.
     */
    setIsCurrent: () => makePlayer({ ...player, isCurrent: true }),

    /**
     * Marks the player as the next player.
     * @returns {Object} A new player object with isCurrent set to false.
     */
    setIsNext: () => makePlayer({ ...player, isCurrent: false }),

    /**
     * Marks the player as the winner.
     * @returns {Object} A new player object with isWinner set to true.
     */
    setIsWinner: () => makePlayer({ ...player, isWinner: true }),

    /**
     * Retrieves the current state of the player.
     * @returns {Object} The current player object.
     */
    getPlayer: () => player,

    /**
     * Retrieves the player's ID.
     * @returns {string} The player's ID.
     */
    getId: () => id,

    /**
     * Retrieves the player's name.
     * @returns {string} The player's name.
     */
    getName: () => name,

    /**
     * Retrieves the player's symbol.
     * @returns {string} The player's symbol.
     */
    getSymbol: () => symbol,

    /**
     * Checks if the player is the current player.
     * @returns {boolean} True if the player is the current player, false
     * otherwise.
     */
    getIsCurrent: () => isCurrent,

    /**
     * Checks if the player is the winner.
     * @returns {boolean} True if the player is the winner, false otherwise.
     */
    getIsWinner: () => isWinner,

    /**
     * Retrieves the player's score.
     * @returns {number} The player's score.
     */
    getScore: () => score,

    /**
     * Increments the player's score by 1.
     * @returns {Object} A new player object with the incremented score.
     */
    incrementScore: () => makePlayer({ ...player, score: score + 1 }),

    /**
     * Resets the player's winner status to false.
     * @returns {Object} A new player object with isWinner set to false.
     */
    resetIsWinner: () => makePlayer({ ...player, isWinner: false }),

    /**
     * Resets the player's score to 0.
     * @returns {Object} A new player object with the score reset to 0.
     */
    resetScore: () => makePlayer({ ...player, score: 0 }),
  });
};

export default makePlayer;
