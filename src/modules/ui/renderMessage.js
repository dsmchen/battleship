export default function renderMessage(type, text) {
  let message;

  if (type === "action") {
    message = document.querySelector(".action-message");
  } else if (type === "turn") {
    message = document.querySelector(".turn-message");
  }

  message.textContent = text;
}
