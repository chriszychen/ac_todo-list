const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')

// 導入路由模組
router.use('/', home)
router.use('/todos', todos)

module.exports = router