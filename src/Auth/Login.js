const App = require("../App")
const Db = require("../Database/Db")

// Kelas Abstrak
class LogiIn {
    app = App.app
    db = Db.pool
}

module.exports = LogiIn 