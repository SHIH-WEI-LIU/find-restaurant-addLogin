const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// routes setting
//create
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//detail(show)
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id) //從資料庫查找特定資料
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//編輯資料頁面的路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//修改特定資料的路由
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body) //找到對應的資料後整個一起更新
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//刪除的路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router