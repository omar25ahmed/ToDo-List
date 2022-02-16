import './style.css';
import showTask from './add-li.js';

const tasks = [
  {
    description: 'task 1',
    completed: false,
    index: 0,
  },
  {
    description: 'task 2',
    completed: false,
    index: 2,
  },
  {
    description: 'task 3',
    completed: false,
    index: 2,
  },
];

const ul = document.getElementById('todo-list');

showTask(tasks, ul);
