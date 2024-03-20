import makeBoard from "./board";
import makePlayer from "./player";
import makeTie from "./tie";
import makeObserver from "../utils/observer";

/**
 * Initial value for the canPlay property in the game state.
 * @type {boolean}
 */
const INIT_CAN_PLAY = true;

/**
 * Initial value for the winCells property in the game state.
 * @type {Array}
 */
const INIT_WIN_CELLS = Object.freeze([]);

/**
 * Creates a new game with the given player names and initial game state.
 * @param {string} namePlayer1 - The name of player 1.
 * @param {string} namePlayer2 - The name of player 2.
 * @param {Object} game - The initial game state.
 * @returns {Object} The new game object.
 */
const makeGame = (
  namePlayer1 = "Player 1",
  namePlayer2 = "Player 2",
  game = {
    board: makeBoard(),
    player1: makePlayer()
      .setId(1)
      .setName(namePlayer1)
      .setSymbol("x")
      .setIsCurrent(),
    player2: makePlayer()
      .setId(2)
      .setName(namePlayer2)
      .setSymbol("o")
      .setIsNext(),
    tie: makeTie(),
    canPlay: INIT_CAN_PLAY,
    winCells: INIT_WIN_CELLS,
  },
) => {
  const { board, player1, player2, tie, canPlay, winCells } = game;
  const gameObserver = makeObserver();

  return Object.freeze({
    /**
     * Get the current game state.
     * @returns {Object} The current game state.
     */
    getGame: () => game,

    /**
     * Get the game board.
     * @returns {Object} The game board.
     */
    getBoard: () => board,

    /**
     * Get player 1.
     * @returns {Object} Player 1.
     */
    getPlayer1: () => player1,

    /**
     * Get player 2.
     * @returns {Object} Player 2.
     */
    getPlayer2: () => player2,

    /**
     * Get the current player.
     * @returns {Object} The current player.
     */
    getCurrentPlayer: () => (player1.getIsCurrent() ? player1 : player2),

    /**
     * Get the tie object.
     * @returns {Object} The tie object.
     */
    getTie: () => tie,

    /**
     * Check if the game can be played.
     * @returns {boolean} True if the game can be played, false otherwise.
     */
    getCanPlay: () => canPlay,

    /**
     * Get the cells that resulted in a win.
     * @returns {Array} The cells that resulted in a win.
     */
    getWinCells: () => winCells,

    /**
     * Play a turn in the game.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {Object} The updated game state after playing the turn.
     */
    playTurn: function (row, col) {
      const cell = board.getCell(row, col);
      const filler = board.getFiller();

      if (!canPlay || cell !== filler) return makeGame(game);

      const currentPlayer = this.getCurrentPlayer();
      const symbol = currentPlayer.getSymbol();
      const updatedBoard = board.setCell(row, col, symbol);

      const isWin = updatedBoard.hasWin(row, col, symbol);
      const isTie = updatedBoard.hasTie(row, col, symbol);

      const updatedPlayer =
        isWin ? currentPlayer.setIsWinner().incrementScore() : currentPlayer;

      const winningCells =
        isWin ? updatedBoard.getWinCells(row, col, symbol) : INIT_WIN_CELLS;

      const updatedPlayer1 =
        player1.getId() === updatedPlayer.getId() ?
          updatedPlayer.setIsNext()
        : player1.setIsCurrent();

      const updatedPlayer2 =
        updatedPlayer.getId() === player2.getId() ?
          updatedPlayer.setIsNext()
        : player2.setIsCurrent();

      const updatedTie = isTie ? tie.setIsTie().incrementScore() : tie;

      const updatedGame = makeGame(namePlayer1, namePlayer2, {
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

    /**
     * Start a new round in the game.
     * @returns {Object} The updated game state after starting a new round.
     */
    startNewRound: () => {
      const updatedBoard = board.resetBoard();

      const updatedPlayer1 =
        player1.getIsWinner() ? player1.resetIsWinner() : player1;

      const updatedPlayer2 =
        player2.getIsWinner() ? player2.resetIsWinner() : player2;

      const updatedTie = tie.getIsTie() ? tie.resetIsTie() : tie;

      const updatedGame = makeGame(namePlayer1, namePlayer2, {
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

    /**
     * Add an observer to the game.
     * @param {Function} observer - The observer function to add.
     */
    addObserver: observer => gameObserver.addObserver(observer),

    /**
     * Remove an observer from the game.
     * @param {Function} observer - The observer function to remove.
     */
    removeObserver: observer => gameObserver.removeObserver(observer),
  });
};

export default makeGame;
