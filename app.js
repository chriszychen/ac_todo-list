// include modules and define related variables
const express = require('express')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./configuration/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// --- set routes ---
app.use(routes)


// start and listen the server

app.listen(3000, () => {
  console.log('The server is listening on http://localhost:3000')
})