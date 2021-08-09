const express = require('express')
const { inititalData } = require('../../controller/admin/initialData')
const router = express.Router()

router.get('/initialData', inititalData)

module.exports = router