const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.registerUser = (req, res, next) => {
    let user = new User()
    user.username = req.body.username
    user.email = req.body.email
    user.name = req.body.name
    user.surname = req.body.surname
    user.password = req.body.password
    user.points = req.body.points
    user.liked = req.body.liked
    user.read = req.body.read
    user.save((error, result) =>{
        if(error){
            error.code == 11000 ? res.status(422).send(Object.keys(error.keyValue)[0] + ' must be unique!') : next(error)
        }else{
            res.status(200).send(result)
        }
    })
}