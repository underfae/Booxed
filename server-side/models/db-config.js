require('./user.model')
require('./bookshelf.model')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL,  { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }, (error) =>{
    if(error){
        console.log('Database connection error ' + JSON.stringify(error))
    }
    console.log('Database connection succesful')
})
