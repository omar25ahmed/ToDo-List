export function markAsCompleted(e, tasks) {
  const completedIndex = e.target.parentElement.dataset.index - 1;
  if (e.target.checked) {
    e.target.nextElementSibling.classList.add('done');
    tasks[completedIndex].completed = true;
  } else {
    e.target.nextElementSibling.classList.remove('done');
    tasks[completedIndex].completed = false;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function clearAllCompletedTasks(tasks) {
  document.querySelectorAll('.done').forEach((task) => {
    const deletedIndex = task.parentElement.dataset.index;
    const toBeUpdatedTasks = tasks.slice(deletedIndex, tasks.length);
    toBeUpdatedTasks.forEach((task) => {
      const el = document.querySelector(`[data-index="${task.index}"]`);
      el.dataset.index = task.index - 1;
      task.index -= 1;
    });
    tasks.splice(deletedIndex - 1, 1);
    task.parentElement.parentElement.remove();
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}