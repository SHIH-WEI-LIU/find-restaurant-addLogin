const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
const User = require('../../models/user')//引入建立好的 User model

//users登入路由
router.get('/login', (req, res) => {
  res.render('login')
})

//signUp
router.post('/signUp', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  // 檢查使用者是否已經註冊
  User.findOne({ email })
    .then(user => {
      // 如果已經註冊：退回原本畫面
      if (user) {
        console.log('User already exists.')
        res.render('login', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        // 如果還沒註冊：寫入資料庫
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

//signIn
// 加入 middleware，驗證 request 登入狀態
router.post('/signIn', (req, res) => {
  res.render('index')
})

module.exports = router