// This pool setup was provided from an example given by my instructor Dane Smith at Prime Digital Academy. 
// I've replaced original instruction-related comments with my own understanding of the process

const pg = require('pg');
const url = require('url');
// variable for server pool configuration
let config = {};

// If being deployed on heroku, set up pg config using provided process.env
if (process.env.DATABASE_URL) {
  config = {
    // Setting our connection to database with provide information
    connectionString: process.env.DATABASE_URL,
    // Heroku-specific requirement
    ssl: { rejectUnauthorized: false },
  };
} else {
  // Local database set-up
  config = {
    host: 'localhost',
    port: 5432,
    database: 'weekend-to-do-app',
  };
}
// creates a new pool with the provided Heroku or local information
const pool = new pg.Pool(config);
// succesful connection log
pool.on('connect', () => {
  console.log('Postgesql connected');
});
// error message if a connection error happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});
// make pool available to other scripts
module.exports = pool;