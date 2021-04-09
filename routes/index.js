const express = require('express');
const router = express.Router();

const { createUser, readUser } = require('../controllers/userControllers')
const { getTables } = require('../controllers/tableControllers')

router.get('/', async (req, res) => {
  res.status(200).send(`Hello World`)
})


/* Create a fake data */
router.post('/create', async (req, res) => {
  const result = await createUser(req.body.user_name, req.body.user_pass)
  res.status(result.status).send(result.message)
})


/* Return Users */
router.post('/read', async (req, res) => {
  const result = await readUser(req.body.user_name, req.body.user_pass)
  res.status(result.status).send(result.data)

})


/* Return all tables */
router.get('/tables', async (req, res) => {
  const result = await getTables()
  res.status(result.status).send(result.data )
})


module.exports = router;