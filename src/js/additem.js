document.addEventListener('DOMContentLoaded', () => {
    loadTodos(); // load todo elements when page load

    const addTodoItemButton = document.getElementById('addTodoItem');
    const clearTodoListButton = document.getElementById('clearTodoList'); 
    const todoList = document.getElementById('todoList');

    addTodoItemButton.addEventListener('click', () => {
        const newItem = createTodoItem('', false); // make sure checkbox empty
        todoList.appendChild(newItem);
        saveTodos(); // local stor
    });

    document.getElementById('removeTodoItem').addEventListener('click', () => {
        if (todoList.children.length > 1) { // one item so user can't get rid of all
            todoList.removeChild(todoList.lastElementChild);
            saveTodos(); // local stor
        }
    });

  
    const clearTodosContentButton = document.getElementById('clearTodosContent');
    clearTodosContentButton.addEventListener('click', () => {
        document.querySelectorAll('.todo').forEach(todo => {
            const inputValue = todo.querySelector('.todo__value');
            const checkboxValue = todo.querySelector('.todo__checkbox');
            inputValue.value = ''; 
            checkboxValue.checked = false; // Uncheck the box
        });
        saveTodos(); 
    });

    todoList.addEventListener('input', event => {
        if (event.target.matches('.todo__value') || event.target.matches('.todo__checkbox')) {
            saveTodos(); 
        }
    });
});

function createTodoItem(value, checked) {
    const div = document.createElement('div');
    div.className = 'todo';
    div.innerHTML = `
        <input type="text" class="todo__value" value="${value}" placeholder="New Task">
        <input type="checkbox" class="todo__checkbox" ${checked ? 'checked' : ''}>
    `;
    return div;
}

function saveTodos() {
    const todos = Array.from(document.querySelectorAll('.todo')).map(todo => ({
        value: todo.querySelector('.todo__value').value,
        checked: todo.querySelector('.todo__checkbox').checked
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    // Clear existing todos to prevent duplication
    document.getElementById('todoList').innerHTML = '';
    todos.forEach(todo => {
        const newItem = createTodoItem(todo.value, todo.checked);
        document.getElementById('todoList').appendChild(newItem);
    });
}






