const mongoose = require('mongoose')   

require('dotenv').config()

const dbuser = process.env.DB_USER
const dbpass = process.env.DB_PASS



const DBConnect = mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.c6bf7.mongodb.net/?retryWrites=true&w=majority`)

module.exports = DBConnect;
