const Ruangguru = require("./RuangguruP");

class Materi extends Ruangguru {

    // Query Mendapatkan semua data materi
    queryGetData = `SELECT materi.id, materi.judul_materi, kursus.id AS id_kursus, kursus.nama AS nama_kursus  from ruangguru.materi 
    INNER JOIN ruangguru.kursus ON materi.id_kursus = kursus.id order by materi.id`
    getQueryGetData(){
        return this.queryGetData;
    }

    // Query mendapatkan data berdasarkan id
    queryGetDataById = `Select * from ruangguru.materi where id =`
    getQueryGetDataById(){
        return this.queryGetDataById
    }

    // Query mendapatkan id max (terbesar)
    queryGetIdMax = `select max(id) from ruangguru.materi where substring(cast(id as varchar) from 1 for 6) like `
    getQueryGetIdMax (){
        return this.queryGetIdMax
    }

    // Query Menghapus data Materi
    queryDeleteData = `DELETE FROM ruangguru.materi WHERE id =`
    getQueryDeleteData(){
        return this.queryDeleteData
    }

    

    // Menambahkan data materi
    addMateri(url) {
        this.app.post(url, (req, res) => {
            const {id_kursus, nama_materi, id_materi} = req.body
            let sql = `INSERT into ruangguru.materi (id_kursus, id, judul_materi) 
            values(${id_kursus}, ${id_materi}, '${nama_materi}')`
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json('Berhasil')
                } else {
                    return res.json('Gagal')
                }
            })
        })
    }
    
    // Memperbarui Materi
    updateMateri(url){
        this.app.put(url, (req, res) => {
            const {id} = req.params
            const {judul_materi} = req.body
            const sql = `UPDATE ruangguru.materi set judul_materi = '${judul_materi}' WHERE id = '${id.toString()}'`
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json('Update Data Berhasil')
                } else {
                    return res.json(err.message)
                }
            })
        })
    }
    
}
module.exports = new Materi()