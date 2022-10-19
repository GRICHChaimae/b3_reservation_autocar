const express = require('express')
const router = express.Router()
const {
    getVoyages,
    setVoyages,
    updateVoyages,
    deleteVoyages
} = require('../controllers/voyagesController')

router.route('/').get(getVoyages).post(setVoyages)
router.route('/:id').put(updateVoyages).delete(deleteVoyages)

module.exports = router