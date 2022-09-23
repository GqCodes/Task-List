// Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task event
  form.addEventListener("submit", addTask);

  //   remove task event
  taskList.addEventListener("click", removeTask);

  // clear task event
  clearBtn.addEventListener("click", clearTasks);

  // filter task event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks From local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //   Loop through tasks that are there
  tasks.forEach(function (task) {
    //   Create li element
    const li = document.createElement("li");

    //   Add class to li
    li.className = "collection-item";

    //   Creat text node & append to li
    li.appendChild(document.createTextNode(task));

    //   create new link element (the "x" to delete the task item)
    const link = document.createElement("a");

    //   add class to "a" tag
    link.className = "delete-item secondary-content";

    //   add the font awesome icon for delete
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //   append the link (a tag with font awesome icon) to li
    li.appendChild(link);

    //   append li to ul
    taskList.appendChild(li);
  });
}

// Add Task Function
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Add a task");
    return;
  }

  //   Create li element
  const li = document.createElement("li");

  //   Add class to li
  li.className = "collection-item";

  //   Creat text node & append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //   create new link element (the "x" to delete the task item)
  const link = document.createElement("a");

  //   add class to "a" tag
  link.className = "delete-item secondary-content";

  //   add the font awesome icon for delete
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //   append the link (a tag with font awesome icon) to li
  li.appendChild(link);

  //   append li to ul
  taskList.appendChild(li);

  //   Store in localStorage
  storeTaskInLocalStorage(taskInput.value);

  //   clear input after submitting a task
  taskInput.value = "";
}

// store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task Function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      //   remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  //   taskList.innerHTML = "";

  // Faster Method
  while (taskList.firstElementChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //   Clear from local storage
  clearTasksFromLocalStorage();
}

// clear Tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
