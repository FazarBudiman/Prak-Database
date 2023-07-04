const express = require('express');
const cors = require('cors');
const SignIn = require('./src/Auth/SignIn');
const SignUp = require('./src/Auth/SignUp');
const Materi = require('./src/Component/Materi');
const Pengguna = require('./src/Component/Pengguna');
const Course = require('./src/Component/Course');
const VideoMateri = require('./src/Component/VideoMateri');
const Guru = require('./src/Component/Guru');
const Langganan = require('./src/Component/Langganan');
const App = require('./src/App');
const Dashboard = require('./src/Component/Dashboard');


const app = App.app
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// Sign In
const signin = SignIn
signin.signIn('/signin')

// Sign Up
const signUp = SignUp 
signUp.signUp('/signup')

// Course
const course = Course
course.getData('/course', course.getQueryGetData())
course.getDataById('/course/:id', course.getQueryGetDataById())
course.addCourse('/course')
course.deleteCourse('/course/:id')
course.updateCourse('/course/:id')
course.getDataById('/course/kategori/:id', course.getQueryGetCourseByKategori())
course.getIdMax('/course/id/:id', course.getQueryGetIdMax())

// Materi
const materi = Materi
materi.getData('/materi', materi.getQueryGetData())
materi.getDataById('/materi/:id', materi.getQueryGetDataById())
materi.addMateri('/materi')
materi.deleteData('/materi/:id', materi.getQueryDeleteData())
materi.updateMateri('/materi/:id')
materi.getIdMax('/materi/id/:id', materi.getQueryGetIdMax())


// Video Materi
const videomateri = VideoMateri
videomateri.getDataById('/videomateri/:id', videomateri.getQueryGetDataById())
videomateri.getIdMax('/videomateri/id/:id', videomateri.getQueryGetIdMax())
videomateri.UploadThumbnail('/videomateri/thumbnail')
videomateri.uploadvideo('/videomateri/video')
videomateri.addVideo('/videomateri')
videomateri.deleteVideo('/videomateri/deleteVideo')

// Pengguna
const pengguna = Pengguna
pengguna.getData('/pengguna', pengguna.getQueryGetData())
pengguna.getData('/pengguna/langganan', pengguna.getQueryGetPenggunaLangganan())

// Guru
const guru = Guru 
guru.getData('/guru', guru.getQueryGetData())
guru.getData('/guru/kategori', guru.getQueryGetKategoriGuru())
guru.addGuru('/guru')
guru.updateGuru('/guru/:id')
guru.deleteGuru('/guru/:id')

// Langganan
const langganan = Langganan
langganan.getData('/langganan', langganan.getQueryGetData())
langganan.addPembayaran('/langganan/pembayaran')
langganan.addLangganan('/langganan/pembayaran/sukses')

const dashboard = Dashboard
dashboard.getData('/dashboard/kursus', dashboard.getQueryGetJumlahCourse())
dashboard.getData('/dashboard/pengguna', dashboard.getQueryGetJumlahPengguna())
dashboard.getData('/dashboard/pengguna/chart', dashboard.getQueryGetChartPengguna())

app.listen(8081, () => {
    console.log("listening");
})

