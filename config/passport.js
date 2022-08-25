// config/passport.js
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(
    new LocalStrategy({ // 預設使用 username 和 password 作為驗證的欄位
      usernameField: 'email',
      passportField: 'password',
      passReqToCallback: true, // 如果需要在 verify callback 中取得 req
    },
      // verify callback
      // 因為上面有註明 passReqToCallback: true，所以第一個參數會是 req
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email, password })
          // 驗證 email、password 任一失敗，且顯示錯誤訊息
         if (!user) {
            return done(null, false, req.flash('warning_msg', '帳號或密碼輸入錯誤')); // { message: 'That email is not registered!' }
          }
        } catch (error) {
          return done(error)
        }
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