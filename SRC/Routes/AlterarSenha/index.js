const router = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../../Models/User/index')

router.patch('/passChange/:id', async (req,res) =>{

    const id = req.params.id

    const {password} = req.body
    
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const person ={
        password:passwordHash
    }
    try {
        
        const updatePerson = await User.updateOne({_id:id}, person)
        
        res.status(200).json(person)

    } catch (error) {
        res.status(404).json({msg:"Usuario nao encontrado "})
    }
    
})
module.exports = app => app.use('/alterar',router)