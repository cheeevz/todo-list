// TODOS

export function renderTodo(todo, index) {
    const toDoContentDiv = document.querySelector('#toDoContent');
    const todoElement = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const addToProjectBtn = document.createElement('button');
    const BtnDiv = document.createElement('div');
    todoElement.appendChild(editBtn);
    todoElement.classList.add('todo-item');

    todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p><strong>Description:</strong> ${todo.description}</p>
        <p><strong>Due Date:</strong> ${todo.dueDate}</p>
        <p><strong>Priority:</strong> <span class="priority-${todo.priority}">${todo.priority}</span></p>
        <p><strong>Notes:</strong> ${todo.notes || 'None'}</p>
    `;

    todoElement.appendChild(BtnDiv);
    BtnDiv.classList.add('todo-btns');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.setAttribute('data-index', index);
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.setAttribute('data-index', index);
    addToProjectBtn.textContent = 'Add to Project';
    addToProjectBtn.classList.add('add-to-project-btn');
    addToProjectBtn.setAttribute('data-index', index);
    BtnDiv.appendChild(editBtn);
    BtnDiv.appendChild(addToProjectBtn);
    BtnDiv.appendChild(deleteBtn);
    toDoContentDiv.appendChild(todoElement);
}

export function renderTodos(todos) {
    const toDoContentDiv = document.querySelector('#toDoContent');
    toDoContentDiv.innerHTML = '';
    todos.forEach((todo, index) => renderTodo(todo, index));
}

// PROJECTS

export function renderProject(project, index) {
    const projectListDiv = document.querySelector('#projectList');
    const projectElement = document.createElement('div');
    const projectEditBtn = document.createElement('button');
    const projectDeleteBtn = document.createElement('button');
    const projectDisplayToDoBtn = document.createElement('button');
    projectElement.appendChild(projectEditBtn);
    projectElement.classList.add('project-item');

    projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <p><strong>Description:</strong> ${project.description || 'None'}</p>
    `;
    projectEditBtn.textContent = 'Edit';
    projectEditBtn.classList.add('project-edit-btn');
    projectEditBtn.setAttribute('data-index', index);
    projectDeleteBtn.textContent = 'Delete';
    projectDeleteBtn.classList.add('project-delete-btn');
    projectDeleteBtn.setAttribute('data-index', index);
    projectDisplayToDoBtn.textContent = 'Display Todos';
    projectDisplayToDoBtn.classList.add('project-display-todos-btn');
    projectDisplayToDoBtn.setAttribute('data-index', index);
    projectElement.appendChild(projectDisplayToDoBtn);
    projectElement.appendChild(projectEditBtn);
    projectElement.appendChild(projectDeleteBtn);
    projectListDiv.appendChild(projectElement);
}

export function renderProjects(projects) {
    const projectListDiv = document.querySelector('#projectList');
    projectListDiv.innerHTML = '';
    projects.forEach((project, index) => renderProject(project, index));
}
