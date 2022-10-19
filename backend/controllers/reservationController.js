const asyncHandler = require('express-async-handler')
const Reservation = require("../models/reservationModel")
const voyage = require('../models/voyagesModel')

const getTrip = async (req, res, next) => {
    const {...others}=req.query
    const voyages = await voyage.find({...others})
    if(voyages.length){
        res.status(200).json(voyages)
    }else{
        res.status(400).json({
            message:"There is no Trip"
        })
    }
}

const setReservation = async (req, res, next) => {
    console.log(req.body);
    try{
        const placeReserver = await voyage.updateOne(
            {_id : req.body.idVoyage},
            { $push:{reserved_places : req.body.nombrePlace}}
        );
        res.json(req.body.nombrePlace)
    }catch(err){
        res.json({message : err});
    }

    const reservation = new Reservation({
        idVoyage: req.body.idVoyage,
            name: req.body.name,
            owner : req.body.owner,
            idOwner: req.body.idOwner,
            bus : req.body.bus,
            ville_depart: req.body.ville_depart,
            time_depart : req.body.time_depart,
            ville_arriver: req.body.ville_arriver,
            time_arriver : req.body.time_arriver,
            prix: req.body.prix,
            nombrePlace : req.body.nombrePlace,
        });
        reservation.save();
    }

module.exports = {
    getTrip,
    setReservation,
}