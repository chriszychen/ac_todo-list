const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// render login page
router.get('/login', (req, res) => {
  res.render('login')
})

// handle the login data
router.post('/login', (req, res) => {

})

// render register page
router.get('/register', (req, res) => {
  res.render('register')
})

// handle the register data
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists.')
        res.render('register', { name, email, password, confirmPassword })
      } else {
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

module.exports = router
