const mongoose = require('mongoose')
const passport = require('passport')
const localPassword = require('passport-local').Strategy

const user = mongoose.model('user')

passport.use(
    new localPassword(function (username, password, done) {
        user.findOne({username: username}, (error, user) => {
            if (!user) {
                return done(null, false, {message: 'User with this username not found'})
            } else if (error) {
                return done(error)
            } else if (!user.verifyPassword(password)) {
                return done(null, false, {message: 'Wrong password'})
            } else if (user) {
                return done(null, user)
            }
        })
    })
)
