const { isometricController } = require('../controllers/isometric');
const { storageServices } = require('../services/storage');
const { jwtServices } = require('../middlewares/jwt');
const express = require('express');
const router = express.Router();

router.post('/add', jwtServices.verifyToken.byHeader, isometricController.add.onlyOne)
router.post('/upload', storageServices.excel.single("file"), jwtServices.verifyToken.byHeader, isometricController.add.upload)
router.post('/delete-all', jwtServices.verifyToken.byHeader, isometricController.delete.all)
router.post('/delete-one', jwtServices.verifyToken.byHeader, isometricController.delete.onlyOne)
router.post('/edit', jwtServices.verifyToken.byHeader, isometricController.edit)
router.get('/get-project/:projectId', jwtServices.verifyToken.byQuery, isometricController.get.perProject)

module.exports = {
    isometricRouter: router
}