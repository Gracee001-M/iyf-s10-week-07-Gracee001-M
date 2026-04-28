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