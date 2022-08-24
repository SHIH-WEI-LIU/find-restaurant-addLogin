const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// routes setting
//create
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId }) //req.body本身是物件，需用...來push到另一個物件中,也可寫成（req.body, {userId}）
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//detail(show)
router.get('/:id', (req, res) => { 
  const _id = req.params.id  //改用 findOne 之後，Mongoose 就不會自動幫我們轉換 id 和 _id，所以這裡要寫和資料庫一樣的屬性名稱，也就是 _id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId }) //從資料庫查找特定資料
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//編輯資料頁面的路由
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//修改特定資料的路由
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOneAndUpdate({ _id, userId, ...req.body }) //找到對應的資料後整個一起更新
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

//刪除的路由
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router