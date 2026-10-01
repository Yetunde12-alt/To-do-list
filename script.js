// -------------------------------------
// Get elements from the HTML
// -------------------------------------

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

const emptyState = document.getElementById("emptyState");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");

const clearCompletedButton = document.getElementById("clearCompletedButton");


// -------------------------------------
// Load saved tasks from localStorage
// -------------------------------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// -------------------------------------
// Save tasks to localStorage
// -------------------------------------

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// -------------------------------------
// Display all tasks on the page
// -------------------------------------

function renderTasks() {

    // Clear the current list before displaying tasks again
    taskList.innerHTML = "";

    // Display or hide the empty state
    if (tasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }


    // Create HTML for each task
    tasks.forEach(function(task) {

        const listItem = document.createElement("li");

        listItem.classList.add("task-item");

        // Add completed class if the task is completed
        if (task.completed) {
            listItem.classList.add("completed");
        }


        // Create checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;


        // When checkbox is clicked
        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();

            renderTasks();
        });


        // Create task text
        const taskText = document.createElement("span");

        taskText.classList.add("task-text");

        taskText.textContent = task.text;


        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-button");


        // Delete the task when the button is clicked
        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(function(currentTask) {
                return currentTask.id !== task.id;
            });

            saveTasks();

            renderTasks();
        });


        // Add elements to the task
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);

        // Add the complete task to the list
        taskList.appendChild(listItem);
    });


    // Update the task counters
    updateTaskCounts();
}


// -------------------------------------
// Add a new task
// -------------------------------------

function addTask() {

    // Remove unnecessary spaces from the beginning/end
    const taskText = taskInput.value.trim();


    // Prevent empty tasks
    if (taskText === "") {
        return;
    }


    // Create a new task
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };


    // Add the new task to our tasks array
    tasks.push(newTask);


    // Save the updated tasks
    saveTasks();


    // Display the updated task list
    renderTasks();


    // Clear the input field
    taskInput.value = "";

    // Put the cursor back inside the input
    taskInput.focus();
}


// -------------------------------------
// Update task counts
// -------------------------------------

function updateTaskCounts() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const remaining = total - completed;


    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    remainingTasks.textContent = remaining;
}


// -------------------------------------
// Clear completed tasks
// -------------------------------------

clearCompletedButton.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();

    renderTasks();
});


// -------------------------------------
// Add task when button is clicked
// -------------------------------------

addTaskButton.addEventListener("click", addTask);


// -------------------------------------
// Add task when Enter is pressed
// -------------------------------------

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }
});


// -------------------------------------
// Display saved tasks when page loads
// -------------------------------------

renderTasks();