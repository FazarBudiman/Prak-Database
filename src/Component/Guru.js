const  Ruangguru = require("./RuangguruP");

class Guru extends Ruangguru {

    // Query Mendapatkan semua data guru
    queryGetData = `SELECT id_guru, nama_guru, email, jenis_kategori FROM ruangguru.guru LEFT JOIN ruangguru.kategori_guru 
    ON guru.id_kategori = kategori_guru.id_kategori`
    getQueryGetData() {
        return this.queryGetData
    }
    
    // Query Mendapatkan semua data kategori guru
    queryGetKategoriGuru = `SELECT * FROM ruangguru.kategori_guru`
    getQueryGetKategoriGuru(){
        return this.queryGetKategoriGuru
    }

    // Menambah Guru
    addGuru(url){
        this.app.post(url, (req, res) => {
        const {nama_guru, id, id_kategori, email, kata_sandi} = req.body
        let sql = `
        BEGIN;
        INSERT into ruangguru.pengguna (id, email, kata_sandi, id_kategori_pengguna, createdAt) 
        values ('${id}', '${email}', '${kata_sandi}', '2', now());
        INSERT into ruangguru.guru (id_guru, nama_guru, email, id_kategori) 
        values ('${id}', '${nama_guru}', '${email}', '${id_kategori}');
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

    // Memperbarui Guru
    updateGuru(url){
        this.app.put(url, (req, res) => {
            const {id} = req.params
            const {nama_guru, id_kategori} = req.body
            let sql = `UPDATE ruangguru.guru set nama_guru = '${nama_guru}', id_kategori = '${id_kategori}' WHERE id_guru = '${id}'`
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json('Guru Berhasil Diperbarui')
                }else {
                    return res.json(err.message)
                }
            })
        })
    }


    deleteGuru(url){
        this.app.delete(url, (req, res) => {
            const {id} = req.params
            let sql = `
            BEGIN;
            DELETE FROM ruangguru.guru WHERE id_guru = '${id}';
            DELETE from ruangguru.pengguna WHERE id = '${id}';
            COMMIT;
            `
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json('Data Berhasil Dihapus')
                } else {
                    return res.json(err.message)
                }
            })
        })
    }
}

module.exports = new Guru ()