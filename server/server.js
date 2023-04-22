require('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const cors = require('cors')
const app = express()

// routes
const foodRoutes = require('./routes/foods')
const orderRoutes = require('./routes/order')
const customerRoutes = require('./routes/customer')
const userRoutes = require('./routes/user')
const deliveryRoutes = require('./routes/delivery')
const transactionRoutes = require('./routes/transaction')
const storeRoutes = require('./routes/store')
const businessTypeRoutes = require('./routes/businessType')

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method)
    next()
})

app.use(cors({ origin: 'http://localhost:3000' }))

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
app.use(userRoutes)
app.use(businessTypeRoutes)
app.use(storeRoutes)

app.use(customerRoutes)
app.use(orderRoutes)
app.use(deliveryRoutes)
app.use(transactionRoutes)