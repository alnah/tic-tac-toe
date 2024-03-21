import {
  validateIsHTMLElement,
  validateEventType,
  validateHandler,
} from "../utils/validators";

import makeObserver from "../utils/observer";

import {
  startGameForm,
  gameBoard,
  newRoundBtn,
  restartGameBtn,
} from "../view/elements";

import {
  startGameHandler,
  cellClickHandler,
  newRoundHandler,
  restartGameHandler,
} from "./handlers";

const attachEventListener = ({ handler, eventType, element }) => {
  validateHandler(handler);
  validateIsHTMLElement(element);
  validateEventType(eventType);
  return element.addEventListener(eventType, handler);
};

const makeController = () => {
  const controllerObserver = makeObserver();
  const notify = controllerObserver.notifyObservers;

  const startGameListener = {
    handler: startGameHandler(notify),
    element: startGameForm.getInstance(),
    eventType: "submit",
  };

  const cellClickListener = {
    handler: cellClickHandler(notify),
    element: gameBoard.getInstance(),
    eventType: "click",
  };

  const newRoundListener = {
    handler: newRoundHandler(notify),
    element: newRoundBtn.getInstance(),
    eventType: "click",
  };

  const restartGameListener = {
    handler: restartGameHandler(notify),
    element: restartGameBtn.getInstance(),
    eventType: "click",
  };

  const listeners = [
    startGameListener,
    cellClickListener,
    newRoundListener,
    restartGameListener,
  ];

  listeners.forEach(({ handler, element, eventType }) =>
    attachEventListener({ handler, element, eventType }),
  );

  return {
    addObserver: controllerObserver.addObserver,
    removeObserver: controllerObserver.removeObserver,
  };
};

export default makeController;
