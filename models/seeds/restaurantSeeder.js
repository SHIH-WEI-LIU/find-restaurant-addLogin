if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Restaurant = require('../Restaurant')
const User = require('../user')
const restaurantList = require('./restaurant.json').restaurants
const userList = require('./userSeeder.json').users
const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all(userList.map(user => {
    const { name, email, password, restaurantIndexes } = user
    return User.create(
      {
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      })

      .then(user => {
        const restaurants = restaurantIndexes.map(index => {
          const restaurant = restaurantList[index]
          restaurant.userId = user._id
          return restaurant
        })
        return Restaurant.create(restaurants)
      })
  }))

    .then(() => console.log('done.'))
    .catch(e => console.log(e))
    .finally(() => db.close())
})

