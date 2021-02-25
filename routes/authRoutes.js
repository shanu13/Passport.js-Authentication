const router = require('express').Router()
const passport = require('passport')

router.get('/login',(req,res,next)=>{
    res.render('login',{
        user : req.user
    })
})



// auth with google

router.get('/google',passport.authenticate('google',{
    scope : ['profile'] // what we want to retrieve 
}))

// callback route for google to redirect to

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile')
})

router.get('/logout',(req,res) => {

    req.logout()
    res.redirect('/')
})

module.exports = router;