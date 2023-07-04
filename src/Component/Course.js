const Ruangguru = require("./RuangguruP")

class Course extends Ruangguru {


    // Query mendapatkan semua data kursus
    queryGetData =`select ruangguru.kursus.id AS id, ruangguru.kursus.nama, ruangguru.kategori_kursus.id as id_kategori, ruangguru.kategori_kursus.nama AS kategori  
    FROM ruangguru.kategori_kursus RIGHT JOIN ruangguru.kursus 
    ON ruangguru.kategori_kursus.id = ruangguru.kursus.id_kategori_kursus order by ruangguru.kursus.id`
    getQueryGetData () {
        return this.queryGetData
    }

    // Query Mendapatkan data berdasarkan id
    queryGetDataById = `SELECT * from ruangguru.kursus WHERE id =`
    getQueryGetDataById() {
        return this.queryGetDataById
    }

    // Query Mendapatkan Id Max (terbesar)
    queryGetIdMax = `SELECT MAX(id) FROM ruangguru.kursus WHERE substring(cast(id as varchar) from 1 for 3) like`
    getQueryGetIdMax(){
        return this.queryGetIdMax
    }

    // Query Mendapatkan Kursus berdasarkan Kategori
    queryGetCourseByKategori = `SELECT ruangguru.kursus.id AS id, ruangguru.kursus.nama, ruangguru.kategori_kursus.id AS id_kategori, 
    ruangguru.kategori_kursus.nama AS kategori  FROM ruangguru.kategori_kursus RIGHT JOIN ruangguru.kursus
    ON ruangguru.kategori_kursus.id = ruangguru.kursus.id_kategori_kursus where ruangguru.kursus.id_kategori_kursus = `
    getQueryGetCourseByKategori() {
        return this.queryGetCourseByKategori
    }

    // Menambah data kursus
    addCourse(url){
        this.app.post(url, (req, res) => {
        const {id_kategori_kursus, id_kursus, nama_kursus} = req.body
        let sql = `
        BEGIN;
        INSERT into ruangguru.kursus values (${id_kategori_kursus}, ${id_kursus}, '${nama_kursus}');
        INSERT into ruangguru.kategori_guru values (${id_kursus}, '${nama_kursus}');
        COMMIT;
        `
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json('berhasil')
                } else {
                    return res.json(err.message)
                }
            })
        })
    }
    
    // Memperbarui Kursus
    updateCourse(url){
        this.app.put(url, (req, res) => {
            const {id} = req.params
            const {nama} = req.body
            const sql = `
            BEGIN;
            UPDATE ruangguru.kursus set nama = '${nama}' WHERE id = '${id.toString()}';
            Update ruangguru.kategori_guru set jenis_kategori = '${nama}' WHERE id_kategori = '${id.toString()}';
            COMMIT;
            `
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json('Update Data Berhasil')
                } else {
                    return res.json(err.message)
                }
            })
        })
    }

    // Menghapus Kursus
    deleteCourse (url){
        this.app.delete(url, (req, res) => {
            const {id} = req.params
            const sql = `
            DELETE FROM ruangguru.kursus WHERE id = ${id};
            `
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json('Data Berhasil Dihapus')
                } else {
                    // return res.json(err.message)
                    console.log(err.message)
                }
            })
        })
    }
}

module.exports = new Course ()