import { validateIsBoolean, validateScore } from "../utils/validators";

/**
 * @module Tie
 * This module provides functionality to create and manage a tie object
 * for a game. It allows for the initialization of the tie object with
 * customizable or default properties including score and isTie status.
 * It offers methods to interact with the tie object such as getting its
 * score, checking if it's a tie, and resetting its state.
 */

/**
 * Initial score value for a tie object.
 */
const INIT_SCORE = 0;

/**
 * Initial isTie value for a tie object.
 */
const INIT_TIE = false;

/**
 * Factory function to create a tie object. This function initializes a
 * tie with default properties including score and isTie status. It returns
 * an object that provides methods to interact with the tie, such as getting
 * its score, checking if it's a tie, and resetting its state.
 *
 * @param {Object} [tie={ score: INIT_SCORE, isTie: INIT_TIE }] - An
 * optional parameter used here to provide a fluent interface. Defaults are
 * set to a score of 0 and isTie status of false.
 * @param {number} [tie.score=0] - The score of the tie object.
 * @param {boolean} [tie.isTie=false] - The isTie status of the tie object.
 * @returns {Object} An object representing the tie, including methods for
 * interacting with the tie:
 *  - `getTie(): {Object}` Returns the tie object.
 *  - `getScore(): {number}` Returns the score of the tie object.
 *  - `getIsTie(): {boolean}` Returns the isTie status of the tie object.
 *  - `setIsTie(): {Object}` Sets the isTie status to true and returns a
 * new tie object.
 *  - `incrementScore(): {Object}` Increments the score by 1 and returns a
 * new tie object.
 *  - `resetScore(): {Object}` Resets the score to 0 and returns a new tie
 * object.
 *  - `resetIsTie(): {Object}` Resets the isTie status to false and returns
 * a new tie object.
 *  - `resetTie(): {Object}` Resets both score and isTie status to their
 * initial values and returns a new tie object.
 */
const makeTie = (tie = { score: INIT_SCORE, isTie: INIT_TIE }) => {
  const { score, isTie } = tie;

  validateScore(score);
  validateIsBoolean(isTie);

  return Object.freeze({
    /**
     * Retrieves the tie object.
     * @returns {Object} The tie object.
     */
    getTie: () => tie,

    /**
     * Retrieves the score of the tie object.
     * @returns {number} The score of the tie object.
     */
    getScore: () => score,

    /**
     * Retrieves the isTie status of the tie object.
     * @returns {boolean} The isTie status of the tie object.
     */
    getIsTie: () => isTie,

    /**
     * Sets the isTie status to true and returns a new tie object.
     * @returns {Object} A new tie object with isTie set to true.
     */
    setIsTie: () => makeTie({ ...tie, isTie: true }),

    /**
     * Increments the score by 1 and returns a new tie object.
     * @returns {Object} A new tie object with the incremented score.
     */
    incrementScore: () => makeTie({ ...tie, score: score + 1 }),

    /**
     * Resets the score to 0 and returns a new tie object.
     * @returns {Object} A new tie object with the score reset to 0.
     */
    resetScore: () => makeTie({ ...tie, score: 0 }),

    /**
     * Resets the isTie status to false and returns a new tie object.
     * @returns {Object} A new tie object with isTie set to false.
     */
    resetIsTie: () => makeTie({ ...tie, isTie: false }),

    /**
     * Resets both score and isTie status to their initial values and returns a
     * new tie object.
     * @returns {Object} A new tie object with score and isTie status reset to
     * initial values.
     */
    resetTie: () => makeTie({ score: INIT_SCORE, isTie: INIT_TIE }),
  });
};

export default makeTie;
