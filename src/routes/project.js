const { projectControllers } = require('../controllers/project');
const { jwtServices } = require('../middlewares/jwt');
const express = require('express');
const router = express.Router();

router.post('/add', jwtServices.verifyToken.byHeader, projectControllers.add)
router.post('/edit', jwtServices.verifyToken.byHeader, projectControllers.edit)
router.post('/delete', jwtServices.verifyToken.byHeader, projectControllers.delete)

module.exports = {
    projectRouter: router
}