console.log('JS Running');

$(handleReady);

function handleReady() {
    console.log('jQuery running');
    // populate existing list on load
    getListData();
    // set up click listeners
    clickListeners();
}

function clickListeners() {
    $('#submitTaskBtn').on('click', handleSubmit)
}




// GET request to pull todo_list table data from DB
function getListData() {
    // AJAX call to server
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(response => {
        // render task list to DOM upon retrieval
        renderList(response);
    }).catch(err => {
        // log an error if problem communicating with server
        console.log('Something went wrong with GET request', err);
    })
}

function renderList(taskArray) {
    // target list to display
    let el = $('#taskListDisplay');
    // empty 
    el.empty();
    // append all tasks to DOM in order received from DB
    taskArray.forEach(taskItem => {
        el.append(`
        <li>
            <button type="button" class="btn btn-success completeBtn" data-id="${taskItem.id}">Complete Task</button>
            ${taskItem.task}
            <input class="form-check-input urgentItemCheckbox" type="checkbox" 
            id="${taskItem.id}" data-id="${taskItem.id}">
            <label class="form-check-label" for="${taskItem.id}">Make urgent?</label>  
        </li>
        `);
    });
}

// Handle submit button logic before sending client data to POST route
function handleSubmit() {
    console.log('clicked');
    // hold data from client inputs
    let newTask = $('#taskInput').val();
    let isUrgent = $('#urgentInputCheckbox').prop('checked');
    // create object to send to POST function
    let taskToAdd = {
        task: newTask,
        urgent: isUrgent
    };
    // run submitNewTask with saved object
    submitNewTask(taskToAdd);
}


// POST request to add a new task to todo_list on DB
function submitNewTask (taskToAdd) {
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then(response => {
        console.log('Recieved success message from server for POST', response);
        // refresh DOM with new data
        getListData();
    }).catch(err => {
        console.log('Something went wrong with POST from client', err);
    });
}