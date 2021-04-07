const { Pool } = require('pg');
const PG_URI = 'postgres://rjtdjawy:efqgBQiW-_TEqt7cU1mniqJch-GA6-pr@kashin.db.elephantsql.com:5432/rjtdjawy';

// create a new pool here using the connection string above
const pool = new Pool({
    connectionString: PG_URI
  });
  
  module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };