const jwt = require('jsonwebtoken')
const bcrypt =require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if the user existe
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User laready exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // check the user email
    const user = await User.findOne({ email }) 

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getUser = asyncHandler(async (req, res) => {
    res.json({message: 'User data'})
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser,  
}