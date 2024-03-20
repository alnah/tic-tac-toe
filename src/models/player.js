import {
  validatePlayerId,
  validateName,
  validateSymbol,
  validateIsBoolean,
  validateScore,
} from "../utils/validation";

/**
 * @module Player
 * Factory function to create and manage a player object.
 * This function initializes a player with default or provided properties
 * and offers methods for state manipulation and querying.
 */

/**
 * Initial score value for a player.
 */
const INIT_SCORE = 0;

/**
 * Initial winner status for a player.
 */
const INIT_IS_WINNER = false;

/**
 * Factory function to create and manage a player object.
 * This function initializes a player with default or provided properties
 * and offers methods for state manipulation and querying.
 *
 * @param {Object} [player={}] - An object representing the player's initial
 * state. Properties include id, name, symbol, isCurrent, isWinner, and score.
 * @param {string} [player.id] - The player's ID.
 * @param {string} [player.name] - The player's name.
 * @param {string} [player.symbol] - The player's symbol.
 * @param {boolean} [player.isCurrent] - If the player is the current player.
 * @param {boolean} [player.isWinner=INIT_IS_WINNER] - If the player is the winner.
 * @param {number} [player.score=INIT_SCORE] - The player's score.
 * @returns {Object} A player object with methods for state manipulation and
 * querying. The player object interface includes:
 *  - `setId(newId: string): Object` Sets the player's ID.
 *  - `setName(newName: string): Object` Sets the player's name.
 *  - `setSymbol(newSymbol: string): Object` Sets the player's symbol.
 *  - `setIsCurrent(): Object` Sets the player as the current player.
 *  - `setIsNext(): Object` Sets the player as the next player.
 *  - `setIsWinner(): Object` Sets the player as the winner.
 *  - `getPlayer(): Object` Returns the player object.
 *  - `getId(): string` Returns the player's ID.
 *  - `getName(): string` Returns the player's name.
 *  - `getSymbol(): string` Returns the player's symbol.
 *  - `getIsCurrent(): boolean` Returns if the player is the current player.
 *  - `getIsWinner(): boolean` Returns if the player is the winner.
 *  - `getScore(): number` Returns the player's score.
 *  - `incrementScore(): Object` Increments the player's score.
 *  - `resetIsWinner(): Object` Resets the player's winner status.
 *  - `resetScore(): Object` Resets the player's score.
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

  if (id) validatePlayerId(id);
  if (name) validateName(name);
  if (symbol) validateSymbol(symbol);
  if (isCurrent !== undefined) validateIsBoolean(isCurrent);
  validateScore(score);
  validateIsBoolean(isWinner);

  return Object.freeze({
    /**
     * Sets the player's ID.
     * @param {string} newId - The new ID to set.
     * @returns {Object} A new player object with the updated ID.
     */
    setId: newId => makePlayer({ ...player, id: validatePlayerId(newId) }),

    /**
     * Sets the player's name.
     * @param {string} newName - The new name to set.
     * @returns {Object} A new player object with the updated name.
     */
    setName: newName =>
      makePlayer({ ...player, name: validateName(newName).slice(0, 12) }),

    /**
     * Sets the player's symbol.
     * @param {string} newSymbol - The new symbol to set.
     * @returns {Object} A new player object with the updated symbol.
     */
    setSymbol: newSymbol =>
      makePlayer({ ...player, symbol: validateSymbol(newSymbol) }),

    /**
     * Sets the player as the current player.
     * @returns {Object} A new player object with isCurrent set to true.
     */
    setIsCurrent: () => makePlayer({ ...player, isCurrent: true }),

    /**
     * Sets the player as the next player.
     * @returns {Object} A new player object with isCurrent set to false.
     */
    setIsNext: () => makePlayer({ ...player, isCurrent: false }),

    /**
     * Sets the player as the winner.
     * @returns {Object} A new player object with isWinner set to true.
     */
    setIsWinner: () => makePlayer({ ...player, isWinner: true }),

    /**
     * Returns the player object.
     * @returns {Object} The player object.
     */
    getPlayer: () => player,

    /**
     * Returns the player's ID.
     * @returns {string} The player's ID.
     */
    getId: () => id,

    /**
     * Returns the player's name.
     * @returns {string} The player's name.
     */
    getName: () => name,

    /**
     * Returns the player's symbol.
     * @returns {string} The player's symbol.
     */
    getSymbol: () => symbol,

    /**
     * Returns if the player is the current player.
     * @returns {boolean} If the player is the current player.
     */
    getIsCurrent: () => isCurrent,

    /**
     * Returns if the player is the winner.
     * @returns {boolean} If the player is the winner.
     */
    getIsWinner: () => isWinner,

    /**
     * Returns the player's score.
     * @returns {number} The player's score.
     */
    getScore: () => score,

    /**
     * Increments the player's score.
     * @returns {Object} A new player object with the incremented score.
     */
    incrementScore: () => makePlayer({ ...player, score: score + 1 }),

    /**
     * Resets the player's winner status.
     * @returns {Object} A new player object with isWinner set to false.
     */
    resetIsWinner: () => makePlayer({ ...player, isWinner: false }),

    /**
     * Resets the player's score.
     * @returns {Object} A new player object with the score reset to 0.
     */
    resetScore: () => makePlayer({ ...player, score: 0 }),
  });
};

export default makePlayer;
