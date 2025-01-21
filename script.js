// Function to show input field for task
function showInputField(priority) {
    const inputContainer = document.getElementById(`${priority}-input-container`);
    
    // Ensure there's no existing input field or submit button
    inputContainer.innerHTML = '';

    // Create input field for new task
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter your task...';

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add';
    submitButton.classList.add('submit-task');
    submitButton.onclick = function() {
        addTask(priority, inputField.value);
        inputContainer.innerHTML = ''; // Clear input field after task is added
    };

    // Append input and submit button to the container
    inputContainer.appendChild(inputField);
    inputContainer.appendChild(submitButton);

    // Focus on the input field for easier typing
    inputField.focus();
}

// Function to add task
function addTask(priority, taskText) {
    if (taskText && taskText.trim() !== '') {
        // Create the task element (li)
        const task = document.createElement('li');
        task.setAttribute('draggable', 'true');
        task.classList.add('task-item');
        
        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function () {
            task.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        });
        
        // Create the task description
        const taskDesc = document.createElement('input');
        taskDesc.type = 'text';
        taskDesc.value = taskText;
        taskDesc.disabled = true;
        
        // Append the checkbox and description to the task
        task.appendChild(checkbox);
        task.appendChild(taskDesc);
        
        // Append the task to the appropriate priority list
        document.getElementById(`${priority}-list`).appendChild(task);

        // Enable Drag-and-Drop functionality
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragover', dragOver);
        task.addEventListener('drop', drop);
        task.addEventListener('dragenter', dragEnter);
        task.addEventListener('dragleave', dragLeave);
    } else {
        alert("Please enter a valid task.");
    }
}

// Drag-and-drop functionality
let draggedTask = null;

function dragStart(e) {
    draggedTask = this;
    setTimeout(() => {
        this.style.display = 'none';
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    if (draggedTask !== this) {
        const parent = this.parentNode;
        const allTasks = Array.from(parent.children);
        const indexDragged = allTasks.indexOf(draggedTask);
        const indexDropped = allTasks.indexOf(this);

        if (indexDragged < indexDropped) {
            parent.insertBefore(draggedTask, this.nextSibling);
        } else {
            parent.insertBefore(draggedTask, this);
        }
    }
}

function dragEnter(e) {
    this.style.backgroundColor = '#e1e1e1';
}

function dragLeave(e) {
    this.style.backgroundColor = '';
}
