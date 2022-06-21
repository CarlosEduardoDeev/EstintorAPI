const mongoose = require('mongoose')

const Estintor = mongoose.model('estintores', {

        numero:String
        

})

module.exports = Estintor;