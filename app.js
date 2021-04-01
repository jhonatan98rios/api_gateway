const express = require('express')
const cors = require('cors')
const app = express()

const routes = require('./routes')

// Configurations
app.use(express.json());
app.use(cors())   
app.use(routes)

// Create the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Running')
})