const Ruangguru = require("./RuangguruP");
const multer = require('multer');
const path = require('path');
const fs = require('fs')

class VideoMateri extends Ruangguru {

    // Query mendapatkan id max (terbesar)
    queryGetIdMax = `SELECT MAX(id) FROM ruangguru.video_materi WHERE substring(cast(id as varchar) from 1 for 9) LIKE `
    getQueryGetIdMax () {
        return this.queryGetIdMax;
    }

    // Query mendapatkan data (video materi) berdasarkan id
    queryGetDataById = `SELECT * FROM ruangguru.video_materi Where id_materi =`
    getQueryGetDataById(){
        return this.queryGetDataById
    }
    

    // Direktori menyimpan Thumbnail
    thumbnail = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/assets/thumbnail')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname  + Date.now() + path.extname(file.originalname))
        }
    })

    storageThumbnail = multer({
        storage: this.thumbnail ,
    })

    UploadThumbnail (url){
        this.app.post(url, this.storageThumbnail.single('thumbnail'), (req, res) => {
            return res.json(req.file.filename)
        })
    }


// Direktori Menyimpan Video
    video = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/assets/video')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname  + Date.now() + path.extname(file.originalname))
        }
    })

    storageVideo = multer ({
        storage: this.video
    })
    
    uploadvideo(url){
        this.app.post(url, this.storageVideo.single('video'), (req, res) => {
            return res.json(req.file.filename)
        })
    }

    // Menambahkan data video
    addVideo(url){
        this.app.post(url, (req, res) => {
            const {id_kursus, id_materi, id, judul, direktori, thumbnail} = req.body
            let sql = `INSERT into ruangguru.video_materi(id_kursus, id_materi, id, judul, direktori, thumbnail) 
            VALUES(${id_kursus}, ${id_materi}, ${id}, '${judul}', '${direktori}', '${thumbnail}')`
            this.db.query(sql, (err, data) => {
                if(!err){
                   return res.json('Berhasil')
                } else {
                    return res.json('Gagal')
                }
            })
        })
    }

    // Menghapus data video
    deleteVideo(url) {
        this.app.post(url, (req, res) => {
            let {id, direktori, thumbnail} = req.body

            fs.unlink(`./public/${direktori.substring(22)}`, () => {})
            fs.unlink(`./public/${thumbnail.substring(22)}`, () => {})

            const sql = `DELETE FROM ruangguru.video_materi WHERE id = ${id}`
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

module.exports = new VideoMateri ()