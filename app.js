// include modules and define related variables
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// set routes
app.get('/', (req, res) => {
  res.render('index')
})


// start and listen the server

app.listen(3000, () => {
  console.log('The server is listening on http://localhost:3000')
})