import { save, load } from "./storage.js";
import { generateId } from "./utils.js";

const STORAGE_KEY = "todos";

export const state = {
  todos: load(STORAGE_KEY, []),
  filter: "all"
};

export function addTodo(text) {
  state.todos.push({ id: generateId(), text, completed: false });
  save(STORAGE_KEY, state.todos);
}

export function toggleTodo(id) {
  state.todos = state.todos.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  save(STORAGE_KEY, state.todos);
}

export function deleteTodo(id) {
  state.todos = state.todos.filter(t => t.id !== id);
  save(STORAGE_KEY, state.todos);
}

export function setFilter(filter) {
  state.filter = filter;
}