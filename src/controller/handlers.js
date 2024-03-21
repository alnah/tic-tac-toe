import {
  validatePayload,
  validateType,
  validateNotify,
  validateIsBoolean,
} from "../utils/validators";

import { getCellPayload, getStartGamePayload } from "./payloads";

const makeHandler = ({ payload, type, notify, mustPreventDefault = false }) => {
  if (payload) validatePayload(payload);
  validateType(type);
  validateNotify(notify);
  validateIsBoolean(mustPreventDefault);

  const baseData = Object.freeze({
    fromController: true,
    [type]: true,
  });

  return event => {
    if (mustPreventDefault) event.preventDefault();
    if (!payload || payload === undefined || payload === null) {
      notify(baseData);
    } else {
      notify({ ...baseData, ...Object.freeze(payload(event)) });
    }
  };
};

export const startGameHandler = notify => {
  console.log("startGameHandler triggered");
  return makeHandler({
    payload: getStartGamePayload,
    type: "startGameClick",
    notify,
    mustPreventDefault: true,
  });
};

export const cellClickHandler = notify =>
  makeHandler({
    payload: getCellPayload,
    type: "cellClick",
    notify,
  });

export const newRoundHandler = notify =>
  makeHandler({
    type: "newRoundClick",
    notify,
  });

export const restartGameHandler = notify =>
  makeHandler({
    type: "restartGameClick",
    notify,
  });
