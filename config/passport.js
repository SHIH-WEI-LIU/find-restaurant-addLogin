const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passportField: 'password', passReqToCallback: true, }, (req, email, password, done) => {
    User.findOne({ email })
    //到資料庫找是否有相對應帳號
      .then(user => {
        //若找不到代表帳號尚未註冊
        if (!user) { 
          return done(null, false, req.flash('warning_msg', '該帳號尚未註冊！'))
        }
        //若有找到帳號
        return bcrypt.compare(password, user.password).then(isMatch => {  
          //若有找到帳號但密碼不正確
          if (!isMatch) {
            return done(null, false, req.flash('warning_msg', '帳號或密碼輸入錯誤！'))
          }
          //若有找到帳號密碼也正確則回傳使用者資料
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}