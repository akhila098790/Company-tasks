const taskField = document.getElementById("taskField");
const addButton = document.getElementById("addButton");
const list = document.getElementById("list");
const countSpan = document.getElementById("count");

let taskCount = 0;
let idCounter = 0;

addButton.addEventListener("click", addNewTask);

function addNewTask() {
  const text = taskField.value.trim();

  if (text === "") {
    alert("Enter task");
    return;
  }

  idCounter++;

  const li = document.createElement("li");
  li.setAttribute("data-id", idCounter);

  const span = document.createElement("span");
  span.textContent = text;

  const btnBox = document.createElement("div");

  // Edit
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "editBtn";
  editBtn.addEventListener("click", function () {
    editItem(li.getAttribute("data-id"));
  });

  // Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteBtn";
  deleteBtn.addEventListener("click", function () {
    deleteItem(li);
  });

  btnBox.appendChild(editBtn);
  btnBox.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnBox);

  list.appendChild(li);

  taskCount++;
  updateCount();

  taskField.value = "";
}

function editItem(id) {
  const items = list.querySelectorAll("li");

  items.forEach(function (li) {
    if (li.getAttribute("data-id") === id) {
      const span = li.querySelector("span");
      const updated = prompt("Edit task:", span.textContent);

      if (updated && updated.trim() !== "") {
        span.textContent = updated.trim();
      }
    }
  });
}

function deleteItem(li) {
  if (confirm("Delete task?")) {
    list.removeChild(li);
    taskCount--;
    updateCount();
  }
}

function updateCount() {
  countSpan.textContent = taskCount;
}