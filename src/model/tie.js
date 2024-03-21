import { validateIsBoolean, validateScore } from "../utils/validators";

const INIT_SCORE = 0;
const INIT_TIE = false;

const makeTie = (tie = { score: INIT_SCORE, isTie: INIT_TIE }) => {
  const { score, isTie } = tie;

  validateScore(score);
  validateIsBoolean(isTie);

  return Object.freeze({
    getTie: () => tie,

    getScore: () => score,

    getIsTie: () => isTie,

    setIsTie: () => makeTie({ ...tie, isTie: true }),

    incrementScore: () => makeTie({ ...tie, score: score + 1 }),

    resetScore: () => makeTie({ ...tie, score: 0 }),

    resetIsTie: () => makeTie({ ...tie, isTie: false }),

    resetTie: () => makeTie({ score: INIT_SCORE, isTie: INIT_TIE }),
  });
};

export default makeTie;
