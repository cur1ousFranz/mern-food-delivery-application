require('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const app = express()

// routes
const foodRoutes = require('./routes/foods')
const orderRoutes = require('./routes/orders')

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method)
    next()
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening to port', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err)
    })

app.use(foodRoutes)
app.use(orderRoutes)