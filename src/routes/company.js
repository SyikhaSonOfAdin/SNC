const { companyControllers } = require('../controllers/company');
const express = require('express');
const router = express.Router();

router.post("/registration", companyControllers.registration)

module.exports = {
    companyRouter: router
}