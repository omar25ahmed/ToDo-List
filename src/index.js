import './style.css';
import Task from './modules/Task.js';
import { clearAllCompletedTasks, markAsCompleted } from './modules/completed.js';

const form = document.querySelector('.todo-add');
const input = document.querySelector('.form-field');
const ul = document.getElementById('todo-list');
let li;
const clearBtn = document.querySelector('.todo-clear');

let tasks;

if (localStorage.getItem('tasks') === null) {
  tasks = [];
} else {
  tasks = [];
  Array.from(JSON.parse(localStorage.getItem('tasks'))).forEach((task) => {
    tasks.push(new Task(task.description, task.index, task.completed));
  });
}

function prepareEdit(task, btn) {
  btn.addEventListener('click', () => {
    const el = document.querySelector(`[data-index="${task.index}"]`);
    const p = el.children[1];
    const input = document.createElement('input');
    input.type = 'text';
    input.value = p.textContent;
    input.id = task.index;
    el.insertBefore(input, p);
    el.removeChild(p);
    input.focus();
    input.select();
    input.classList.add('edit');
  });
}

function createTaskHtml(task) {
  li = document.createElement('li');
  li.classList.add('task-li');
  li.innerHTML = `
        <div class="task" data-index="${task.index}">
          <input ${task.completed ? 'checked' : ''} type="checkbox" id='${task.index}'>
          <p class="task-list ${task.completed ? 'done' : ''}">${task.description}</p>
          <div class="btns">
            <button type="button" class="close-button scroll">+</button>
            <button type="button" class="fas fa-ellipsis-v scroll" id="edit-${task.index}"></button>
          </div>
        </div>
    `;
  ul.appendChild(li);
  const btn = document.getElementById(`edit-${task.index}`);
  prepareEdit(task, btn);
}

function loadTasks() {
  tasks.forEach((task) => {
    createTaskHtml(task);
  });
}

loadTasks();

function addTask() {
  ul.innerHTML = '';
  tasks.forEach((task) => {
    createTaskHtml(task);
  });
}

function removeTask(e) {
  if (e.target.classList.contains('close-button')) {
    const deletedIndex = e.target.parentElement.parentElement.dataset.index;
    const toBeUpdatedTasks = tasks.slice(deletedIndex, tasks.length);
    toBeUpdatedTasks.forEach((task) => {
      const el = document.querySelector(`[data-index="${task.index}"]`);
      el.dataset.index = task.index - 1;
      task.index -= 1;
    });
    e.target.parentElement.parentElement.remove();
    tasks.splice(deletedIndex - 1, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = new Task(input.value, tasks.length + 1);
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  addTask();
  input.value = '';
});

ul.addEventListener('click', removeTask);

ul.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const task = tasks.find((t) => t.index === parseInt(e.target.id, 10));
    task.description = e.target.value;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const p = document.createElement('p');
    p.textContent = e.target.value;
    const parent = document.querySelector(`[data-index="${e.target.id}"]`);
    parent.insertBefore(p, e.target);
    parent.removeChild(e.target);
  }
});

function wrapMarkAsCompleted(e) {
  markAsCompleted(e, tasks);
}

ul.addEventListener('click', wrapMarkAsCompleted);

function wrapclearAllCompletedTasks() {
  clearAllCompletedTasks(tasks);
}

clearBtn.addEventListener('click', wrapclearAllCompletedTasks);
