const express = require('express')
const router = express.Router()

const passport = require('passport')

//fb
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//google
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//line
router.get('/line', passport.authenticate('line', {
  scope: ['profile', 'openid', 'email']
}))
router.get('/line/callback', passport.authenticate('line', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router