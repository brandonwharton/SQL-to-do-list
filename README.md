# SQL-To-Do-List App

## Description

Duration: Weekend Project

The goal of this project was to create a full-stack CRUD app that allowed a user to keep a dynamic to-do list. 
Any changes the user submits through the client are stored and sent through a server to be stored on the local
database. Any changes to the database, including tasks being added, completed, and deleted result in a full refresh
of the information stored on the database. I also put in an urgency value in the database to allow users to prioritize
between urgent and non-urgent tasks. These urgencies are stored and styled differently on the client. 

There are simple buttons to mark tasks as completed, change the urgency level, and delete a task. When adding a task,
a popup generates prompting the user to set the urgency status at the beginning. Any requests to complete or delete a task
also generate popups confirming the user's intention to use those buttons. On completing a task, the urgency and complete buttons
get removed and the task gets dropped to the bottom of it's category and restyled. The delete button remains for user to clean up 
or leave completed tasks visible at their desire. 

The default ordering convention for both lists is to have the newest created tasks at the bottom. A sort-by option exists to change
that if the user wishes newest tasks to be listed at the top of their section. This sort-by preference only exists locally on the client,
but persists through any in-app functions short of a full page reload. The whole task list repopulates in case of a reload as well. 

## Screen Shot

![app screenshot](/Screenshots/screenshot1.png)
