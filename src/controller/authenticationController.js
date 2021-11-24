const passport = require('passport');

module.exports = {
    signup:function (req,res) {
        res.render('auth/signup');
    },
    signin:function (req,res) {
        res.render('auth/signin');
    },
    profile:function (req,res) {
        res.render('profile');
    },
    logout:function (req,res) {
        req.logOut();
        res.redirect('/signin');
    },
    signupR:function (req,res) {
        passport.authenticate('local.signup',{
            successRedirect: '/profile',
            failureRedirect: '/signup',
            //failureFlash: true
        })(req,res);
    },
    signinR:function (req,res,next) {
        passport.authenticate('local.signin',{
            successRedirect: '/profile',
            failureRedirect: '/signin',
            failureFlash: true
        })(req,res,next);
    }
}