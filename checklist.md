Front End
    - [ ] POST - Create a task
        - [ ] Input method of some sort
            - [ ] Urgent? Default to false, if then statement to make true? Or logic in server side?
        - [ ] AJAX call
        - [ ] then:
             - [ ] GET request for refresh page
    - [ ] GET 
        - [ ] AJAX call
        - [ ] Append information
  
    - [ ] PUT request
        - [ ] Complete
            - [ ] Use !complete? Make it a toggle
            - [ ] Checkbox spawns it?
            - [ ] Strikethrough/Background color change?
            
                - [ ] Task Completed!!

    - [ ] DELETE request
        - [ ] Use SweetAlert: are you sure?


    Maybe: 
    - [ ] Different buckets nav bar: Today, Tomorrow, by date?
        - [ ] Default: All tasks
        - [ ] Display number of tasks?
        - [ ] Choose date
        - [ ] Drag to different areas?
        - [ ] 



Server Side
    - [ ] POST Route: send task to database
        - [ ] Query body: 
    - [ ] GET Route: retrieve data from database
        - [ ] Sort by: Urgent, then DESC ID
    - [ ] PUT: Mark as Complete
    - [ ] DELETE: delete by ID




Style Ideas / Stretch
    - [ ] Branch: feature-styling-bootstrap
        - [ ] Green complete create, delete red
        - [ ] Inputs styled
        - [ ] Responsive to different screen sizes
    - [ ] Branch: feature-confirm-delete
        - [ ] OPTION: Use SweetAlert: are you sure?
    - [ ] Branch: feature-ordering-task-query
        - [ ] Query Params: request to reverse order of returned todos
            - [ ] Sort by: Oldest/Newest?
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