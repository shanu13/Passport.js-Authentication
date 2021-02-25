const  express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')
const cookieSesssion = require('cookie-session')
const passport = require('passport')


//set up view engines
app.set('view engine','ejs');

app.use(cookieSesssion({
    maxAge : 24*60*60*1000,
    keys : [keys.session.cookieKey]
}))


// initialize passport 
app.use(passport.initialize())
app.use(passport.session())

// mongo connect
mongoose.connect(keys.mongodb.dbUri,{useNewUrlParser: true},()=>{
    console.log('db connected')
})

//middlewares
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)


app.get('/',(req,res)=>{
    res.render('home',{
        user : req.user
    })
})


app.listen(port,()=> {
    console.log('conected')
})