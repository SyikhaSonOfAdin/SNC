const { drawingController } = require('../controllers/drawing');
const { storageServices } = require('../services/storage');
const { jwtServices } = require('../middlewares/jwt');
const multer = require('multer');
const express = require('express');

const upload = multer({ dest: '../../../uploads/drawings' });
const router = express.Router();

router.post('/upload-one', storageServices.pdf.single("file"), jwtServices.verifyToken.byHeader, drawingController.add.onlOne)
router.post('/upload-zip', upload.single('chunk'), jwtServices.verifyToken.byHeader, drawingController.add.upload);
router.post('/delete-one', jwtServices.verifyToken.byHeader, drawingController.delete.onlyOne);

router.get('/download-one/:projectId', jwtServices.verifyToken.byQuery, drawingController.download.onlyOne);

module.exports = {
    drawingRouter: router
}