//串接模組
const express = require('express')
const exphbs = require('express-handlebars') //樣版引擎
const bodyParser = require('body-parser') // 引用 body-parser(用來抓取res.body)
const methodOverride = require('method-override') // 載入 method-override
const routes = require('./routes') //引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案
const session = require('express-session')//載入session
const usePassport = require('./config/passport')//載入config/passport
require('./config/mongoose') //載入mongoose
const flash = require('connect-flash')   // 引用套件
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT 

const app = express()



// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
//session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
//呼叫 Passport 函式並傳入 app
usePassport(app)
//flash
app.use(flash())
//設定本地變數(所有"handlebars"都可以使用的變數)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 從req.flash中拿 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 從req.flash中拿 warning_msg 訊息
  next()
})

// 將 request 導入路由器
app.use(routes)


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})