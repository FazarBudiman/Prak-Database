const App = require("../App");
const Db = require("../Database/Db");
const LogiIn = require("./Login");

class SignIn extends LogiIn {

    signIn(url){
        this.app.post(url, (req, res) => {
            let sql = `
            SELECT id, pengguna.email, kata_sandi, nama, id_kategori_pengguna FROM ruangguru.pengguna LEFT JOIN ruangguru.siswa 
            ON pengguna.id = siswa.id_siswa WHERE pengguna.email = '${req.body.email}' AND kata_sandi = '${req.body.kataSandi}'`
            this.db.query(sql, (err, data) => {
                if (! err) {
                    if (data.rowCount === 0) {
                        return res.json('salah')
                    } else {
                        return res.json(data.rows)
                    }
                } else {
                    console.log(err.message)
                }
            })
        })
    }
}

module.exports = new SignIn()