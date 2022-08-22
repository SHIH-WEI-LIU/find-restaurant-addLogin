const express = require('express')
const router = express.Router()
const User = require('../../models/user')//引入建立好的 User model

//users登入路由
router.get('/login', (req, res) => {
  res.render('login')
})

//login
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router