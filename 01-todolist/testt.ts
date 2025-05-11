type Todo = {
    id: number;
    title: string;
    completed: boolean;
  };
  
  let todos: Todo[] = [];
  
  const form = document.querySelector<HTMLFormElement>("#todo-form")!;
  const input = document.querySelector<HTMLInputElement>("#todo-input")!;
  const list = document.querySelector<HTMLUListElement>("#todo-list")!;
  const filterButtons = document.querySelectorAll<HTMLButtonElement>("#filters button");
  
  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function loadFromLocalStorage() {
    const data = localStorage.getItem("todos");
    if (data) {
      todos = JSON.parse(data);
    }
  }
  
  function renderTodos(filter: string = "all") {
    list.innerHTML = "";
    let filtered = todos;
  
    if (filter === "completed") filtered = todos.filter(t => t.completed);
    else if (filter === "pending") filtered = todos.filter(t => !t.completed);
  
    filtered.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.title;
      li.className = todo.completed ? "completed" : "";
  
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = "✓";
      toggleBtn.onclick = () => {
        todo.completed = !todo.completed;
        saveToLocalStorage();
        renderTodos(filter);
      };
  
      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑";
      delBtn.onclick = () => {
        todos = todos.filter(t => t.id !== todo.id);
        saveToLocalStorage();
        renderTodos(filter);
      };
  
      li.append(toggleBtn, delBtn);
      list.appendChild(li);
    });
  }
  
  form.onsubmit = (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (title === "") return;
  
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
  
    todos.push(newTodo);
    saveToLocalStorage();
    renderTodos();
    input.value = "";
  };
  
  filterButtons.forEach(btn => {
    btn.onclick = () => {
      document.querySelector("#filters .active")?.classList.remove("active");
      btn.classList.add("active");
      renderTodos(btn.dataset.filter || "all");
    };
  });
  
  // Başlangıçta yükle
  loadFromLocalStorage();
  renderTodos();
  