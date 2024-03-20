import {
  validateIsBoolean,
  validateIsPositiveInteger,
} from "../utils/validation";

/**
 * Initial score value for a tie object.
 */
const INIT_SCORE = 0;

/**
 * Initial isTie value for a tie object.
 */
const INIT_TIE = false;

/**
 * Factory function to create a tie object.
 * @param {Object} tie - The tie object with score and isTie properties.
 * @returns {Object} A frozen tie object with various methods for managing ties.
 */
const makeTie = (tie = { score: INIT_SCORE, isTie: INIT_TIE }) => {
  const { score, isTie } = tie;

  validateIsPositiveInteger(score);
  validateIsBoolean(isTie);

  return Object.freeze({
    /**
     * Get the tie object.
     * @returns {Object} The tie object.
     */
    getTie: () => tie,

    /**
     * Get the score of the tie object.
     * @returns {number} The score of the tie object.
     */
    getScore: () => score,

    /**
     * Get the isTie value of the tie object.
     * @returns {boolean} The isTie value of the tie object.
     */
    getIsTie: () => isTie,

    /**
     * Set the isTie value to true.
     * @returns {Object} A new tie object with isTie set to true.
     */
    setIsTie: () => makeTie({ ...tie, isTie: true }),

    /**
     * Increment the score of the tie object by 1.
     * @returns {Object} A new tie object with the score incremented by 1.
     */
    incrementScore: () => makeTie({ ...tie, score: score + 1 }),

    /**
     * Reset the score of the tie object to 0.
     * @returns {Object} A new tie object with the score reset to 0.
     */
    resetScore: () => makeTie({ ...tie, score: 0 }),

    /**
     * Reset the isTie value of the tie object to false.
     * @returns {Object} A new tie object with isTie reset to false.
     */
    resetIsTie: () => makeTie({ ...tie, isTie: false }),

    /**
     * Reset the tie object to its initial state.
     * @returns {Object} A new tie object with score and isTie reset to initial
     * values.
     */
    resetTie: () => makeTie({ score: INIT_SCORE, isTie: INIT_TIE }),
  });
};

export default makeTie;
