import buildHTMLElement from "./builder";

/**
 * Game initialization element
 */
export const startGameContainer = buildHTMLElement()
  .setTag("div")
  .addClass("start-game-container")
  .setId("start-game-container")
  .setParent(document.body)
  .makeInstance();

export const startGameForm = buildHTMLElement()
  .setTag("form")
  .setFormAction("#")
  .setFormMethod("get")
  .setId("start-game-form")
  .setParent(startGameContainer.getInstance())
  .makeInstance();

/**
 * Player input elements
 */
export const inputContainerPlayer1 = buildHTMLElement()
  .setTag("div")
  .addClass("player1-input-container")
  .setParent(startGameForm.getInstance())
  .makeInstance();

export const labelPlayer1 = buildHTMLElement()
  .setTag("label")
  .setLabelFor("player1-input")
  .setContent("Player 1")
  .setParent(inputContainerPlayer1.getInstance())
  .makeInstance();

export const inputPlayer1 = buildHTMLElement()
  .setTag("input")
  .setInputType("text")
  .addClass("player1-input")
  .setId("player1-input")
  .setInputName("player1-input")
  .setInputPlaceholder("John")
  .setParent(inputContainerPlayer1.getInstance())
  .makeInstance();

export const inputContainerPlayer2 = buildHTMLElement()
  .setTag("div")
  .addClass("player2-input-container")
  .setParent(startGameForm.getInstance())
  .makeInstance();

export const labelPlayer2 = buildHTMLElement()
  .setTag("label")
  .setLabelFor("player2-input")
  .setContent("Player 2")
  .setParent(inputContainerPlayer2.getInstance())
  .makeInstance();

export const inputPlayer2 = buildHTMLElement()
  .setTag("input")
  .setInputType("text")
  .addClass("player2-input")
  .setId("player2-input")
  .setInputName("player2-input")
  .setInputPlaceholder("Jane")
  .setParent(inputContainerPlayer2.getInstance())
  .makeInstance();

/**
 * Game control elements
 */
export const startGameBtn = buildHTMLElement()
  .setTag("button")
  .setButtonType("submit")
  .addClass("start-game-btn")
  .setContent("Start Game")
  .setParent(startGameForm.getInstance())
  .makeInstance();

/**
 * Main game UI elements
 */
export const gameContainer = buildHTMLElement()
  .setTag("div")
  .addClass("game-container")
  .setId("game-container")
  .setParent(document.body)
  .makeInstance();

export const header = buildHTMLElement()
  .setTag("header")
  .addClass("header")
  .setId("header")
  .setParent(gameContainer.getInstance())
  .makeInstance();

/**
 * Player display elements
 */
export const containerPlayer1 = buildHTMLElement()
  .setTag("div")
  .addClass("player1")
  .setParent(header.getInstance())
  .makeInstance();

export const player1Name = buildHTMLElement()
  .setTag("h2")
  .addClass("name")
  .setId("player1-name")
  .setParent(containerPlayer1.getInstance())
  .makeInstance();

export const scorePlayer1 = buildHTMLElement()
  .setTag("h2")
  .addClass("score")
  .setId("player1-score")
  .setParent(containerPlayer1.getInstance())
  .makeInstance();

export const containerPlayer2 = buildHTMLElement()
  .setTag("div")
  .addClass("player2")
  .setParent(header.getInstance())
  .makeInstance();

export const player2Name = buildHTMLElement()
  .setTag("h2")
  .addClass("name")
  .setId("player2-name")
  .setParent(containerPlayer2.getInstance())
  .makeInstance();

export const scorePlayer2 = buildHTMLElement()
  .setTag("h2")
  .addClass("score")
  .setId("player2-score")
  .setParent(containerPlayer2.getInstance())
  .makeInstance();

/**
 * Tie display elements
 */
export const tieContainer = buildHTMLElement()
  .setTag("div")
  .addClass("tie")
  .setParent(header.getInstance())
  .makeInstance();

export const isTie = buildHTMLElement()
  .setTag("h2")
  .addClass("tie")
  .setId("is-tie")
  .setContent("Tie")
  .setParent(tieContainer.getInstance())
  .makeInstance();

export const scoreTie = buildHTMLElement()
  .setTag("h2")
  .addClass("tie")
  .setId("score-tie")
  .setParent(tieContainer.getInstance())
  .makeInstance();

/**
 * Game board and control elements
 */
export const mainGame = buildHTMLElement()
  .setTag("main")
  .addClass("main")
  .setId("main")
  .setParent(gameContainer.getInstance())
  .makeInstance();

export const gameBoard = buildHTMLElement()
  .setTag("div")
  .addClass("board")
  .setId("board")
  .setParent(mainGame.getInstance())
  .makeInstance();

export const btnContainer = buildHTMLElement()
  .setTag("div")
  .addClass("btn-container")
  .setParent(mainGame.getInstance())
  .makeInstance();

export const newRoundBtn = buildHTMLElement()
  .setTag("button")
  .addClass("btn")
  .setId("new-round-btn")
  .setContent("New Round")
  .setParent(btnContainer.getInstance())
  .makeInstance();

export const restartGameBtn = buildHTMLElement()
  .setTag("button")
  .addClass("btn")
  .setId("restart-game-btn")
  .setContent("Restart Game")
  .setParent(btnContainer.getInstance())
  .makeInstance();

/**
 * Footer elements
 */
export const footer = buildHTMLElement()
  .setTag("footer")
  .addClass("footer")
  .setId("footer")
  .setParent(document.body)
  .makeInstance();

export const leftSideFooter = buildHTMLElement()
  .setTag("p")
  .addClass("left-side")
  .setContent("copyright 2024 © alexis nahan")
  .setParent(footer.getInstance())
  .makeInstance();

export const rightSideFooter = buildHTMLElement()
  .setTag("div")
  .addClass("right-side")
  .setParent(footer.getInstance())
  .makeInstance();

/**
 * Social media elements
 */
export const githubBtn = buildHTMLElement()
  .setTag("a")
  .addClass("github-btn")
  .setHref("https://github.com/alnah")
  .setTarget("_blank")
  .setParent(rightSideFooter.getInstance())
  .makeInstance();

export const githubIcon = buildHTMLElement()
  .setTag("i")
  .addClass("fab")
  .addClass("fa-github")
  .setParent(githubBtn.getInstance())
  .makeInstance();

export const githubName = buildHTMLElement()
  .setTag("p")
  .addClass("github-name")
  .setContent("alnah")
  .setParent(rightSideFooter.getInstance())
  .makeInstance();
