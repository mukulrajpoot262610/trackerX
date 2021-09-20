const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path');
const cors = require('cors')

dotenv.config()
app.use(cors())

// Connect DB
connectDB()

// INIT MIDDLEWARE
app.use(express.json({ extended: false }))

const PORT = process.env.PORT || 5000

app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/data', require('./routes/dataRoutes'))

if (node_env === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("Hello World")
    })
}
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})