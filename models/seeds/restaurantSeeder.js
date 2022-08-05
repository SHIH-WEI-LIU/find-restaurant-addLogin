const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantList = require("../../restaurant.json").results
const db = require('../../config/mongoose')
db.once("open", () => {
  Restaurant.create(restaurantList)
    .then(() => {
      db.close()
    })
    .catch(err => console.log(err))
})