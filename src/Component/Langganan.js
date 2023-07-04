const Ruangguru = require("./RuangguruP");

class Langganan extends Ruangguru {
    queryGetData = `SELECT * FROM ruangguru.jenis_langganan`;
    getQueryGetData() {
        return this.queryGetData
    }

    addPembayaran(url) {
        this.app.post(url, (req, res) => {
            const {id, id_jenis_langganan, jumlah} = req.body
            let sql = `INSERT INTO ruangguru.pembayaran(id, id_jenis_langganan, jumlah, tanggal, status) 
            VALUES('${id}', '${id_jenis_langganan}', '${jumlah}',now(), 'false')`
            this.db.query(sql, (err, data) => {
                if (!err) {
                    return res.json('Pembayaran Berhasil')
                }else {
                    return res.json('Pembayaran Gagal')
                }
            })
            
        })
    }

    addLangganan(url){
        this.app.post(url, (req, res) => {
            const {id_langganan, id_jenis_langganan, email, lama_langganan}  = req.body
            const sql = `
            BEGIN;
            insert into ruangguru.langganan values('${id_langganan}', '${id_jenis_langganan}', 
            (select id_siswa from ruangguru.siswa where 
                email = '${email}'), '${email}', now(), now() + interval '${lama_langganan.toString()}');
            update ruangguru.pembayaran set status = true where id = '${id_langganan}';
            update ruangguru.pengguna set id_kategori_pengguna = 5 where email = '${email}';
            COMMIT;
            `
            this.db.query(sql, (err, data) => {
                if (!err) {
                   return res.json('Pembayaran Berhasil')
                } else {
                    return res.json('Pembayaran Gagal')
                }
            })
        })
    }
}

module.exports = new Langganan()