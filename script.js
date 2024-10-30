class ToDoList {
    constructor(todoListId, formId, taskInputId, dateInputId, typeInputId, filterId) {
      this.todoList = document.getElementById(todoListId);
      this.form = document.getElementById(formId);
      this.taskInput = document.getElementById(taskInputId);
      this.dateInput = document.getElementById(dateInputId);
      this.typeInput = document.getElementById(typeInputId);
      this.filter = document.getElementById(filterId);
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
      this.form.addEventListener('submit', (e) => this.addTask(e));
      this.filter.addEventListener('change', () => this.filterTasks());
  
      this.loadTasks();
    }
  
    addTask(e) {
      e.preventDefault();
      const taskText = this.taskInput.value;
      const taskDate = this.dateInput.value;
      const taskType = this.typeInput.value;
  
      if (!taskText || !taskDate || !taskType) return;
  
      const task = {
        id: Date.now(),
        text: taskText,
        date: taskDate,
        type: taskType,
        completed: false,
      };
  
      this.tasks.push(task);
      this.saveTasks();
      this.renderTasks();
  
      this.taskInput.value = '';
      this.dateInput.value = '';
      this.typeInput.value = '';
    }
  
    renderTask(task) {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      if (task.completed) li.classList.add('completed');
  
      li.innerHTML = `
        <span>${task.text} - ${task.date} - ${task.type}</span>
        <div>
          <button class="completed-btn">${task.completed ? 'Completed' : 'Mark as Complete'}</button>
          <button class="remove-btn">Remove</button>
        </div>
      `;
  
      // Event listener untuk "Mark as Complete" dan "Remove"
      li.querySelector('.completed-btn').addEventListener('click', () => this.toggleComplete(task.id));
      li.querySelector('.remove-btn').addEventListener('click', () => this.removeTask(task.id));
  
      this.todoList.appendChild(li);
    }
  
    toggleComplete(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks();
        this.renderTasks();
      }
    }
  
    removeTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasks();
      this.renderTasks();
    }
  
    filterTasks() {
      const type = this.filter.value;
      this.renderTasks(type);
    }
  
    renderTasks(filterType = '') {
      this.todoList.innerHTML = '';
      this.tasks
        .filter((task) => (filterType && filterType !== 'all' ? task.type === filterType : true))
        .forEach((task) => this.renderTask(task));
    }
  
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    loadTasks() {
      this.renderTasks();
    }
  }
  
  // Inisialisasi objek ToDoList
  const todoList = new ToDoList('todo-list', 'todo-form', 'new-task', 'task-date', 'task-type', 'filter-type');
  
  export default ToDoList;
  