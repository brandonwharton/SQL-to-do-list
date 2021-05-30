

console.log('JS Running');

$(handleReady);

function handleReady() {
    console.log('jQuery running');
    // populate existing list on load
    getListData();
    // set up click listeners
    eventListeners();
}

function eventListeners() {
    // submit button
    $('#submitTaskBtn').on('click', handleSubmit);
    // ordering change request
    $('#orderRequest').on('change', orderChangeRequest)
    // buttons inside task divs
    $('#listDisplay').on('click', '.completeBtn', handleComplete)
    $('#listDisplay').on('click', '.urgentBtn', toggleUrgent);
    $('#listDisplay').on('click', '.deleteBtn', handleDelete)

}


// GET request to pull todo_list table data from DB
function getListData(orderRequest) {
    // set a default order request if none is provided
    if (!orderRequest) {
        orderRequest = 'ASC';
        console.log('No request originally, default', orderRequest); 
    }
    // AJAX call to server
    $.ajax({
        method: 'GET',
        url: `/tasks?order=${orderRequest}`
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
        // variables for changing classes and label text
        let urgency;
        let labelText;
        let completed;
        // change classes and html in append below based on urgent value
        if (taskItem.urgent) {
            urgency = 'urgent';
            labelText = `<label class="form-check-label" id="label${taskItem.id}" for="${taskItem.id}">Not Urgent</label>`
        } else {
            urgency = 'other';
            labelText = `<label class="form-check-label" id="label${taskItem.id}" for="${taskItem.id}">Make Urgent</label>`
        }

        // append lists to DOM
        $(`#${urgency}ListDisplay`).append(`
        <div class="border rounded row ${urgency} row${taskItem.id}">
            <div class="col">
                <button type="button" class="btn btn-success completeBtn completeBtn${taskItem.id}" data-id="${taskItem.id}" data-complete="${taskItem.complete}">
                    <img src="vendors/bootstrap-svg/check2-circle.svg" alt="Complete"></button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success urgentBtn urgentBtn${taskItem.id}" data-id="${taskItem.id}" data-urgent="${taskItem.urgent}">
                    <img src="./vendors/bootstrap-svg/exclamation-lg.svg" alt="Urgent"></button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success deleteBtn" data-id="${taskItem.id}"><img src="vendors/bootstrap-svg/trash.svg" alt="Delete"></button>
            </div>
            <div class="col-8 ${urgency}Task">
                ${taskItem.task}
            </div>
        </div>
        `);

        // add/remove properties to completed tasks
        if (taskItem.complete) {
            // Add the complete class for styling of completed task divs
            $(`.row${taskItem.id}`).addClass('complete');
            // remove the complete and urgent buttons from completed tasks
            $(`.completeBtn${taskItem.id}`).remove();
            $(`.urgentBtn${taskItem.id}`).remove();
        }

    });
}

// Handle request for an order change
function orderChangeRequest() {
    let orderRequest = $(this).val();
    getListData(orderRequest);
}


// Handle submit button logic before sending client data to POST route
function handleSubmit() {
    console.log('clicked');
    urgencyPopup();
}

function urgencyPopup() {
    // SweetAlert popup on a click
    swal({
        title: 'Mark this task as urgent?',
        text: 'Urgent tasks will appear as a higher priority than non-urgent tasks. This can be changed later.',
        icon: 'info',
        dangerMode: true,
        buttons: {
            cancel: {
                text: `Task isn't urgent`,
                value: false,
                visible: true
            },
            confirm: {
                text: `Make task urgent`,
                value: true,
            }
        }
    }).then( function (value) {
        // set the text body of the task to be added
        let newTask = $('#taskInput').val();
        // create the task object with the text body and the value based on button clicked
        let taskToAdd = {
            task: newTask,
            urgent: value
        };
        // run submitNewTask with saved object
        submitNewTask(taskToAdd);
        // clear input
        $('#taskInput').val('');
    })
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
function handleComplete() {
    // save id and complete status of clicked complete button
    const id = $(this).data("id");
    const completeStatus = $(this).data("complete");
    console.log('Inside toggle complete', id, completeStatus);
    // run SweetAlert function with saved values as a popup to handle AJAX call
    completeTaskPopup(id, completeStatus);
}

function completeTaskPopup(id, completeStatus) {
    swal({
        title: 'Check this task off your checklist?',
        icon: 'info',
        buttons: true
    }).then(function (checkedOff) {
        if(checkedOff) {
            swal('You accomplished something on your to-do list! Way to go!', {
                icon: 'success'
            })
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
function handleDelete() {
    // save id and complete status of clicked complete button
    const id = $(this).data("id");
    console.log('Inside deleteTask', id);
    // call deletePopup with the saved id
    deleteTaskPopup(id);
}

// p
function deleteTaskPopup(id) {
    swal({
        title: 'Are you sure you want to delete this task?',
        text: 'This cannot be undone',
        icon: 'warning',
        dangerMode: true,
        buttons: [true, 'Delete']
    }).then(function (choseDelete) {
        if(choseDelete) {
            swal('Task has been removed from your to-do list.', {
                icon: 'success'
            })
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
    });
}