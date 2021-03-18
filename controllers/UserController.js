'use strict';
const respon = require('../respon');
const jwt = require('jsonwebtoken');
const { UserModel, PendidikanModel } = require('../config/db');
const multer = require('multer');
const uploadImage = require('../middlewares/uploadImage');

exports.getUser = (req, res) => {
    UserModel.findAll({
        include: [
            {
                as: 'PENDIDIKAN',
                model: PendidikanModel,
                attributes: ['USER_EMAIL', 'PENDIDIKAN_AKADEMIK', 'PENDIDIKAN_JURUSAN', 'PENDIDIKAN_TAHUN_LULUS', 'PENDIDIKAN_IPK'],
            },

        ],
    }).then(dataHasil => {

        if (dataHasil.length > 0) {
            var message = `Berhasil Mangambil! ${req.user.USER_EMAIL}`;
            respon.berhasil(dataHasil, message, res)
        } else {
            var message = `Data Kosong!`;
            respon.berhasil(null, message, res)
        }

    }).catch(err => console.log(err))
}

exports.updateUser = (req, res) => {
    UserModel.update(req.body, {
        where: {
            USER_ID: req.params.id
        }
    }).then(dataHasil => {
        var message = `Berhasil Menyimpan!`;
        respon.berhasil(dataHasil, message, res)
    }).catch(err => console.log(err))
}

exports.signup = (req, res) => {
    UserModel.create({
        USER_EMAIL: req.body.USER_EMAIL,
        USER_PASSWORD: req.body.USER_PASSWORD
    }).then(dataHasil => {
        var message = `Berhasil Menyimpan`;
        respon.berhasil(dataHasil, message, res)
    }).catch(err => console.log(err))
}

exports.signin = (req, res) => {
    UserModel.findAll({
        where: {
            USER_EMAIL: req.body.USER_EMAIL,
            USER_PASSWORD: req.body.USER_PASSWORD
        }
    }).then(dataHasil => {

        if (req.body.USER_PASSWORD == dataHasil[0].USER_PASSWORD) {
            var message = `Berhasil Login`;
            const token = jwt.sign({ userId: dataHasil[0] }, 'MY_SECRET_KEY');
            respon.berhasil({ token: token }, message, res)
        } else {
            var message = `Data Kosong!`;
            respon.berhasil(null, message, res)
        }

    }).catch(err => console.log(err))
}

exports.upload = (req, res) => {
    let upload = multer({ storage: uploadImage.storage, fileFilter: uploadImage.imageFilter }).single('img');
    upload(req, res, function (err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        res.json({ 'message': 'upload success' });
    });
}

exports.tambahPendidikan = (req, res) => {
    UserModel.findAll({
        where: {
            USER_ID: req.params.id
        }
    }).then(dataHasil => {

        dataHasil.forEach(element => {
            PendidikanModel.create({
                USER_EMAIL: element.USER_EMAIL,
                PENDIDIKAN_TERAKHIR: req.body.PENDIDIKAN_TERAKHIR
            }).then(inputHasil => {
                var message = `Berhasil Menyimpan`;
                respon.berhasil(inputHasil, message, res)
            }).catch(err => console.log(err))
        });

    }).catch(err => console.log(err))
}