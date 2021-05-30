Front End
    - [x] POST - Create a task
        - [x] Input method of some sort
        - [x] Urgent? 
            - [x] .prop() jquery method
        - [x] AJAX call
        - [x] then:
             - [x] GET request for refresh page
    - [x] GET 
        - [x] AJAX call
        - [x] Append information
            - [x] task
            - [x] mark as urgent
            - [x] complete button
    - [x] PUT request
        - [x] Complete
            - [x] Use !complete? Make it a toggle
            - [x] Strikethrough/Background color change?
                  - [x] Task Completed!!
            - [x] DOM refresh
            - [x] SweetAlert: are you sure?
        - [x] Urgent? 
            - [x] If then statement to make true? Or logic in server side?
            - [x] DOM refresh     
    - [x] DELETE request
        - [x] Use SweetAlert: are you sure?
        - [x] Bootstrap trash icon
    Maybe: 
    - [ ] Different buckets nav bar: Today, Tomorrow, by date?
        - [ ] Default: All tasks
        - [ ] Display number of tasks?
        - [ ] Choose date
    - [x] Separate area above for urgent task


Server Side
    - [x] POST Route: send task to database
        - [x] Query body: 
    - [x] GET Route: retrieve data from database
        - [x] Sort by: Urgent, then DESC ID
        - [x] Figure out: completed on the bottom? 
    - [x] PUT: Mark as Complete
    - [x] DELETE: delete by ID
    - [x] OPTION: Router for routes




Style Ideas / Stretch
    - [ ] Branch: feature-styling-bootstrap
        - [x] Green complete create, delete red
        - [x] Inputs styled
        - [ ] Responsive to different screen sizes
    - [x] Branch: feature-confirm-delete
        - [x] OPTION: Use SweetAlert: are you sure?
    - [x] Branch: feature-ordering-task-query
        - [x] Query Params: request to reverse order of returned todos
            - [x] Sort by: Oldest/Newest?
    - [ ] Branch: feature-time-completed
        - [ ] Record when a task was completed
            - [ ] Make it pretty


Database
    - [x] Name: weekend-to-do-app
    - [x] database.sql in repo
        - [x] CREATE TABLE
            - [ ] update if more columns get added
        - [ ] Dummy data?


Mark as urgent default false
Complete Default false

Data Model

table name: todo_list

{
    id: id,
    task: VARCHAR(MAX)/String NOT NULL,
    urgent: Boolean default false,
    complete: Boolean default false,
    
    Options/Add later:
    dateCreated: Date/incl time?,
    dateFinished: Date/incl time?,
    
}