const mongoose = require('mongoose')
//mongodb://localhost:27017/demo
//process.env.MONGODB_URL
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
