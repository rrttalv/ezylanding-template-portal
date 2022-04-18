const TwitterStrategy = require('passport-twitter')
const GithubStrategy = require('passport-github2')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20')
const { User, findOrCreateOauth } = require('../models/User')

module.exports = passport => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log(username, password)
      User.findOne({ email: username }).then((user, err) => {
        if(err){
          return done(err, false, { success: false, message: 'Something when wrong' })
        }
        if(!user){
          return done(null, false, { success: false, message: 'User does not exist' })
        }
        if(!user.password){
          return done(null, false, { success: false, message: 'This user is not registered with a password' })
        }
        bcrypt.compare(password, user.password, (err, match) => {
          if(err){
            return done(null, false, { success: false, message: 'Something went wrong' })
          }
          if(match){
            return done(null, user, { success: true, redirect: '/dashboard' })
          }else{
            return done(null, false, { success: false, message: 'Wrong password' })
          }
        })
      })
    }
  ))

  const { GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY } = process.env

  passport.use(
    new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_KEY,
      callbackURL: GOOGLE_CALLBACK_URL,
    }, 
      (accessToken, refreshToken, profile, cb) => {
        findOrCreateOauth(profile.emails[0].value, profile.id).then((user, err) => {
          return cb(err, user)
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({_id: id}).exec((err, user) => {
      done(err, user);
    });
  });
}