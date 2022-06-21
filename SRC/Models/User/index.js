const mongoose = require('mongoose')

const User = mongoose.model('User',{

    name:String,
    user:String,
    password:String,
    setor:String,

})

module.exports = User;