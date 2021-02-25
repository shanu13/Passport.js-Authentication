const router = require('express').Router()

const authCheck = (req,res,next)=> {
   if(!req.user){
     // if user is not logged in 
     res.redirect('/auth/login');
   }else{
       next();
   } 
}

router.get('/',authCheck,(req,res) => {
    // res.send(`this is ${req.user.username} profile`)
    res.render('profile',{
        user : req.user
    });
})

module.exports = router;