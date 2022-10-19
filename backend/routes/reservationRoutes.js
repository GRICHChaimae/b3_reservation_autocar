const express = require('express');
const router = express.Router();
const { getTrip, setReservation } = require('../controllers/reservationController');

router.route('/').get(getTrip).post(setReservation);

module.exports = router;
