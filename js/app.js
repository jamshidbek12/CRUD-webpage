const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const input = document.getElementById("input-create");
const edit = document.getElementById("input-edit");
// const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");
const clearAll = document.getElementById("clear-all");

let editTodoId;

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) {
  showTodos();
}

// set todos
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));

  listGroupTodo.innerHTML = "";

  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li ondblclick="completedTodo(${i})" class="list-group-item d-flex justify-content-between ${
      item.completed == true ? "complated" : ""
    }">
          ${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick="editTodo(${i})" src="img/edit.svg" alt="edit" width="25" height="25" />
            <img onclick="deleteTodo(${i})" src="img/delete.svg" alt="delete" width="25" height="25" />
          </div>
        </li>`;
  });
}

// get time

function getTime() {
  const now = new Date();
  const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getDate() + 1) : now.getDate() + 1;
  const year = now.getFullYear();
  const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const seconds =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const month_title = now.getMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sentember",
    "October",
    "November",
    "December",
  ];
  fullDay.textContent = `${day} ${months[month_title]}, ${year}`;
  hourEl.textContent = hours;
  minuteEl.textContent = minutes;
  secondEl.textContent = seconds;
  return `${hours}:${minutes}, ${day}.${month}.${year}`;
}
setInterval(() => {
  getTime();
}, 1000);

// show message
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = input.value.trim();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), completed: false });
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please, enter some text...");
  }
  formCreate.reset();
});

clearAll.addEventListener("click", (e) => {
  e.preventDefault();
  todos = [];
  setTodos();
  showTodos();
});

// delete
function deleteTodo(id) {
  const deleted = todos.filter((item, i) => {
    return i !== id;
  });

  todos = deleted;
  setTodos();
  showTodos();
}

// Compalted
function completedTodo(id) {
  let completed = todos.map((item, i) => {
    if (i == id) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = completed;
  setTodos();
  showTodos();
}

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = edit.value.trim();
  if (todoText.length) {
    todos.splice(editTodoId, 1, {
      text: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();
    close();
  } else {
    showMessage("message-edit", "Please, enter some text...");
  }
  formEdit.reset();
});

function editTodo(id) {
  editTodoId = id;
  open();
  return editTodoId;
}

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 27) {
    close();
  }
});

closeEl.addEventListener("click", close);
overlay.addEventListener("click", close);
