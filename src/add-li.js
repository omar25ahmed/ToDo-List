const showTask = (tasks, list) => {
  list.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="task">
    <input type="checkbox">
    <p>${task.description}</p>
    <button type="button" class="fas fa-ellipsis-v scroll"></button>
    </div>
    `;
    list.appendChild(li);
  });
};

export { showTask as default };