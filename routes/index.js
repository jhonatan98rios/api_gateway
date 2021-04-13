const express = require('express');
const router = express.Router();

const { createUser, getUser } = require('../controllers/userControllers')
const { getColumns } = require('../controllers/tableControllers')


/* Create a fake User */
router.post('/create', async (req, res) => {
  const result = await createUser(req.body.name, req.body.user_name, req.body.passw, req.body.access_token, req.body.ddns )
  res.status(result.status).send(result.message)
})


/* Return User DDNS */
router.post('/login', async (req, res) => {
  const result = await getUser(req.body.user_name, req.body.access_token)
  res.send(result.data.ddns)
})


/* Return all Columns */
router.get('/columns', async (req, res) => {
  const result = await getColumns(req.query.table)
  res.status(result.status).send(result.data)
})


module.exports = router;