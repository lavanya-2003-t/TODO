document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const deleteBtn = document.getElementById('delete-btn');
  const taskCount = document.getElementById('task-count');
  let taskId = 0;

  // Function to add a new task
  function addTask(taskName) {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="checkbox-container">
        <input type="checkbox" id="task-${taskId}">
        <label for="task-${taskId}">${taskName}</label>
      </div>
    `;
    taskList.appendChild(li);
    taskId++;
    updateTaskCount();
  }

  // Event listener to add a new task
  addTaskBtn.addEventListener('click', function() {
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
      addTask(taskName);
      taskInput.value = '';
    }
  });

  // Function to update task count
  function updateTaskCount() {
    const taskCountValue = taskList.children.length;
    taskCount.textContent = `${taskCountValue} task${taskCountValue !== 1 ? 's' : ''}`;
  }

  // Event listener for delete completed tasks
  deleteBtn.addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.tasks input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        checkbox.parentElement.parentElement.remove();
      }
    });
    updateTaskCount();
  });
});
