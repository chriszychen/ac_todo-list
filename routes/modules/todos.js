const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// render create page
router.get('/new', (req, res) => {
  return res.render('new')
})

// CREATE: create a new todo to database
router.post('/', (req, res) => {
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

// READ: find a todo and render detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(err => console.log(err))
})

// render edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(err => console.log(err))
})

// UPDATE: find a todo, edit, and save it 
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.log(err))
})

// DELETE: find a todo and delete it
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})

module.exports = router