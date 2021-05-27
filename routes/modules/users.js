const express = require('express')
const router = express.Router()

// render login page
router.get('/login', (req, res) => {
  res.render('login')
})

// send the login data
router.post('/login', (req, res) => {

})

// render register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
