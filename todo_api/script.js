/*Implement Local Storage for the To-Do List
mandatory
Objective
Enhance the To-Do List application by enabling it to save tasks in Local Storage, thus allowing the tasks to persist across browser sessions.

Detailed Instructions for JavaScript Implementation
Initialize and Load Tasks:

At the start of your script (inside the 'DOMContentLoaded' listener if continuing from the previous task), check Local Storage for an existing list of tasks.
Use localStorage.getItem('tasks') to retrieve the task list. If tasks are found, parse them from JSON to an array and populate the task list on the page.
Update Task Addition Functionality:

Modify the addTask function to also save tasks to Local Storage whenever a new task is added.
After appending the new task to the DOM, update your tasks array and save it back to Local Storage by serializing the array to JSON using JSON.stringify().
Implement Task Removal with Local Storage Update:

When a task is removed by clicking the “Remove” button, also remove it from the tasks array in your JavaScript.
Then, update Local Storage with the new array to reflect this change.
Code for Loading Tasks from Local Storage:

Write a function that loads tasks from Local Storage when the page loads.
This function should create task elements in the DOM for each task found in Local Storage, ensuring the list reflects saved data.
Saving Tasks to Local Storage:

Every time a task is added or removed, update the array of tasks in your script, then save this updated array to Local Storage.
Ensure the tasks remain available even after the browser is closed or refreshed.
Example Code Snippets
Loading Tasks from Local Storage:

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
}

// Adjust `addTask` to optionally save tasks to avoid duplication when loading from Local Storage
function addTask(taskText, save = true) {
    // Task creation logic remains the same

    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}
Invoking Load Function:

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    // Other initialization code
});
Instructions for Submission
Ensure your script accurately adds, removes, and loads tasks from Local Storage, offering persistence across sessions.
Adhere to the provided structure, especially the parts handling Local Storage, to ensure compatibility with automated checking.
Test your application thoroughly to confirm that tasks are correctly saved and loaded across browser sessions.*/

document.addEventListener('DOMContentLoaded', function() { 
   loadTasks();

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));                 //'false' indicates not to save again to Local Storage
    }


    function addTask(taskText='', save = true) {

        if(!taskText) {
            taskText = taskInput.value.trim();
        }


        if(taskText !=="") {
            const newTask = document.createElement('li');    // Create new <li> element
            newTask.textContent = taskText;
            newTask.classList.add('task-item');

             // Create a new "Remove" button
             //By default, when you create a <button> element in HTML without specifying a type, it defaults to type="submit".

            //This means if your button is inside a <form> element, clicking it will try to submit the form, which can:

            //reload the page

            //clear your input

            //prevent your JavaScript from behaving as expected
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';  //This ensures the button won’t accidentally submit the form, even if it's nested inside one.
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';

            // Set onclick event to remove the <li> from the list
            removeBtn.onclick = function() {
                taskList.removeChild(newTask);

                //remove from storage
                let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                tasks = tasks.filter(task => task !==taskText);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            };

            // Append the button to the <li>, and <li> to the list
            newTask.appendChild(removeBtn);
            taskList.appendChild(newTask);

        if(save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

            // Clear the input field
            taskInput.value = '';

        } else {
            alert("Enter a New Task");
        }
    }

    // Call addTask when the "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Allow adding task by pressing the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if(event.key === 'Enter') {
            addTask();
        }
    });

    //Optionally call addTask on DOM load (if you want to add a default task or trigger something)
    // Uncomment below if you want to run addTask on load:
    // addTask();
    //code is for basic to-do list..... check for more complicated todo list
});