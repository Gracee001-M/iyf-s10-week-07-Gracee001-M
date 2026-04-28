import { state, addTodo, toggleTodo, deleteTodo, setFilter } from "./state.js";

const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const filterSelect = document.getElementById("filterSelect");

export function renderTodos() {
  todoList.innerHTML = "";
  let todos = state.todos;

  if (state.filter === "active") todos = todos.filter(t => !t.completed);
  if (state.filter === "completed") todos = todos.filter(t => t.completed);

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) li.style.textDecoration = "line-through";

    li.onclick = () => toggleTodo(todo.id);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTodo(todo.id);

    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

export function bindEvents() {
  addBtn.onclick = () => {
    const text = todoInput.value.trim();
    if (text) {
      addTodo(text);
      todoInput.value = "";
      renderTodos();
    }
  };

  filterSelect.onchange = () => {
    setFilter(filterSelect.value);
    renderTodos();
  };
}