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
    $('#submitTaskBtn').on('click', handleSubmit);
    // complete button listener CHANGE TARGET IF SWITCH FROM UL!!
    $('#taskListDisplay').on('click', '.completeBtn', toggleComplete)
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
        alert('Something went wrong with GET request', err);
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
            <button type="button" class="btn btn-success completeBtn" data-id="${taskItem.id}" data-complete="${taskItem.complete}">Complete Task</button>
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
        // log an error if problem communicating with server
        alert('Something went wrong with POST from client', err);
    });
}


// PUT request to mark a task as complete
function toggleComplete() {
    // save id and complete status of clicked complete button
    const id = $(this).data("id");
    const completeStatus = $(this).data("complete");
    console.log('Inside toggle complete', id, completeStatus);
    // AJAX call to switch completeStatus to its opposite
    $.ajax({
        type: 'PUT',
        url: `/tasks/${id}`,
        data: {switchComplete: !completeStatus}
    }).then(response => {
        console.log('Received success message from server for complete PUT', response);
        // refresh DOM with updated data
        getListData();
    }).catch(err => {
        // log an error if problem communicating with server
        alert('Something went wrong with complete PUT', err);
    });
}
