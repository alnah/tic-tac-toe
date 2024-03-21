import { validateIsEvent } from "../utils/validators";

const getDefaultPlayerName = number => `Player ${number}`;

export const getStartGamePayload = event => {
  validateIsEvent(event);
  const form = new FormData(event.target);
  return Object.freeze({
    player1Name: form.get("player1-input") || getDefaultPlayerName(1),
    player2Name: form.get("player2-input") || getDefaultPlayerName(2),
  });
};

export const getCellPayload = event => {
  validateIsEvent(event);
  return Object.freeze({
    value: event.target.value,
    row: Number(event.target.dataset.row),
    col: Number(event.target.dataset.col),
  });
};
