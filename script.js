// Function to add a task
function addTask(priority) {
    const taskText = prompt('Enter your task:');
    if (taskText) {
        const task = document.createElement('li');
        task.setAttribute('draggable', 'true');
        task.classList.add('task-item');
        
        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function () {
            task.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        });
        
        // Task description
        const taskDesc = document.createElement('input');
        taskDesc.type = 'text';
        taskDesc.value = taskText;
        taskDesc.disabled = true;
        
        // Append to the corresponding priority list
        task.appendChild(checkbox);
        task.appendChild(taskDesc);
        document.getElementById(`${priority}-list`).appendChild(task);

        // Enable Drag-and-Drop functionality
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragover', dragOver);
        task.addEventListener('drop', drop);
        task.addEventListener('dragenter', dragEnter);
        task.addEventListener('dragleave', dragLeave);
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
