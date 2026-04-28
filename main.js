// Create store with persistence
const createStore = (initialState, storageKey) => {
  let state = initialState;
  const listeners = [];

  // Load saved state
  const saved = localStorage.getItem(storageKey);
  if (saved) state = JSON.parse(saved);

  const notify = () => listeners.forEach(l => l(state));

  return {
    getState: () => state,

    setState: (updates) => {
      state = { ...state, ...updates };
      localStorage.setItem(storageKey, JSON.stringify(state));
      notify();
    },

    subscribe: (listener) => {
      listeners.push(listener);
      listener(state); // run immediately
      return () => {
        const i = listeners.indexOf(listener);
        if (i > -1) listeners.splice(i, 1);
      };
    }
  };
};

// Usage
const store = createStore({ todos: [], filter: "all" }, "todoApp");

// Example subscriber
store.subscribe(state => {
  console.log("Render UI with state:", state);
});

// Add todo
function addTodo(text) {
  const todos = [...store.getState().todos, { id: Date.now(), text, completed: false }];
  store.setState({ todos });
}

// Toggle todo
function toggleTodo(id) {
  const todos = store.getState().todos.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  store.setState({ todos });
}

const MIN_PASSWORD_LENGTH = 8;
if (password.length < MIN_PASSWORD_LENGTH) { }

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
setTimeout(callback, ONE_DAY_MS);

// BAD
function toggle(id) {
  const t = todos.find(x => x.i === id);
  t.c = !t.c;
}

// GOOD
function toggleTodo(todoId) {
  const todo = todos.find(item => item.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
  }
}

const FILTER_ALL = "all";
const FILTER_ACTIVE = "active";
const FILTER_COMPLETED = "completed";

function setFilter(filter) {
  if ([FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED].includes(filter)) {
    state.filter = filter;
  }
}