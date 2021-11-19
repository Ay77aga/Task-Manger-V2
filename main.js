let count = document.querySelector('header p span');
let Add = document.querySelector('.add');
let input = document.querySelector('input');
let tasks_area = document.querySelector('.tasks');
let tasks = [];
count.innerHTML = tasks.length;


if (window.localStorage.Tasks) {
  tasks = JSON.parse(localStorage.Tasks);
  render(tasks);
  count.innerHTML = tasks.length;
}
input.addEventListener('input', () => {
  if (input.value.length > 0) {
    Add.style.transform = 'scale(1.5)'
  } else {
    Add.style.transform = 'scale(0)'
  }

});
Add.addEventListener('click', (e) => {
  if (input.value !== '') {
    Add_task(input.value);
    render(tasks);
    if (tasks.length > 0) {
      tasks_area.classList.remove('d');
    }
  }
  Add.style.transform = 'scale(0)'
  tasks_area.scrollTop = tasks_area.scrollHeight;
  count.innerHTML = tasks.length;
  input.value = '';

});




// Functions

function Add_task(txt) {
  const obj = {
    id: Date.now().toString(32),
    value: txt,
    status: false,
    time: time(),
  }
  tasks.push(obj);
  add_storage(tasks);

}

function time() {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let d = new Date().getDate();
  let mon = new Date().getMonth() + 1;
  console.log(`${d} ${mon}`)
  m = m < 10 ? `0${m}` : m;
  return h > 12 ? `${d} / ${mon} / ${h - 12}:${m} PM` : `${h}:${m} AM`;
}

function add_storage(data) {
  window.localStorage.setItem('Tasks', JSON.stringify(data));

}

function render(tasks) {

  tasks_area.innerHTML = '';

  tasks.forEach((t) => {
    let task = document.createElement('div');
    task.className = 'task';
    task.setAttribute('data-id', t.id);
    let p = document.createElement('p');
    p.classList = 'p';
    p.appendChild(document.createTextNode(t.value));
    let span = document.createElement('span');
    span.className = 'time';
    let del = document.createElement('span');
    del.className = 'del';
    let done = document.createElement('span');
    done.className = 'done';
    span.appendChild(document.createTextNode(t.time));
    task.appendChild(p);
    task.appendChild(span);
    task.appendChild(del);
    task.appendChild(done);
    tasks_area.appendChild(task);
    if (t.status == true) {
      task.classList.add('finsh')
    }
    done.onclick = (e) => {
      e.target.parentElement.classList.toggle('finsh');
      status(t.id)
    }
    del.onclick = (e) => {
      e.target.parentElement.remove();
      delet(t.id);
    }
  });
}


function status(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].status == false ? tasks[i].status = true : tasks[i].status = false;
    }
  }
  add_storage(tasks);
  count.innerHTML = tasks.length;

}

function delet(id) {
  tasks = tasks.filter((task) => task.id != id);
  add_storage(tasks);
  count.innerHTML = tasks.length;

}

function clear() {
  window.localStorage.removeItem('Tasks');
  tasks_area.innerHTML = 'All tasks removed';
  count.innerHTML = 0;
  tasks_area.classList.add('d');
  tasks = [];

}
document.querySelector('.clear').onclick = clear;