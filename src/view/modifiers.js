import buildElement from "./builder";
import { gameBoard } from "./elements";

export const clearElement = element => element.removeInnerHTML().makeInstance();

export const displayElement = (element, shouldDisplay) =>
  shouldDisplay
    ? element.addClass("display-on").removeClass("display-off").makeInstance()
    : element.addClass("display-off").removeClass("display-on").makeInstance();

export const highlightElement = (element, mustHighlight) =>
  mustHighlight
    ? element.addClass("highlight").makeInstance()
    : element.removeClass("highlight").makeInstance();

export const updateContent = ({ element, value }) =>
  element.setContent(value).makeInstance();

const isWinCell = (winCells, row, col) =>
  winCells.some(cell => cell.row === row && cell.col === col);

export const updateCell = ({
  row,
  col,
  filler,
  content,
  winCells,
  isNewRound,
}) =>
  buildElement()
    .setTag("div")
    .setParent(gameBoard.getInstance())
    .addClass("cells")
    .setData("row", row)
    .setData("col", col)
    .setContent(content)
    .addClass(content === filler ? "hide-cell" : "show-cell")
    .addClass(isWinCell(winCells, row, col) && !isNewRound ? "win-cell" : "")
    .removeClass(isWinCell(winCells, row, col) && isNewRound ? "win-cell" : "")
    .makeInstance();
