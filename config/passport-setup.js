const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy
const keys = require('./keys')
const User = require('../models/user')


passport.serializeUser((user,done) => {
    done(null,user.id)
})

passport.deserializeUser((id,done) => {
    User.findById(id)
        .then(user => {
        
            done(null,user)
        })
        .catch(err => console.log(err))
  
})

passport.use(new GoogleStrategy({
    //options for google strategy
    callbackURL : '/auth/google/redirect',
    clientID : keys.google.clientID,
    clientSecret : keys.google.clientSecret

},(accessToken,refreshToken,profile,done)=>{
    // passports callback

    // check if user already exits
     User.findOne({googleId : profile.id})
         .then(user => {
             if(user){
                 // already exits
                 console.log('user already exits')
                 done(null,user)
             }
             else{
                const Newuser = new User({
                    username : profile.displayName,
                    googleId : profile.id
                })
                Newuser.save()
                       .then(Newuser => {
                        console.log('user created',Newuser)
                        done(null,Newuser)
                    })
                    .catch(err => console.log(err));
            
             }
         })
         .catch(err => console.log(err))

   
  
}))