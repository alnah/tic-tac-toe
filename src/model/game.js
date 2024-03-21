import makeBoard from "./board";

import makePlayer from "./player";

import makeTie from "./tie";

import makeObserver from "../utils/observer";

import {
  validateIsBoolean,
  validateBoard,
  validatePlayer,
  validateTie,
  validateWinCells,
} from "../utils/validators";

const INIT_CAN_PLAY = true;
const INIT_WIN_CELLS = Object.freeze([null, null, null]);

const makeGame = (
  player1Name,
  player2Name,
  game = {
    board: makeBoard(),
    player1: makePlayer()
      .setId(1)
      .setName(player1Name)
      .setSymbol("x")
      .setIsCurrent(),
    player2: makePlayer()
      .setId(2)
      .setName(player2Name)
      .setSymbol("o")
      .setIsNext(),
    tie: makeTie(),
    canPlay: INIT_CAN_PLAY,
    winCells: INIT_WIN_CELLS,
  },
) => {
  const { board, player1, player2, tie, canPlay, winCells } = game;
  validateBoard(board);
  validatePlayer(player1);
  validatePlayer(player2);
  validateTie(tie);
  validateIsBoolean(canPlay);
  validateWinCells(winCells, board.getSize());

  const gameObserver = makeObserver();

  return Object.freeze({
    getGame: () => game,
    getBoard: () => board,
    getPlayer1: () => player1,
    getPlayer2: () => player2,
    getCurrentPlayer: () => (player1.getIsCurrent() ? player1 : player2),
    getTie: () => tie,
    getCanPlay: () => canPlay,
    getWinCells: () => winCells,

    addObserver: observer => gameObserver.addObserver(observer),
    removeObserver: observer => gameObserver.removeObserver(observer),

    playTurn: function (row, col) {
      const cell = board.getCell(row, col);
      const filler = board.getFiller();

      if (!canPlay || cell !== filler) return makeGame(game);

      const currentPlayer = this.getCurrentPlayer();
      const symbol = currentPlayer.getSymbol();
      const updatedBoard = board.setCell(row, col, symbol);

      const isWin = updatedBoard.hasWin(row, col, symbol);
      const isTie = updatedBoard.hasTie(row, col, symbol);

      const updatedPlayer = isWin
        ? currentPlayer.setIsWinner().incrementScore()
        : currentPlayer;

      const winningCells = isWin
        ? updatedBoard.getWinCells(row, col, symbol)
        : INIT_WIN_CELLS;

      const updatedPlayer1 =
        player1.getId() === updatedPlayer.getId()
          ? updatedPlayer.setIsNext()
          : player1.setIsCurrent();

      const updatedPlayer2 =
        updatedPlayer.getId() === player2.getId()
          ? updatedPlayer.setIsNext()
          : player2.setIsCurrent();

      const updatedTie = isTie ? tie.setIsTie().incrementScore() : tie;

      const updatedGame = makeGame(player1Name, player2Name, {
        ...game,
        board: updatedBoard,
        player1: updatedPlayer1,
        player2: updatedPlayer2,
        tie: updatedTie,
        canPlay: !(isWin || isTie),
        winCells: winningCells,
      });

      gameObserver.notifyObservers(updatedGame);
      return updatedGame;
    },

    startNewRound: () => {
      const updatedBoard = board.resetBoard();

      const updatedPlayer1 = player1.getIsWinner()
        ? player1.resetIsWinner()
        : player1;

      const updatedPlayer2 = player2.getIsWinner()
        ? player2.resetIsWinner()
        : player2;

      const updatedTie = tie.getIsTie() ? tie.resetIsTie() : tie;

      const updatedGame = makeGame(player1Name, player2Name, {
        ...game,
        board: updatedBoard,
        player1: updatedPlayer1,
        player2: updatedPlayer2,
        tie: updatedTie,
        canPlay: INIT_CAN_PLAY,
      });

      gameObserver.notifyObservers(updatedGame);
      return updatedGame;
    },
  });
};

export default makeGame;
