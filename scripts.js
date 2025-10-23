// tässä tallennus avain local storageen
const STORAGE_KEY = "todo-items";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const errorMsg = document.getElementById("error-message");

let todos = [];

// local storageen tallennus ja palauttaa tiedot refreshin jälkeen
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    todos = JSON.parse(saved);
    renderTodos();
  }
});

// lomakkeen lähetys
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();

  // virheilmoitus, jos tiedot eivät täytä vaatimuksia
  if (text.length < 3) {
    showError("Tehtävän on oltava vähintään 3 merkkiä pitkä.");
    input.classList.add("error");
    return;
  }

  // poistaa vanhat arvot ja päivittää uusiin
  const todo = { id: Date.now(), text, done: false };
  todos.push(todo);
  input.value = "";
  input.classList.remove("error");
  errorMsg.textContent = "";
  saveTodos();
  renderTodos();
});

// virhe ilmoitus
function showError(message) {
  errorMsg.textContent = message;
}

// tehtävien luonti ja niiden näyttäminen kentän alapuolella
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.addEventListener("click", () => toggleDone(todo.id));

    const btn = document.createElement("button");
    btn.textContent = "Poista";
    btn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// merkitsee tehtävän tehdyksi 
function toggleDone(id) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  saveTodos();
  renderTodos();
}

// poistaa tehtävän
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
}

// tallennus localstorageen
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}