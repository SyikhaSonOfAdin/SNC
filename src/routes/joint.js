const express = require('express');
const { jwtServices } = require('../middlewares/jwt');
const { jointController } = require('../controllers/joint');
const router = express.Router()

router.post('/add', jwtServices.verifyToken.byHeader, jointController.add.onlyOne)
router.post('/delete-all', jwtServices.verifyToken.byHeader, jointController.delete.all)
router.post('/delete-one', jwtServices.verifyToken.byHeader, jointController.delete.onlyOne)
router.post('/delete-isometric', jwtServices.verifyToken.byHeader, jointController.delete.perIsometric)
router.post('/edit', jwtServices.verifyToken.byHeader, jointController.edit)
router.get('/get-isometric', jwtServices.verifyToken.byQuery, jointController.get.perIsometric)

module.exports = {
    jointRouter: router
}