const jwt = require('jsonwebtoken')
const bcrypt =require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')


const registerAdmin = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if the user existe
    const userExists = await Admin.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User laready exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword
    })

    if(admin){
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // check the user email
    const admin = await Admin.findOne({ email }) 

    if(admin && (await bcrypt.compare(password, admin.password))){
        res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getAdmin = asyncHandler(async (req, res) => {
    const {_id, name, email} = await Admin.findById(req.admin.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdmin,  
}