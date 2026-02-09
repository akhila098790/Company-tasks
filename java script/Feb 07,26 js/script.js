 function addTask() {
      const input = document.getElementById("taskInput");
      const taskText = input.value.trim();

      if (taskText === "") return;

      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = taskText;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.onclick = function () {
        const newText = prompt("Edit task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
          span.textContent = newText;
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      editBtn.className = "delete-btn";
      deleteBtn.onclick = function () {
        li.remove();
      };

      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      document.getElementById("taskList").appendChild(li);
      input.value = "";
    }