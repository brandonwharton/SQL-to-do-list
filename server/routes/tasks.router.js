const express = require('express');
const tasksRouter = express.Router();

const pool = require('../modules/pool');

// GET
tasksRouter.get('/', (req, res) => {
    // set the order of sorting based on request from user
    let order = req.query.order;
    console.log(order);
    
    // query to get all data from DB, sorting by complete on the bottom, then by id based on user preference
    const queryText = `SELECT * FROM "todo_list" ORDER BY ("complete" = true) ASC, "id" ${order};`;
    // request table from DB
    pool.query(queryText).then(result => {
        console.log('GET tasks from DB to server');
        res.send(result.rows);
    }).catch (err =>{
        console.log('Error with GET in router', err);
        res.sendStatus(500);
    });
});

// POST
tasksRouter.post('/', (req, res) => {
    // query to add a new task to the DB and sanitize values from client
    const queryText = `INSERT INTO "todo_list"("task", "urgent") VALUES ($1, $2);`;
    // store values from client
    const taskToAdd = req.body;
    const values = [taskToAdd.task, taskToAdd.urgent];
    // send POST request to DB
    pool.query(queryText, values).then(result => {
        console.log('POST a task to DB from server');
        // send a Created message back if successful
        res.sendStatus(201);
    }).catch(err => {
        console.log('Error with POST in router', err);
        res.sendStatus(500);
    });
});


// PUT

// route for changing complete boolean
tasksRouter.put('/complete/:id', (req, res) => {
    console.log('Inside complete PUT route', req.params.id, req.body);
    // query to change the complete status of a task to its opposite
    const queryText = `UPDATE "todo_list" SET "complete"=$1 WHERE "id"=$2;`
    const values = [req.body.switchComplete, req.params.id];
    // PUT request to DB
    pool.query(queryText, values).then(result => {
        console.log('Successfully changed complete');
        res.sendStatus(200);
    }).catch(err => {
        console.log('Error with PUT for complete in router', err);
        res.sendStatus(500);
    });
})

// route for toggling urgent boolean
tasksRouter.put('/urgent/:id', (req, res) => {
    console.log('Inside urgent PUT route', req.params.id, req.body);
    // query to change the urgent status of a task to its opposite
    const queryText = `UPDATE "todo_list" SET "urgent"=$1 WHERE "id"=$2;`
    const values = [req.body.switchUrgent, req.params.id];
    // PUT request to DB
    pool.query(queryText, values).then(result => {
        console.log('Successfully changed urgent');
        res.sendStatus(200);
    }).catch(err => {
        console.log('Error with PUT for urgent in router', err);
        res.sendStatus(500);
    });
})



// DELETE
// route for deleting a chosen table row on DB
tasksRouter.delete('/:id', (req, res) => {
    console.log('Inside DELETE route', req.params.id);
    // query to delete a row
    const queryText = `DELETE FROM "todo_list" WHERE "id"=$1;`
    const value = [req.params.id];
    // PUT request to DB
    pool.query(queryText, value).then(result => {
        console.log('Successfully deleted a task');
        res.sendStatus(200);
    }).catch(err => {
        console.log('Error with DELETE in router', err);
        res.sendStatus(500);
    });
})


module.exports = tasksRouter;