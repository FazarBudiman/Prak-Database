const App = require("../App")
const Db = require("../Database/Db")

class Ruangguru {
    app = App.app
    db = Db.pool

    // Mendapatkan semua data
    getData(url, sql){
        this.app.get(url, (req, res) => {
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json(data.rows)
                } else {
                    return res.json(err.message)
                }
            })
        })
    }

    // Mendapatkan data by Id
    getDataById(url, sql){
        this.app.get(url, (req, res) => {
            const {id} = req.params
            const query = sql + `${id}`
            this.db.query(query, (err, data) => {
                if (! err) {
                    return res.json(data.rows)
                } else {
                    return res.json(err.message)
                }
            })
        })
    }

    // Mendapatkan id max (terbesar)
    getIdMax (url, sql){
        this.app.get(url, (req, res) => {
            const {id} = req.params
            const query = sql + `'${id}'`
            this.db.query(query, (err, data) => {
                if (!err) {
                    return res.json(data.rows)
                } else {
                    return res.json(err.message)
                }
            })
        })
    }

    // Menghapus data
    deleteData (url, sql){
        this.app.delete(url, (req, res) => {
            const {id} = req.params
            const query = sql + `${id}`
            this.db.query(query, (err, data) => {
                if (!err) {
                    return res.json('Data Berhasil Dihapus')
                } else {
                    return res.json(err.message)
                }
            })
        })
    }
}

module.exports = Ruangguru