// define UI Varibale
// form ko class name ra id ko anusar varible define gareko 
// pache lae yaut simple varible bata call garnu milni gare 
// eg from le #task-form vaneko form ko id leko ra form define gareko
// taskInput.value garnu vaneko #task.value gareko eg
// document.querySelector('#task').value garnu ko sato 

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter =document.querySelector('#filter');
const taskInput =document.querySelector('#task');

// load all event listener function

loadEventListners();

// function

function loadEventListners(){
	// DOM load event 
		document.addEventListener('DOMContentLoaded',getTasks);
	
	// add task event
	// yo vaneko fucntion call gareko ie we have writen the fucntion;
	form.addEventListener('submit', addTask);
	// remove task event
	taskList.addEventListener('click', removeTask);
	// clear task event
	clearBtn.addEventListener('click', clearTask);

	// filter task event
	filter.addEventListener('keyup', filterTask);

	// to show the data from loacl strage
	

}
// geting data from local storage
function getTasks(){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task){
			// create li element
		const li = document.createElement('li');

		// add class
		li.className = 'collection-item';
		// append li to ul
		li.appendChild(document.createTextNode(task));
		// create new Link element
		const link = document.createElement('a');
		// add class
		link.className = 'delete-item secondary-content';
		// add icon
		link.innerHTML = '<i class="fa fa-remove"></li>'
		// append the link to li 
		li.appendChild(link);
		// append li to ul
		taskList.appendChild(li);
	});
}


// add task 
function addTask(e){
	if(taskInput.value === '') {
		alert('Add Task');
	}

	// create li element
	const li = document.createElement('li');

	// add class
	li.className = 'collection-item';
	// append li to ul
	li.appendChild(document.createTextNode(taskInput.value));
	// create new Link element
	const link = document.createElement('a');
	// add class
	link.className = 'delete-item secondary-content';
	// add icon
	link.innerHTML = '<i class="fa fa-remove"></li>'
	// append the link to li 
	li.appendChild(link);
	// append li to ul
	taskList.appendChild(li);


	// stroing to local storage  fucntion call
	storeTaskInLocalStorage(taskInput.value);

	// clearing the input
	taskInput.value = '';
	


	
	
	e.preventDefault();
}
function storeTaskInLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}	





// remove task function
function removeTask(e){

	// target the delete item to be deleted
	if(e.target.parentElement.classList.contains('delete-item')){
		
		if(confirm("Are You Sure Want To Delete The Selected Task ?")){

			e.target.parentElement.parentElement.remove();
			// remove task from lS function call 
			removeTaskFromLocalStrorage(e.target.parentElement.parentElement);
		}
	}
	e.preventDefault();
}
// remove from LS function 
function removeTaskFromLocalStrorage(taskItem){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
 
	tasks.forEach(function(task, index){
		if(taskItem.textContent === task){
			tasks.splice(index, 1);
		
			// localStorage.remove(tasks.splice(index, 1));
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));

}

// clear Task function
function clearTask(){
	if(confirm("Are You Want To Clear All Task ?")){
		// there are two way
	// 1.tasklist.innerHTML = "";
	// 2.faster
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}

	// clearing the task from LS
	// clearTaskFromLocalStorage();
	localStorage.clear();
	}
	
}

// filter fucntion
function filterTask(e){
	const text = e.target.value.toLowerCase();

	// to select all the list item
	document.querySelectorAll('.collection-item').forEach(
			function(task){
				const item = task.firstChild.textContent;
				if(item.toLowerCase().indexOf(text) != -1){
					task.style.display = 'block';

				}
				else {
					task.style.display ='none';
				}
			}
		);

}

// 