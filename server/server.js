require('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening to port', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err)
    })