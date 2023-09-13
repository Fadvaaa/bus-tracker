const express = require('express')
const router = express.Router()
const CRUD = require('../shared/Crud')
const Model = require('../Models/User')

router.all("/:id?", CRUD(Model));


module.exports = router