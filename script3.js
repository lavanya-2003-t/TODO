document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('task-input');
  const taskDate = document.getElementById('task-date');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const deleteBtn = document.getElementById('delete-btn');
  const completedTaskList = document.getElementById('completed-task-list');
  const taskCount = document.getElementById('task-count');
  const completedTaskCount = document.getElementById('completed-task-count');
  let taskId = 0;
  let completedTaskId = 0;

  // Function to add a new task
  function addTask(taskName, taskDateValue) {
    const li = document.createElement('li');
    li.dataset.id = taskId;
    li.innerHTML = `
      <div class="task-details">
        <input type="checkbox" id="task-${taskId}" class="task-checkbox">
        <label for="task-${taskId}">${taskName} (${taskDateValue})</label>
      </div>
      <div class="task-buttons">
        <button class="delete-btn">Delete</button>
        <button class="cancel-btn">Cancel</button>
      </div>
    `;
    taskList.appendChild(li);
    taskId++;
    updateTaskCount();
  }

  // Function to update task count
  function updateTaskCount() {
    const taskCountValue = taskList.children.length;
    taskCount.textContent = `${taskCountValue} task${taskCountValue !== 1 ? 's' : ''}`;
  }

  // Function to add a completed task
  function addCompletedTask(taskName, taskDateValue) {
    const li = document.createElement('li');
    li.dataset.id = completedTaskId;
    li.innerHTML = `
      <div class="task-details">
        <span>${taskName} (${taskDateValue})</span>
      </div>
    `;
    completedTaskList.appendChild(li);
    completedTaskId++;
    updateCompletedTaskCount();
  }

  // Function to update completed task count
  function updateCompletedTaskCount() {
    const completedTaskCountValue = completedTaskList.children.length;
    completedTaskCount.textContent = `${completedTaskCountValue} completed task${completedTaskCountValue !== 1 ? 's' : ''}`;
  }

  // Event listener to add a new task
  addTaskBtn.addEventListener('click', function() {
    const taskName = taskInput.value.trim();
    const taskDateValue = taskDate.value;
    if (taskName !== '' && taskDateValue !== '') {
      addTask(taskName, taskDateValue);
      taskInput.value = '';
      taskDate.value = '';
    }
  });

  // Event listener for delete completed tasks
  deleteBtn.addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.tasks input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        const parentLi = checkbox.parentElement.parentElement;
        parentLi.remove();
        updateTaskCount();
        addCompletedTask(parentLi.querySelector('label').textContent, taskDate.value);
        checkbox.checked = false;
      }
    });
  });

  // Event delegation for delete and cancel buttons
  taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      event.target.parentElement.parentElement.remove();
      updateTaskCount();
    }
    if (event.target.classList.contains('cancel-btn')) {
      event.target.parentElement.parentElement.querySelector('.task-checkbox').checked = false;
    }
  });
});
