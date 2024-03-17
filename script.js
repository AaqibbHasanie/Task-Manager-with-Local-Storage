const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function loadTasks() {
  const tasksData = JSON.parse(localStorage.getItem("tasks")) || {
    tasks: [],
    checkboxes: [],
  };
  tasksData.tasks.forEach((task, index) => {
    addTaskToList(task, index + 1, tasksData.checkboxes[index]);
  });
}

function saveTasks(tasksData) {
  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

function addTaskToList(task, serialNumber, isChecked) {
  const taskList = document.getElementById("task-list");
  const newRow = document.createElement("tr");
  const serialCell = document.createElement("td");
  serialCell.textContent = serialNumber + ".";
  newRow.appendChild(serialCell);

  const taskCell = document.createElement("td");
  taskCell.textContent = task;
  newRow.appendChild(taskCell);

  const checkboxCell = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;
  checkbox.addEventListener("change", function () {
    updateTasks();
  });
  checkboxCell.appendChild(checkbox);
  newRow.appendChild(checkboxCell);

  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    newRow.remove();
    updateTasks();
  });
  deleteCell.appendChild(deleteButton);
  newRow.appendChild(deleteCell);

  taskList.appendChild(newRow);

  updateSerialNumbers();
}

function updateSerialNumbers() {
  const taskContainers = document.querySelectorAll(".task-container");
  if (taskContainers.length > 0) {
    taskContainers.forEach((container, index) => {
      const serialSpan = container.querySelector(".serial-number");
      serialSpan.textContent = index + 1 + ".";
    });
  }
}

function updateTasks() {
  const tasks = [];
  const checkboxes = [];

  const taskRows = document.querySelectorAll("#task-list tr");

  taskRows.forEach((row) => {
    const taskDescription = row.children[1].textContent;
    const isChecked = row.querySelector("input[type='checkbox']").checked;

    tasks.push(taskDescription);
    checkboxes.push(isChecked);
  });

  saveTasks({
    tasks: tasks,
    checkboxes: checkboxes,
  });

  updateSerialNumbers();
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const tasksData = getTasks();
    const serialNumber = tasksData.tasks.length + 1;
    addTaskToList(taskText, serialNumber);
    taskInput.value = "";
    updateTasks();
  }
});

function displayTasks() {
  const tasksData = getTasks();
  if (tasksData.tasks.length > 0) {
    tasksData.tasks.forEach((task, index) => {
      addTaskToList(task, index + 1, tasksData.checkboxes[index]);
    });
  }
}

function getTasks() {
  return (
    JSON.parse(localStorage.getItem("tasks")) || {
      tasks: [],
      checkboxes: [],
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  displayTasks();
});
