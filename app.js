const TASK_INPUT = document.getElementById('new-task');
const ADD_TASK_BTN = document.getElementById('new-task-button');
let todoTasks = ['Pay Bills', 'Go Shopping'];
let doneTasks = ['See the Doctor'];

window.onload = () => {
  drawTasks();
  ADD_TASK_BTN.addEventListener('click', addTask);
  document.querySelectorAll('input[type="text"]')[2].classList.add('edit-mode');
  document
    .querySelectorAll('input[type="text"]')[2]
    .setAttribute('value', document.querySelectorAll('label')[2].innerHTML);
  document.querySelectorAll('label')[2].style.display = 'none';
};

function addTask() {
  if (!TASK_INPUT.value) return;
  todoTasks.push(TASK_INPUT.value);
  drawTasks();
  TASK_INPUT.value = '';
}

function editTask() {
  const LIST_ITEM = this.parentNode;
  const EDIT_INPUT = LIST_ITEM.querySelector('input[type="text"]');
  EDIT_INPUT.classList.toggle('edit-mode');
  let value = EDIT_INPUT.value;
  let label = LIST_ITEM.querySelector('label');
  EDIT_INPUT.value = label.innerHTML;
  const buttons = LIST_ITEM.querySelectorAll('button');
  if (EDIT_INPUT.classList.contains('edit-mode')) {
    buttons[0].innerText = 'Save';
    label.style.display = 'none';
  } else {
    editTaskInArray(label.innerHTML, value);
    drawTasks();
  }
}

function handleCheckbox() {
  const LIST_ITEM = this.parentNode;
  const ARR_ELEMENT = LIST_ITEM.querySelector('label');
  const CHECKBOX = LIST_ITEM.querySelector('input[type="checkbox"]');
  updateCheckedTaskInArray(ARR_ELEMENT.innerHTML, CHECKBOX.checked);
  drawTasks();
}

function deleteTask() {
  const LIST_ITEM = this.parentNode;
  const ARR_ELEMENT = LIST_ITEM.querySelector('label');
  deleteTaskFromArray(ARR_ELEMENT.innerHTML);
}

function editTaskInArray(task, newTask) {
  todoTasks.forEach((el, i) => {
    if (el == task) {
      todoTasks.splice(i, 1, newTask);
    }
  });
  doneTasks.forEach((el, i) => {
    if (el == task) {
      doneTasks.splice(i, 1, newTask);
    }
  });
}
function deleteTaskFromArray(task) {
  todoTasks.forEach((el, i) => {
    if (el == task) {
      todoTasks.splice(i, 1);
    }
  });
  doneTasks.forEach((el, i) => {
    if (el == task) {
      doneTasks.splice(i, 1);
    }
  });
  drawTasks();
}
function updateCheckedTaskInArray(task, checked) {
  todoTasks.forEach((el, i) => {
    if (el == task && checked == true) {
      todoTasks.splice(i, 1);
      doneTasks.push(el);
    }
  });
  doneTasks.forEach((el, i) => {
    if (el == task && checked == false) {
      doneTasks.splice(i, 1);
      todoTasks.push(el);
    }
  });
  drawTasks();
}

function drawTasks() {
  document.getElementById('incompleted-tasks').innerHTML = '';
  document.getElementById('completed-tasks').innerHTML = '';
  todoTasks.forEach((task) => {
    const LIST_ITEM = document.createElement('li');
    LIST_ITEM.classList.add('todo__list-item');
    LIST_ITEM.innerHTML = `<input class="todo__input todo__input_checkbox" type="checkbox" >
        <label class="todo__label">${task}</label>
        <input class="todo__input todo__input_text"  type="text" >
        <button class="todo__button todo__button_edit">Edit</button>
        <button class="todo__button todo__button_delete">
          <img src="./assets/remove-icon.svg" class="todo__img_delete" alt="Cross delete button"></button>`;

    LIST_ITEM.querySelector('.todo__button_edit').onclick = editTask;
    LIST_ITEM.querySelector('.todo__button_delete').onclick = deleteTask;
    LIST_ITEM.querySelector('.todo__input_checkbox').onchange = handleCheckbox;
    document.getElementById('incompleted-tasks').append(LIST_ITEM);
  });
  doneTasks.forEach((task) => {
    const LIST_ITEM = document.createElement('li');
    LIST_ITEM.classList.add('done__list-item');
    LIST_ITEM.innerHTML = `<input class="todo__input todo__input_checkbox" type="checkbox" checked>
        <label class="done__label">${task}</label>
        <input class="done__input done__input_text"  type="text" >
        <button class="done__button done__button_edit">Edit</button>
        <button class="done__button done__button_delete">
          <img src="./assets/remove-icon.svg" class="done__img_delete" alt="Cross delete button"></button>`;

    LIST_ITEM.querySelector('.done__button_edit').onclick = editTask;
    LIST_ITEM.querySelector('.done__button_delete').onclick = deleteTask;
    LIST_ITEM.querySelector('.todo__input_checkbox').onchange = handleCheckbox;
    document.getElementById('completed-tasks').append(LIST_ITEM);
  });
}
