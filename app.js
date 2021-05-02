// include modules and define related variables
const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')

const Todo = require('./models/todo.js')

const app = express()

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// modules setting
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

// --- set routes ---

// render index page
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(err => console.error(err))

})

// render creating page
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// create a new todo to database
app.post('/todos', (req, res) => {
  const name = req.body.name
  // 先產生實例，再存入資料庫
  // const todo = new Todo({ name })
  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(err => console.log(err))

  // 直接新增資料到資料庫
  return Todo.create({ name })
    .then(res.redirect('/'))
    .catch(err => console.log(err))

})

// render detail page
app.get('/todos/:id', (req, res) => {
  const id = req.params.id

  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(err => console.log(err))
})

// render edit page
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(err => console.log(err))
})

// update a todo data already in database 
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.log(err))
})



// start and listen the server

app.listen(3000, () => {
  console.log('The server is listening on http://localhost:3000')
})