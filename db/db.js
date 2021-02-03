const mongoose = require('mongoose')
<<<<<<< HEAD
=======
//mongodb://localhost:27017/demo
//process.env.MONGODB_URL
//console.log(process.env.MONGODB_URL);
>>>>>>> fb02903de6bf351c92731987b4747a88961b5f43

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
