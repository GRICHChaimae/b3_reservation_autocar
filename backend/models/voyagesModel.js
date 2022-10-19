const mongoose = require('mongoose');

const voyagesSchema = mongoose.Schema({
	ville_depart: {
		type: String,
		required: [ 'true', 'Veulliez ajouter la ville de depart' ]
	},
	ville_arriver: {
		type: String,
		required: [ 'true', "Veulliez ajouter la ville d'arriver" ]
	},
	temp_depart: {
		type: String,
		required: [ 'true', 'Veulliez ajouter le temp de depart' ]
	},
	temp_arriver: {
		type: String,
		required: [ 'true', "Veulliez ajouter le temp d'arriver" ]
	},
    bus:{
        type: Number,
		required: [ 'true', "Veulliez ajouter le nombre bus" ]
    },
	prix: {
		type: Number,
		required: [ 'true', 'Veulliez ajouter un prix' ]
	},
	nombre_place: {
		type: Number,
		required: [ 'true', 'Veulliez ajouter le nombre de les places' ]
	},
	date_depart: {
		type: String,
		required: [ 'true', 'Veulliez ajouter la date de depart' ]
	},
	ville_stop: [
		{
			ville_depart: {
				type: String
			},
			temp_arriver: {
				type: String
			}
		}
	],
    reserved_places :{
        type:[Number],
        required : ['true']
    }
});

module.exports = mongoose.model('Voyage', voyagesSchema);
