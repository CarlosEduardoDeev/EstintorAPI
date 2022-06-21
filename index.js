const express = require ('express')
const cors = require("cors")

require('dotenv').config()


const app = express()

app.use(cors());
app.use(express.json())

const DBConnect = require('./SRC/ConnectDB/DBConnect');




require('./SRC/Routes/CriarUser/index')(app)
require('./SRC/Routes/LoginUser/index')(app)




DBConnect.then(() =>{
    app.listen(3000,
        console.log('connect')
        )
})