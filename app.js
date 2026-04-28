import { renderTodos, bindEvents } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderTodos();
});