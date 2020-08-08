// ------------GLOBAL VARIABLES-----------------------------------

let val = '';
let previous = '';
const inputField = document.querySelector('#task');
const filterField = document.querySelector('#task1');
const cardEvent = document.querySelector('.card');
const ul = document.querySelector('.collection');
const itemFormField = document.querySelector('#form1');
const filterFormField = document.querySelector('#form2');
const clearBtn = document.querySelector('.clear-btn');

// ------------------------------------------------------------------

// ------------LOAD EVENT LISTENERS----------------------------------

callEventListeners();
function callEventListeners(){
    document.addEventListener('DOMContentLoaded' ,getTasks);
    cardEvent.addEventListener('focusin',fieldActive);
    cardEvent.addEventListener('focusout',fieldCheck);
    cardEvent.addEventListener('keydown',notEmpty);
    cardEvent.addEventListener('submit',inputValidation);
    itemFormField.addEventListener('submit' ,addNewListItem);
    cardEvent.addEventListener('click' ,deleteItem);
    filterField.addEventListener('keyup' ,filterListItems)
    filterField.addEventListener('focusout' ,filterListItemsBlur);
    clearBtn.addEventListener('click' ,clearAllTasks);
    cardEvent.addEventListener('focusout' ,saveEditedTask);
    cardEvent.addEventListener('focusin' ,savePreviousTask);
}

// ------------LOAD LIST FROM LOCAL STORAGE-----------------------------------

function getTasks(){
    let tasks;
    if( localStorage.getItem('todo\'s') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('todo\'s'));
    }
    tasks.forEach(function(z){
        const li = document.createElement('li');
        const link = document.createElement('a');
        const span = document.createElement('span');
        span.className = 'tempSpan';
        link.classList.add('delete-item');
        li.classList.add('collection-item');
        link.innerHTML = '<i class="fa fa-remove"></i>';
        span.textContent = z;
        li.appendChild(span);
        li.appendChild(link);
        ul.appendChild(li);
    });
}
// ---------------------------------------------------------------

// ------------SAVED EDITED TASK ITEMS TO LOCAL STORAGE-----------------------------------

function savePreviousTask(e){
    if(e.target.parentElement.classList.contains('collection-item')){
       previous = e.target.textContent;
    }
}
function saveEditedTask(e){
    if(e.target.parentElement.classList.contains('collection-item')){
        editToLocalStorage(e.target.firstChild ,previous);
    }
}
function editToLocalStorage(a,b){
    let tasks;
    if( localStorage.getItem('todo\'s') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('todo\'s'));
    }
    tasks.forEach(function(edit,index){
        if((b === edit)){
            tasks.splice(index,1,a.textContent);
        
        }
    });
    localStorage.setItem('todo\'s',JSON.stringify(tasks));
}

// -----------------------------------------------------------------------

// ------------CLEAR ALL TASKS AT ONCE------------------------------------

function clearAllTasks(e){
    ul.innerHTML = '';
    localStorage.clear();
}

// -----------------------------------------------------------------------

// ------------FILTER IMPLEMENTATION AND STYLING---------------------------

function filterListItemsBlur(e){
    document.querySelectorAll('.collection-item').forEach(function(item){
       
            item.style.background = 'white';
            item.style.color = 'black';
        
       
    });
}


function filterListItems(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(item,index){
        const x = item.firstChild.textContent;
        if( (x.toLowerCase().indexOf(text) != -1) && (text != '')){
            item.style.display = 'block';
            item.style.background = 'rgb(38,166,154)';
            item.style.color = 'white';
            item.firstChild.setAttribute('contenteditable','true');
            
        }
        else if( (x.toLowerCase().indexOf(text) === -1) && (text != '')){
            item.style.display = 'none';
            item.style.background = 'white';
            item.style.color = 'black';
            item.firstChild.setAttribute('contenteditable','false');
        }
        else{
            item.style.display = 'block';
            item.style.background = 'white';
            item.style.color = 'black';
            item.firstChild.setAttribute('contenteditable','false');
        }
    });

}

// -------------------------------------------------------------------------------

// ------------DELETE INDIVIDUAL ITEMS--------------------------------------------

function deleteItem(e){
    if( e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
        deleteFromLocalStorage(e.target.parentElement.parentElement);
    }
    
}
function deleteFromLocalStorage(removeItem){
    let tasks;
    if( localStorage.getItem('todo\'s') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('todo\'s'));
    }
    tasks.forEach(function(edit,index){
        if(removeItem.firstChild.textContent === edit){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('todo\'s',JSON.stringify(tasks));
}

// ----------------------------------------------------------------------------------

// ------------ADD NEW ITEMS TO LIST AND LOCAL STORAGE-------------------------------

function addNewListItem(e){
    let i = 0;
   if(ul.firstChild){
    document.querySelectorAll('li').forEach(function(x){
        if(x.children[0].firstChild.textContent === inputField.value){
            alert('No duplicate tasks allowed');
            i = 1;
        }
    });
   }
   if((inputField.value != '') && (inputField.value != ' ') && (i === 0)) {
    console.log('new node'); 
    const li = document.createElement('li');
    const link = document.createElement('a');
    const span = document.createElement('span');
    span.className = 'tempSpan';
    link.classList.add('delete-item');
    li.classList.add('collection-item');
    link.innerHTML = '<i class="fa fa-remove"></i>';
    span.textContent = inputField.value;
    li.appendChild(span);
    li.appendChild(link);
    ul.appendChild(li);
    setToLocalStorage(inputField.value);
    inputField.value = ' ';
}

}
function setToLocalStorage(task){
    let tasks;
    if( localStorage.getItem('todo\'s') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('todo\'s'));
    }
    tasks.push(task);
    localStorage.setItem('todo\'s', JSON.stringify(tasks));
}

// ----------------------------------------------------------------------------------------


// ------------STYLING FOR RESPONSIVE INPUT FIELDS-----------------------------------------

function fieldActive(e){

    if(e.target.classList.contains('register')){
        e.target.nextElementSibling.className = 'active-label'
        e.target.classList.add('active-input');
        e.target.classList.remove('inputError');
        e.target.nextElementSibling.classList.remove('errorLabel');
        e.target.nextElementSibling.textContent = 'New Task';
    } 
    
}
function fieldCheck(e){

    if(e.target.classList.contains('register')){
        val = e.target.value;
        if((val === '') || (val === ' ')){
            e.target.value = '';
            e.target.classList.remove('active-input');
            e.target.nextElementSibling.classList.remove('active-label');
         }
        else 
            console.log('Input present');
    }
    
}
function inputValidation(e){
    if(e.target.classList.contains('formhook')){
        val = e.target.children[0].children[0].value;
        if(val === ''){
            e.target.children[0].children[0].classList.add('inputError');
            e.target.children[0].children[1].classList.add('errorLabel');
            e.target.children[0].children[1].textContent = 'Task can\'t be empty';
    }
    }
    
}
function notEmpty(e){
    if(e.target.classList.contains('register')){
        e.target.classList.remove('inputError');
        e.target.nextElementSibling.classList.remove('errorLabel');
        e.target.nextElementSibling.textContent = 'New Task';
    }
   
}
// -----------------------------------------------------------------------------------------