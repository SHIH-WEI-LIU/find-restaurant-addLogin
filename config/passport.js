const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')
module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passportField: 'password', passReqToCallback: true, }, (req, email, password, done) => {
    User.findOne({ email, password })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', '帳號或密碼輸入錯誤！'))
        }
        return done(null, user)
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