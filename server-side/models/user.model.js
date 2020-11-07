const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const user = new mongoose.Schema({
    username: {
        type: String,
        required: "Username is required",
        unique: true
    },
    email: {
        type: String,
        required: "E-mail is required",
        unique: true,
        // validate: / /
    },
    name: {
        type: String,
        required: 'Name is required'
    },
    surname: {
        type: String,
        required: 'Surname is required'
    },
    password: {
        type: String,
        required: 'Password is required',
        unique: true,
        minlength: [8,'Password needs to be at least 8 characters long']
    }, 
    points: {
        type: Number
    },
    liked: {
        type: Number
    },
    read: {
        type: Number
    },
    salt: String
})

user.pre('save', function(next){
    bcryptjs.genSalt(10, (error, result) => {
        bcryptjs.hash(this.password, result, (error, hashedPassword) =>{
            this.password = hashedPassword
            this.salt = result
            next()
        })
    })
})

// user.path('email').validate(function(email) => {
//     RFC5322  = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
//     return RFC5322.test(email);
// }, 'Invalid e-mail address.')

// user.path('password').validate((password) => {
//     return passwordRegexp.test(password);
// }, 'Invalid password. It should be 8 characters long and also contain at least: one uppercase, one lowercase, one special character and one number.')

mongoose.model('User', user, 'user')