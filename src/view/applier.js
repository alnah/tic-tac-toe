import {
  clearElement,
  displayElement,
  highlightElement,
  updateContent,
  updateCell,
} from "./modifiers";

import {
  clearConfig,
  displayConfig,
  highlightConfig,
  infoConfig,
  cellConfig,
} from "./configs";

import {
  gameBoard,
  startGameContainer,
  gameContainer,
  player1Name,
  player2Name,
  scorePlayer1,
  scorePlayer2,
  scoreTie,
} from "./elements";

const applyChange = ({ action, element, ...rest }) => {
  switch (action) {
    case "clear":
      clearElement(element);
      break;
    case "display":
      displayElement(element, true);
      break;
    case "undisplay":
      displayElement(element, false);
      break;
    case "highlight":
      highlightElement(element, true);
      break;
    case "unhighlight":
      highlightElement(element, false);
      break;
    case "updateContent":
      updateContent({ element, ...rest });
      break;
    case "updateCell":
      updateCell({ element, ...rest });
      break;
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};

const makeApplier = () => {
  const changes = [];

  const update = data => {
    const {
      fromMiddleware,
      startGame,
      startNewRound,
      restartGame,
      playTurn,
      game,
    } = data;

    if (!fromMiddleware) return;

    if (startGame || startNewRound || restartGame)
      changes.push(clearConfig(gameBoard));

    if (startGame)
      changes.push(
        displayConfig(startGameContainer, false),
        displayConfig(gameContainer, true),
      );

    if (startGame || playTurn || restartGame)
      changes.push(
        infoConfig(player1Name, game.getPlayer1().getName()),
        infoConfig(player2Name, game.getPlayer2().getName()),
        infoConfig(scorePlayer1, game.getPlayer1().getScore()),
        infoConfig(scorePlayer2, game.getPlayer2().getScore()),
        infoConfig(scoreTie, game.getTie().getScore()),
      );

    if (restartGame)
      changes.push(
        displayConfig(startGameContainer, true),
        displayConfig(gameContainer, false),
      );

    if (game.getCanPlay()) {
      const currentPlayer = game.getCurrentPlayer();
      const player1 = game.getPlayer1();
      changes.push(
        highlightConfig(player1Name, currentPlayer === player1),
        highlightConfig(player2Name, currentPlayer !== player1),
      );
    }

    const gridData = game
      .getBoard()
      .getGrid()
      .flatMap((rowContent, row) =>
        rowContent.map((content, col) =>
          cellConfig({
            filler: game.getBoard().getFiller(),
            content,
            row,
            col,
            winCells: game.getWinCells(),
            isNewRound: !!startNewRound,
          }),
        ),
      );

    changes.push(...gridData);
    changes.forEach(applyChange);
  };

  return Object.freeze({ update });
};

export default makeApplier;
