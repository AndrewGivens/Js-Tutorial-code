const todoList = [];

function renderTodoList()
{
  let todoListHTML ="";

  todoList.forEach((todoObject, index) =>{
    const {name, dueDate} = todoObject
    const html =
    `<div>${name}</div>
    <div>${dueDate}</div>
    <button onclick="
      todoList.splice(${index},1);
      renderTodoList();
      "
      class="delete-todo-button">Delete</button>
     `
     ; //generating the HTML
    todoListHTML += html;
  })
  
    document.querySelector('.js-todo-list')
   .innerHTML = todoListHTML;
  }

function deleteItem()
{

}

function addTodo()  {
  const inputElement = document.querySelector
  ('.js-name-input');
  const name = inputElement.value;

  inputElement.value = '';

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    //name : name,
    //dueDate : dueDate
    name,
    dueDate
  });
  renderTodoList();
}
function handleNameInputKeyDown(event)
{
  if (event.key === 'Enter'){
    addTodo();
   }
}