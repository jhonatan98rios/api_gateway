const express = require('express');
const router = express.Router();

const { getUser } = require('../controllers/userControllers')
const { getColumns } = require('../controllers/tableControllers')


/* Return User DDNS */
router.post('/login', async (req, res) => {
  const result = await getUser(req.body.user_name, req.body.access_token)
  res.status(result.status).send(result.data.ddns)
})


/* Return all Columns */
router.get('/columns', async (req, res) => {
  const result = await getColumns(req.query.table)
  res.status(result.status).send(result.data)
})


module.exports = router;