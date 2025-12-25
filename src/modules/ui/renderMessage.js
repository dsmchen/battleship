function renderMessage(el, text) {
  el.textContent = text;
}

function renderActionMessage(text) {
  const el = document.querySelector(".action-message");
  renderMessage(el, text);
}

function renderTurnMessage(text) {
  const el = document.querySelector(".turn-message");
  renderMessage(el, text);
}

export { renderActionMessage, renderTurnMessage };
