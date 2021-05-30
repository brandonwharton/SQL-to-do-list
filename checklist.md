Front End
    - [ ] POST - Create a task
        - [x] Input method of some sort
        - [x] Urgent? 
            - [x] .prop() jquery method
            - [ ] hide "mark urgent" if form has no text, jquery change()?  
        - [x] AJAX call
        - [x] then:
             - [x] GET request for refresh page
    - [x] GET 
        - [x] AJAX call
        - [x] Append information
            - [x] task
            - [x] mark as urgent
            - [x] complete button
  
    - [] PUT request
        - [ ] Complete
            - [x] Use !complete? Make it a toggle
            - [ ] Strikethrough/Background color change?
                  - [ ] Task Completed!!
            - [x] DOM refresh
            - [ ] SweetAlert: are you sure?
        - [ ] Urgent? 
            - [x] If then statement to make true? Or logic in server side?
            - [ ] hide "mark urgent" if form has no text, jquery change()?
            - [x] DOM refresh     
            - [ ] jquery draggable? 


    - [ ] DELETE request
        - [ ] Use SweetAlert: are you sure?
        - [ ] Bootstrap trash icon


    Maybe: 
    - [ ] Different buckets nav bar: Today, Tomorrow, by date?
        - [ ] Default: All tasks
        - [ ] Display number of tasks?
        - [ ] Choose date
        - [ ] Drag to different areas?
    - [ ] Separate area below for complete tasks
        - [ ] Strikethrough?
        - [ ] Animation: background color change few seconds, then move to complete area?
    - [ ] Separate area above for urgent task


Server Side
    - [x] POST Route: send task to database
        - [ ] Query body: 
    - [x] GET Route: retrieve data from database
        - [x] Sort by: Urgent, then DESC ID
        - [ ] Figure out: completed on the bottom? 
    - [x] PUT: Mark as Complete
    - [ ] DELETE: delete by ID
    - [ ] OPTION: Router for routes




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