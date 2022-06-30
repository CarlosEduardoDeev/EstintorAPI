const mongoose = require('mongoose')

const Extintor = mongoose.model('extintores', {

        numeracao:String,
        ano:String,
        tipo:String,
        peso:String,
        local:String,
        obs:String,

        

})

module.exports = Extintor;