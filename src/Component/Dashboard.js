const Ruangguru = require("./RuangguruP");

class Dashboard extends Ruangguru {

    queryGetJumlahCourse = `
     select (select count(*) from ruangguru.kategori_kursus)  as jumlah_1, 
            (select count(*) from ruangguru.kursus) as jumlah_2, 
            (select count(*) from ruangguru.materi) as jumlah_3, 
            (select count(*) from ruangguru.video_materi) as jumlah_4`
    getQueryGetJumlahCourse() {
        return this.queryGetJumlahCourse;
    }


    queryGetJumlahPengguna = `
    select (select count(*) from ruangguru.pengguna where id_kategori_pengguna > 2) as jumlah_1, 
           (select count(*) from ruangguru.pengguna where id_kategori_pengguna = 3) as jumlah_2, 
           (select count(*) from ruangguru.pengguna  where id_kategori_pengguna = 4) as jumlah_3, 
        (select count(*) from ruangguru.pengguna  where id_kategori_pengguna = 5 ) as jumlah_4`
    getQueryGetJumlahPengguna(){
        return this.queryGetJumlahPengguna;
    }

queryGetChartPenggunga = `select 
SUM (   CASE WHEN id_kategori_pengguna = 4 
                  THEN 1
                  ELSE  0
             END
          ) as siswa_tidak_langganan,
          
SUM (   CASE WHEN id_kategori_pengguna = 5 
                  THEN 1
                  ELSE  0
             END
          ) as siswa_langganan,
extract (month from createdat) as bulan, 
extract (year from createdat) as tahun 
from ruangguru.pengguna where extract (year from createdat) = 2023
group by extract (month from createdat), extract (year from createdat)
order by extract (year from createdat), extract (month from createdat);
`;
getQueryGetChartPengguna(){
    return this.queryGetChartPenggunga;
}
}
module.exports = new Dashboard()