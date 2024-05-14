const express = require('express')
const router = express.Router()
const {
    createResource,
    getOne,
    getAll,
} = require('../controllers/resourcesController.js')

router.post('/create', createResource);
router.get('/getOne/:resourceId', getOne);
router.get('/getAll', getAll);

module.exports = router