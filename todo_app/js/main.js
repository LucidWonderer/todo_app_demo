
// The following event listener function executes these steps when the page loads: 

// 1. Retrieves a list of tasks from the browser's local storage and converts them from a JSON string to an array.

// 2. Sets the value of an input field on the page with the user's previously stored name.

// 3. Adds an event listener to the input field, so that when the user changes their name, it updates the value stored in local storage(get & set).

window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })

    // The following newTodoForm.addEventListener does two things - it saves the name someone enters and it saves a to-do list.

    // When someone types their name in a box, the code saves their name in the computer's memory using something called "localStorage". This means that if they close the website and come back later, their name will still be there.

    // When someone submits a new to-do item, the code saves it in the computer's memory using localStorage too. It creates an object that has the name of the to-do item, the category it belongs to, whether it's done or not, and the time it was created. Then it adds the new to-do item to a list of all the to-do items.

    // Finally, the code resets the to-do item form so someone can add a new item. It also displays all the to-do items on the page using a function called "DisplayTodos". 

    // 

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        // Reset the form
        e.target.reset();

        DisplayTodos()
    })

    DisplayTodos()
})

//The function is called "DisplayTodos()", and it does several things. First, it finds a part of the webpage with the ID "todo-list". This is where the to-do list will be displayed. It then clears the existing contents of the list.

// Next, the function goes through each to-do item in an array called "todos". For each to-do item, it creates some HTML elements that will be displayed on the webpage. These include a checkbox, a label, a bubble, some text content, and buttons for editing and deleting the item.

// Then, the function adds these HTML elements to the webpage in the correct order. It also checks if the to-do item is already done (checked off), and adds a special "done" class to it if it is.

// Finally, the function adds event listeners to the checkbox, edit button, and delete button. These event listeners respond to user actions such as clicking on the checkbox or pressing the edit or delete buttons. When a user interacts with the to-do item, the event listener updates the "todos" array and the "localStorage", which remembers the to-do items even if the webpage is closed or refreshed. After updating the "todos" array and "localStorage", the function calls itself again (recursive call) to update the display of the to-do list with the changes.

// So, in simpler terms, this code helps to show a list of things someone needs to do on a webpage. When they check off something, edit it, or delete it, the webpage updates to show those changes. And even if they close the webpage and come back later, the list of things to do will still be there! 


function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('change', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos()

        })

        edit.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos()

            })
        })

        deleteButton.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos()
        })

    })
}

set_date();

function set_date() {
    let now = new Date();
    this_year = now.getFullYear();
    footer_text = "&#169 Violeta Thompson Web Application Development Inspired by <a href= https://www.youtube.com/watch?v=6eFwtaZf6zc&t=2318s> Tyler Potts</a> & <a href= https://github.com/theCodingProfessor/In_Browser_Notepad_App>The Coding Professor <a/>" + this_year;
    document.getElementById("footer_here").innerHTML = footer_text;
}