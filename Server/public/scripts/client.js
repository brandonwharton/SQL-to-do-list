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
        console.log(response);
    }).catch(err => {
        // log an error if problem communicating with server
        console.log('Something went wrong with GET request', err);
    })
}

function renderList(tasks) {

}