export const clearConfig = element => ({ element, action: "clear" });

export const displayConfig = (element, display) => ({
  element,
  action: display ? "display" : "undisplay",
});

export const highlightConfig = (element, highlight) => ({
  element,
  action: highlight ? "highlight" : "unhighlight",
});

export const infoConfig = (element, value) => ({
  element,
  value,
  action: "updateContent",
});

export const cellConfig = cellData => ({
  ...cellData,
  action: "updateCell",
});
