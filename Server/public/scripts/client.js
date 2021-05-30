
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

// variable for holding user's list ordering preference while they're on the app
// TO DO: Save this information on the server instead
// Pre-populate Sort By select dropdown with last choice
let currentOrderPreference = 'ASC';


// GET request to pull todo_list table data from DB
// Can take in a parameter to adjust the default display ordering of tasks
function getListData(orderRequest) {
    // set a default list display ordering if none is provided
    if (!orderRequest) {
        orderRequest = currentOrderPreference;
    }
    // AJAX call to server
    $.ajax({
        method: 'GET',
        // send an order query based on user input for oldest or newest displayed first
        url: `/tasks?order=${orderRequest}`
    }).then(response => {
        // render task list to DOM upon retrieval
        renderList(response);
    }).catch(err => {
        // log an error if problem communicating with server
        alert('Something went wrong with GET request', err);
    })
}


// Render DOM
function renderList(taskArray) {
    // empty current lists
    $('#urgentListDisplay').empty();
    $('#otherListDisplay').empty();
    // append all tasks to DOM in order received from DB
    taskArray.forEach(taskItem => {
        // save the provided row's id for ease of use and readability
        let id = taskItem.id;
        // variables for dynamic classes
        let urgency;
        let completed;
        // choose classes and html specifics in append below based on urgent value provided
        if (taskItem.urgent) {
            urgency = 'urgent';
        } else {
            urgency = 'other';
        }

        // append lists to DOM
        $(`#${urgency}ListDisplay`).append(`
        <div class="border rounded row ${urgency} row${id}">
            <div class="col">
                <button type="button" class="btn btn-success completeBtn completeBtn${id}" data-id="${id}" data-complete="${taskItem.complete}">
                    <img src="vendors/bootstrap-svg/check2-circle.svg" alt="Complete"></button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success urgentBtn urgentBtn${id}" data-id="${id}" data-urgent="${taskItem.urgent}">
                    <img src="./vendors/bootstrap-svg/exclamation-lg.svg" alt="Urgent"></button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success deleteBtn" data-id="${id}"><img src="vendors/bootstrap-svg/trash.svg" alt="Delete"></button>
            </div>
            <div class="col-8 ${urgency}Task">
                ${taskItem.task}
            </div>
        </div>
        `);

        // add/remove properties to tasks that have been marked as completed
        if (taskItem.complete) {
            // Add the complete class for styling of completed task divs
            $(`.row${taskItem.id}`).addClass('complete');
            // remove the complete and urgent buttons from completed tasks
            $(`.completeBtn${taskItem.id}`).remove();
            $(`.urgentBtn${taskItem.id}`).remove();
        }
    });
}


// Handle request for an list display ordering change
function orderChangeRequest() {
    // save the value from the selected label
    let newOrderRequest = $(this).val();
    // save preference locally while still on app
    currentOrderPreference = newOrderRequest;
    // Re-render DOM using ordering preference
    getListData(newOrderRequest);
}


// Handle submit button logic before sending client data to POST route
function handleSubmit() {
    console.log('clicked submit');
    // If input field for new task is blank, create a popup message and break out of submit function
    if ($('#taskInput').val().length === 0) {
        swal('Please enter a task first!');
        return;
    }

    // run SweetAlert popup function for POST validation
    urgencyPopup();
}


// SweetAlert popup to take additional urgency data input from user and send data to POST route
function urgencyPopup() {
    // SweetAlert popup on a click, checks for urgency of task being added
    swal({
        title: 'Mark this task as urgent?',
        text: 'Urgent tasks will appear as a higher priority than non-urgent tasks. This can be changed later.',
        icon: 'info',
        dangerMode: true,
        buttons: {
            // on choosing "Task isn't urgent', pass value as false
            cancel: {
                text: `Task isn't urgent`,
                value: false,
                visible: true
            },
            // on choosing "Make task urgent", pass value as true
            confirm: {
                text: `Make task urgent`,
                value: true,
            }
        }
    }).then( function (value) {
        // target the new task input element
        let el = $('#taskInput');
        // set the text body of the task to be added
        let newTask = el.val();
        // create the task object with the text body and the value based on popup button clicked
        let taskToAdd = {
            task: newTask,
            urgent: value
        };
        // run submitNewTask with saved object to send through POST route
        submitNewTask(taskToAdd);
        // clear new task input
        el.val('');
    });
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