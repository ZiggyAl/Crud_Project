const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5433,
})

pool.query('SELECT NOW()', (err, res) => {
  if(err) {
      console.log(err)
      return;
  } 

  console.log('database connected')
  
})

module.exports = pool;