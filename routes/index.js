//總路由
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')// 引入 home 模組程式碼
const users = require('./modules/users') // 引入 users 模組程式碼
const restaurants = require('./modules/restaurants')// 引入 restaurants 模組程式碼
const { authenticator } = require('../middleware/auth')  // 載入middleware物件中的 authenticator（middleware.authenticator）


// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組 
router.use('/restaurants', authenticator, restaurants)
//將網址結構符合 /users 字串開頭的 request 導向 users 模組
router.use('/users', users)
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', authenticator, home)

module.exports = router // 匯出路由器
