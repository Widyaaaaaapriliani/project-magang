function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToList(task.text, task.completed));
}

function addTaskToList(taskText, completed = false) {
    const li = document.createElement("li");
    li.className = completed ? "completed" : "";
    li.innerHTML = `
        <input type="checkbox" ${completed ? "checked" : ""}>
        ${taskText}
        <button class="deleteBtn">Delete</button>
    `;

    const checkbox = li.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", function() {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    const deleteBtn = li.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", function() {
        li.remove();
        updateLocalStorage();
    });

    document.getElementById("taskList").appendChild(li);
}
*
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.childNodes[1].textContent.trim(),
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("addTaskBtn").addEventListener("click", function() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTaskToList(taskText);
        taskInput.value = ""; 
        updateLocalStorage();
    }
});

// Load tasks when the page loads
loadTasks();
