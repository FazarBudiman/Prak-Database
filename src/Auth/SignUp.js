const LogiIn = require("./Login");

class SignUp extends LogiIn {    

    signUp(url){
        this.app.post(url, (req, res) => {
            let {id_siswa, email_siswa, nama_siswa, jenjang, kataSandi, id_kategori_pengguna} = req.body
            const sql = `call ruangguru.addpengguna (cast('${id_siswa}' as varchar), cast('${email_siswa}' as varchar), cast('${nama_siswa}' as varchar), cast('${jenjang}' as varchar), cast('${kataSandi}' as varchar), ${id_kategori_pengguna});`
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json(data.rows)
                    // console.log(data.rows)
                } else {
                    // console.log(err.message)
                    return res.json(err.data)
                }
            })
        })
    }
}

module.exports = new SignUp()