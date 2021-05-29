const express = require('express');
const tasksRouter = express.Router();

const pool = require('../modules/pool');

// GET
tasksRouter.get('/', (req, res) => {
    // query to get all data from DB, sorting by urgency first, then by newest
    let queryText = `SELECT * FROM "todo_list" ORDER BY "urgent" DESC, "id" DESC;`;
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
    let queryText = `INSERT INTO "todo_list"("task", "urgent") VALUES ($1, $2);`;
    // store values from client
    let taskToAdd = req.body;
    let values = [taskToAdd.task, taskToAdd.urgent];
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

// route for toggling complete boolean
tasksRouter.put('/:id', (req, res) => {
    console.log('Inside complete PUT route', req.params.id, req.body);
    res.sendStatus(200);
})









module.exports = tasksRouter;