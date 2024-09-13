const { drawingController } = require('../controllers/drawing');
const { storageServices } = require('../services/storage');
const { jwtServices } = require('../middlewares/jwt');
const multer = require('multer');
const upload = multer({ dest: '../../../uploads/drawings' });
const express = require('express');
const router = express.Router();

router.post('/upload-one', storageServices.pdf.single("file"), jwtServices.verifyToken.byHeader, drawingController.add.onlOne)
router.post('/upload-zip', upload.single('chunk'), drawingController.add.upload);

module.exports = {
    drawingRouter: router
}