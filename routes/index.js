const express = require('express');
const router = express.Router();

const { createUser, readUser } = require('../controllers/userControllers')

router.get('/', async (req, res) => {
  res.status(200).send(`Hello World`)
})

/* Create a fake data */

router.post('/create', async (req, res) => {

  console.log(req.body)

  let result = await createUser(req.body.user_name, req.body.user_pass)

  if (result > 0){
    res.status(200).send(`Sua conta foi criada com sucesso!`)
  }else {
    res.status(400).send('Erro a conectar')
  }
})

/* Return data */

router.post('/read', async (req, res) => {
  let result = await readUser(req.body.user_name, req.body.user_pass)

  if(result.user){
    res.status(200).send(result)
  }else {
    res.status(404).send('Usuário ou senha não encontrados')
  }
})


module.exports = router;