// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')


//首頁路由
router.get('/', (req, res) => {
  Restaurant.find() // 取出  model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
//首頁search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  if (keyword.length === 0) {
    return res.redirect("/")
  }
  Restaurant.find() // 取出  model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(restaurant =>
        restaurant.name.includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
      )
      if (filterRestaurants.length === 0) {
        return res.redirect("/")
      }
      res.render('index', { restaurants: filterRestaurants, keyword: keyword })// 將資料傳給 index 樣板
    })
    .catch(error => console.error(error)) // 錯誤處理
})
//asc order
router.get('/asc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' }) 
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
//reverse order
router.get('/desc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
//category order
router.get('/category', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
//location order
router.get('/location', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ location: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router