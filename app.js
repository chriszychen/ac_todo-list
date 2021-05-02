// include modules and define related variables
const express = require('express')
const app = express()
const port = 3000


// set routes
app.get('/', (req, res) => {
  res.send('Hello')
})


// start and listen the server

app.listen(port, () => {
  console.log('The server is listening on http://localhost:3000')
})