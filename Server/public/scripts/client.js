console.log('JS Running');

$(handleReady);

function handleReady() {
    console.log('jQuery running');
    // populate existing list on load
    getListData();
}

// GET request
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
            <button type="button" class="btn btn-success completeBtn" data-id="${tastItem.id}>Complete Task</button>
            ${taskItem.task}
            <input class="form-check-input urgentItemCheckbox" type="checkbox" 
            id="${taskItem.id}" data-id="${taskItem.id}">
            <label class="form-check-label" for="${taskItem.id}">Make urgent?</label>  
        </li>
        `);
    });
}