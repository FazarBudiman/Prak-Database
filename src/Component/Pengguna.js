const Ruangguru = require("./RuangguruP");

class Pengguna extends Ruangguru {
    queryGetData = `SELECT pengguna.id, pengguna.email, pengguna.kata_sandi, kategori_pengguna.jenis_pengguna FROM ruangguru.pengguna 
    LEFT JOIN ruangguru.kategori_pengguna ON pengguna.id_kategori_pengguna = kategori_pengguna.id_kategori_pengguna 
    GROUP BY id, jenis_pengguna order by jenis_pengguna`

    getQueryGetData (){
        return this.queryGetData
    }

    queryGetPenggunaLangganan = `select l.id  as id_langganan, s.id_siswa,  s.nama, s.email,  l.tanggal_mulai, l.tanggal_selesai  from ruangguru.siswa s 
    inner join ruangguru.langganan l on s.id_siswa = l.id_siswa`

    getQueryGetPenggunaLangganan(){
        return this.queryGetPenggunaLangganan
    }
}

module.exports = new Pengguna()