const express = require('express')
const env = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

// import routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData')

env.config()

//mongodb+srv://user123:<password>@nodeapi.mvn7t.mongodb.net/myData?retryWrites=true&w=majority
mongoose.connect(`
mongodb+srv://anhtu2301:Katorichido@nodeapi.mvn7t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        userCreateIndex: true
    })
    .then(() => {
        console.log('Connected')
    })

app.use(cors())
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
// app.use(bodyParser())

app.use('/api', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', cartRoutes)
app.use('/api', initialDataRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})