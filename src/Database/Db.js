const Pool  = require('pg').Pool

class Db {
    pool =  new Pool({
        host: 'localhost',
        user: 'postgres',
        port: '5436',
        password: 'fazar1907',
        database: 'postgres',
        schemas: 'ruangguru',
    })
}

module.exports = new Db()