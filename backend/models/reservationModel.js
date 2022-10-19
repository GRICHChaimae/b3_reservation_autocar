const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    idVoyage :{
        type: String,
		required: [ 'true', 'Veulliez ajouter un id Voyage' ]
    },
    owner : {
        type: String,
		required: [ 'true', 'Veulliez ajouter un owner' ]
    },
    idOwner :{
        type: String,
		required: [ 'true', 'Veulliez ajouter un id' ]
    },
    bus:{
        type: Number,
		required: [ 'true', 'Veulliez ajouter un bus' ]
    },
    ville_depart:{
        type: String,
        required: ['true', 'Veulliez ajouter la ville de depart'],
    },
    time_depart:{
        type: String,
        required: ['true', 'Veulliez ajouter la ville de depart'],
    },
    ville_arriver:{
        type: String,
        required: ['true', "Veulliez ajouter la ville d'arriver"],
    },
    time_arriver:{
        type: String,
        required: ['true', "Veulliez ajouter la ville d'arriver"],
    },
    prix:{
        type: Number,
		required: [ 'true', 'Veulliez ajouter un prix' ]
    },
    nombrePlace:{
        type: Number,
		required: [ 'true', 'Veulliez ajouter un place' ]
    }
})

module.exports = mongoose.model('Reservation', reservationSchema)