import {
  validatePlayerId,
  validateName,
  validateSymbol,
  validateIsBoolean,
  validateScore,
} from "../utils/validators";

const INIT_SCORE = 0;
const INIT_IS_WINNER = false;

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
    setId: newId => makePlayer({ ...player, id: validatePlayerId(newId) }),

    setName: newName =>
      makePlayer({ ...player, name: validateName(newName).slice(0, 12) }),

    setSymbol: newSymbol =>
      makePlayer({ ...player, symbol: validateSymbol(newSymbol) }),

    setIsCurrent: () => makePlayer({ ...player, isCurrent: true }),

    setIsNext: () => makePlayer({ ...player, isCurrent: false }),

    setIsWinner: () => makePlayer({ ...player, isWinner: true }),

    getPlayer: () => player,

    getId: () => id,

    getName: () => name,

    getSymbol: () => symbol,

    getIsCurrent: () => isCurrent,

    getIsWinner: () => isWinner,

    getScore: () => score,

    incrementScore: () => makePlayer({ ...player, score: score + 1 }),

    resetIsWinner: () => makePlayer({ ...player, isWinner: false }),

    resetScore: () => makePlayer({ ...player, score: 0 }),
  });
};

export default makePlayer;
