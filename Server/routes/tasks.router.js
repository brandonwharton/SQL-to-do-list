const express = require('express');
const tasksRouter = express.Router();

const pool = require('../modules/pool');

// GET
tasksRouter.get('/', (req, res) => {
    // query to get all data from DB, sorting by urgency first, then by newest
    let queryText = `SELECT * FROM "todo_list" ORDER BY "urgent" DESC, "id" DESC;`;
    // request table from DB
    pool.query(queryText).then(result => {
        console.log('GET tasks from DB to Server');
        res.send(result.rows);
    }).catch (err =>{
        console.log('Error with GET in router', err);
        res.sendStatus(500);
    });
});









module.exports = tasksRouter;