const { isometricController } = require('../controllers/isometric');
const { jwtServices } = require('../middlewares/jwt');
const express = require('express');
const { storageServices } = require('../services/storage');
const router = express.Router();

router.post('/add', jwtServices.verifyToken.byHeader, isometricController.add.onlyOne)
router.post('/upload', storageServices.excel.single("file"), jwtServices.verifyToken.byHeader, isometricController.add.upload)

module.exports = {
    isometricRouter: router
}