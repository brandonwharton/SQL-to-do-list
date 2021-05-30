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
    $('#listDisplay').on('click', '.completeBtn', toggleComplete)
    // delete button listener CHANGE TARGET WHEN SWITCH FROM UL!!
    $('#listDisplay').on('click', '.deleteBtn', deleteTask)
    // urgent checkbox listener for inside task body
    $('#listDisplay').on('click', '.urgentItemCheckbox', toggleUrgent);
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
    // empty current lists
    $('#urgentListDisplay').empty();
    $('#otherListDisplay').empty();
    // append all tasks to DOM in order received from DB
    taskArray.forEach(taskItem => {
        let urgency;
        let labelText;
        if (taskItem.urgent) {
            urgency = 'urgent';
            labelText = `<label class="form-check-label" id="label${taskItem.id}" for="${taskItem.id}">Remove urgency</label>`
        } else {
            urgency = 'other';
            labelText = `<label class="form-check-label" id="label${taskItem.id}" for="${taskItem.id}">Make urgent</label>`
        }
        $(`#${urgency}ListDisplay`).append(`
        <div class="border rounded">
            <button type="button" class="btn btn-success completeBtn" data-id="${taskItem.id}" data-complete="${taskItem.complete}">
                <img src="vendors/bootstrap-svg/check2-circle.svg" alt="Complete"></button>
            ${taskItem.task}
            <input class="form-check-input urgentItemCheckbox" type="checkbox" 
                id="checkbox${taskItem.id}" data-id="${taskItem.id}" data-urgent="${taskItem.urgent}">
            ${labelText}
            <button type="button" class="btn btn-danger deleteBtn" data-id="${taskItem.id}"><img src="vendors/bootstrap-svg/trash.svg" alt="Delete"></button>
        </div>
        `);

        // check for urgency, change text of urgent input if already urgent
        // if (taskItem.urgent) {
        //     // target label for specific item to change
        //     $(`#label${taskItem.id}`).text('Remove urgency');
        // }
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
    // reset input values
    $('#taskInput').val('');
    $('#urgentInputCheckbox').prop('checked', false);
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
        url: `/tasks/complete/${id}`,
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


// PUT request to toggle the urgent property
function toggleUrgent() {
    // save id and complete status of clicked complete button
    const id = $(this).data("id");
    const urgentStatus = $(this).data("urgent");
    console.log('Inside toggle urgent', id, urgentStatus);
    // AJAX call to switch completeStatus to its opposite
    $.ajax({
        type: 'PUT',
        url: `/tasks/urgent/${id}`,
        data: {switchUrgent: !urgentStatus}
    }).then(response => {
        console.log('Received success message from server for urgent PUT', response);
        // refresh DOM with updated data
        getListData();
    }).catch(err => {
        // log an error if problem communicating with server
        alert('Something went wrong with urgent PUT', err);
    });
}


// DELETE request to remove a task from DB
function deleteTask() {
    // save id and complete status of clicked complete button
    const id = $(this).data("id");
    console.log('Inside deleteTask', id);
    // AJAX call to request a delete of the table row in DB
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${id}`
    }).then(response => {
        console.log('Received success message from server for DELETE', response);
        // refresh DOM with updated data
        getListData();
    }).catch(err => {
        // log an error if problem communicating with server
        alert('Something went wrong with DELETE', err);
    });   
}