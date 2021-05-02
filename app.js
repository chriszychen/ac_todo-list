// include modules and define related variables
const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')

const Todo = require('./models/todo.js')

const app = express()

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

// set routes
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(err => console.error(err))

})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  console.log(req)
  // 先產生實例，再存入資料庫
  // const todo = new Todo({ name })
  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(err => console.log(err))

  return Todo.create({ name })
    .then(res.redirect('/'))
    .catch(err => console.log(err))

})

// start and listen the server

app.listen(3000, () => {
  console.log('The server is listening on http://localhost:3000')
})