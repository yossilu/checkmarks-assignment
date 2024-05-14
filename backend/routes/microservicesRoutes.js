const express = require('express')
const router = express.Router()
const {
    createMicroservice,
    getOne,
    getAll,
} = require('../controllers/microservicesController.js')

router.post('/create', createMicroservice);
router.get('/getOne/:msId', getOne);
router.get('/getAll', getAll);

module.exports = router