const mongoose = require('mongoose')


const connectDB = async () => {

    try {
        const response = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })

        if (response) { console.log('MongoDB connected...') }
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB