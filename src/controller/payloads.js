import { validateIsEvent } from "../utils/validators";

export const getStartGamePayload = event => {
  validateIsEvent(event);
  const form = new FormData(event.target);
  return Object.freeze({
    namePlayer1: form.get("player1-input") || "Player 1",
    namePlayer2: form.get("player2-input") || "Player 2",
  });
};

export const getCellPayload = event => {
  validateIsEvent(event);
  return Object.freeze({
    value: event.target.value,
    row: event.target.dataset.row,
    col: event.target.dataset.col,
  });
};
