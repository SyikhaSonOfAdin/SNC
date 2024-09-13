const unzipper = require('unzipper');
const multer = require('multer');
const { v4 } = require('uuid');
const fs = require('fs-extra');
const path = require('path');

class Storage {
    constructor() {
        this.nameFile = '';
    }

    #storageExcel = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../../uploads/excel'));
        },
        filename: (req, file, cb) => {
            req.body.uuid = v4()
            this.nameFile = req.body.uuid + '@' + file.originalname;
            cb(null, this.nameFile);
        },
    });

    #storagePDF = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../../uploads/drawings'));
        },
        filename: (req, file, cb) => {
            req.body.uuid = v4()
            this.nameFile = req.body.uuid + '@' + file.originalname;
            cb(null, this.nameFile);
        },
    });

    #storageImage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../../uploads/images'));
        },
        filename: (req, file, cb) => {
            req.body.uuid = v4()
            this.nameFile = req.body.uuid + '@' + file.originalname;
            cb(null, this.nameFile);
        },
    });

    excel = multer({ storage: this.#storageExcel });
    pdf = multer({ storage: this.#storagePDF });
    image = multer({ storage: this.#storageImage });
}

module.exports = {
    storageServices: new Storage()
};
