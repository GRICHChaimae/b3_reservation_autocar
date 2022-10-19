   const asyncHandler = require('express-async-handler')
   const Voyages = require("../models/voyagesModel")
   
   const getVoyages = asyncHandler( async (req, res) => {
        const voyages = await Voyages.find()
        res.status(200).json(voyages)
    })

    const setVoyages = asyncHandler( async (req, res) => {
        // const voyage = new Voyages({
        //     ville_depart: req.body.ville_depart,
        //     name: req.body.name,
        // });
        //     voyage.save();
            // res.json(voyageInsert)
        if(!req.body)
        {
            res.status(400)
            throw new Error('Please add a text field')
        }

        // const stops
        const {ville_stop,ville_depart,date_depart,ville_arriver,temp_depart,temp_arriver,bus,prix,nombre_place,reserved_places} = req.body
        const voyage = await Voyages.create({
            ville_depart,
            ville_arriver,
            temp_depart,
            temp_arriver,
            bus,
            prix,
            nombre_place,
            ville_stop,
            date_depart,
            reserved_places,
        })

        res.status(200).json(voyage)
    })

    const updateVoyages = asyncHandler( async (req, res) => {
        const voyage = await Voyages.findById(req.params.id)
        
        if(!voyage){
            res.status(400)
            throw new Error('voyage not found')
        }
        
        const updatedVoyage = await Voyages.findByIdAndUpdate(req.params.id, req.body, {new: true,})
        
        res.status(200).json(updatedVoyage)
    })

    const deleteVoyages = asyncHandler( async (req, res) => {
        const voyage = await Voyages.findById(req.params.id)
        
        if(!voyage){
            res.status(400)
            throw new Error('voyage not found')
        }
        
        await voyage.remove()

        res.status(200).json({ id: req.params.id })
    })


    module.exports = {
        getVoyages,
        setVoyages,
        updateVoyages,
        deleteVoyages
    }