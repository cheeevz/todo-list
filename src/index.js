import './style.css';
import { createProject } from './create-project.js';
import { createTodo } from './create-todo.js';
import { renderTodo, renderTodos } from './dom.js';
import { renderProject, renderProjects } from './dom.js';

const addTodo = document.querySelector('#add-todo');
const addProject = document.querySelector('#add-project');
const toDoDialog = document.querySelector('#toDoDialog');
const toDoEditDialog = document.querySelector('#toDoEditDialog');
const projectDialog = document.querySelector('#projectDialog');
const toDoForm = toDoDialog.querySelector('form');
const toDoEditForm = toDoEditDialog.querySelector('form');
const projectForm = projectDialog.querySelector('form');
const toDoSubmitBtn = toDoForm.querySelector('button[value="confirm"]');
const toDoEditSubmitBtn = toDoEditForm.querySelector('button[value="confirm"]');
const projectSubmitBtn = projectForm.querySelector('button[value="confirm"]');
const projectEditDialog = document.querySelector('#projectEditDialog');
const projectEditForm = projectEditDialog.querySelector('form');
const addToProjectDialog = document.querySelector('#addToProjectDialog');
const projectEditSubmitBtn = projectEditForm.querySelector('button[value="confirm"]');
const addToProjectForm = addToProjectDialog.querySelector('form');
const addToProjectSubmitBtn = addToProjectForm.querySelector('button[value="confirm"]');
const toDoContentDiv = document.querySelector('#toDoContent');
const projectListDiv = document.querySelector('#projectList');
const selectProject = document.querySelector('#selectProject');
const displayAllTodosBtn = document.querySelector('#display-all-todos');


const todosInStorage = localStorage.getItem('todos')
const todos = todosInStorage ? JSON.parse(todosInStorage) : [];
renderTodos(todos); 
const projectsInStorage = localStorage.getItem('projects'); 
const projects = projectsInStorage ? JSON.parse(projectsInStorage) : []; 
renderProjects(projects);
updateProjectSelect();

let currentEditIndex = null;

// Fonction pour mettre à jour le select des projets
function updateProjectSelect() {
    selectProject.innerHTML = '';
    projects.forEach((project, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = project.title;
        selectProject.appendChild(option);
    });
}
displayAllTodosBtn.addEventListener('click', () => {
    renderTodos(todos);
});
// Délégation d'événements pour les boutons delete et edit
toDoContentDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        todos.splice(index, 1);
        renderTodos(todos);
    }
    if (e.target.classList.contains('edit-btn')) {
        const index = e.target.getAttribute('data-index');
        const todo = todos[index];
        currentEditIndex = index;

        // Pré-remplir le formulaire edit
        toDoEditForm.querySelector('#title').value = todo.title;
        toDoEditForm.querySelector('#description').value = todo.description;
        toDoEditForm.querySelector('#dueDate').value = todo.dueDate;
        toDoEditForm.querySelector('#notes').value = todo.notes || '';
        toDoEditForm.querySelector('#priority').value = todo.priority;

        toDoEditDialog.showModal();
    }
    if (e.target.classList.contains('add-to-project-btn')) {
        const index = e.target.getAttribute('data-index');
        currentEditIndex = index;
        addToProjectDialog.showModal();
    }
});

projectListDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-delete-btn')) {
        e.target.parentNode.remove();
        projects.splice(e.target.getAttribute('data-index'), 1);
        updateProjectSelect();
        renderProjects(projects);
    }
    if (e.target.classList.contains('project-edit-btn')) {
        const index = e.target.getAttribute('data-index');
        const project = projects[index];
        currentEditIndex = index;

        // Pré-remplir le formulaire edit
        projectEditForm.querySelector('#title').value = project.title;
        projectEditForm.querySelector('#description').value = project.description || '';
        projectEditDialog.showModal();
    }
    if (e.target.classList.contains('project-display-todos-btn')) {
        const index = e.target.getAttribute('data-index');
        const project = projects[index];
        if (project && project.todos) {
            toDoContentDiv.innerHTML = '';
            project.todos.forEach((todo, todoIndex) => {
                renderTodo(todo, todoIndex);
            });
        }
    }
});

addTodo.addEventListener('click', () => {
    toDoDialog.showModal();
});

toDoSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = toDoForm.querySelector('#title').value;
    const description = toDoForm.querySelector('#description').value;
    const dueDate = toDoForm.querySelector('#dueDate').value;
    const notes = toDoForm.querySelector('#notes').value;
    const priority = toDoForm.querySelector('#priority').value;

    const newTodo = createTodo({
        title,
        description,
        dueDate,
        notes,
        priority
    });

    todos.push(newTodo);
    renderTodo(newTodo, todos.length - 1);

    localStorage.setItem('todos', JSON.stringify(todos));

    // Réinitialiser le formulaire
    toDoForm.reset();
    toDoDialog.close();
});

toDoEditSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = toDoEditForm.querySelector('#title').value;
    const description = toDoEditForm.querySelector('#description').value;
    const dueDate = toDoEditForm.querySelector('#dueDate').value;
    const notes = toDoEditForm.querySelector('#notes').value;
    const priority = toDoEditForm.querySelector('#priority').value;

    // Mettre à jour le todo
    todos[currentEditIndex] = {
        ...todos[currentEditIndex],
        title,
        description,
        dueDate,
        notes,
        priority
    };

    // Rafraîchir l'affichage
    renderTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));

    toDoEditForm.reset();
    toDoEditDialog.close();
});

addProject.addEventListener('click', () => {
    projectDialog.showModal();
});

// SUBMIT PROJECT

projectSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = projectForm.querySelector('input[name="title"]').value;
    const description = projectForm.querySelector('input[name="description"]').value;

    const newProject = createProject({
        title,
        description
    });

    projects.push(newProject);
    renderProject(newProject, projects.length - 1);
    updateProjectSelect();

    console.log(newProject);

    localStorage.setItem('projects', JSON.stringify(projects));
    // Réinitialiser le formulaire
    projectForm.reset();
    projectDialog.close();
});

// SUBMIT EDIT PROJECT

projectEditSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = projectEditForm.querySelector('input[name="title"]').value;
    const description = projectEditForm.querySelector('input[name="description"]').value;

    // Mettre à jour le project
    projects[currentEditIndex] = {
        ...projects[currentEditIndex],
        title,
        description
    };

    // Rafraîchir l'affichage
    renderProjects(projects);
    updateProjectSelect();
    
    localStorage.setItem('projects', JSON.stringify(projects));

    projectEditForm.reset();
    projectEditDialog.close();
});

addToProjectSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedProjectIndex = selectProject.value;
    if (selectedProjectIndex !== '' && projects[selectedProjectIndex]) {
        const project = projects[selectedProjectIndex];
        const todo = todos[currentEditIndex];
        // Ajouter le todo au projet 
        project.todos.push(todo);
        // Rafraîchir l'affichage des projets 
        renderProjects(projects);
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('projects', JSON.stringify(projects));
        console.log(todo.title);
    } else {
        console.error('Veuillez sélectionner un projet valide');
    }
    addToProjectDialog.close();
});

