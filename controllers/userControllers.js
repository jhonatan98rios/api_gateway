const db = require('../databases/connection')

/* Create a user for test */
const createUser = async (name, user_name, passw, access_token, ddns) => {
  try {
    
    let existentUser = await db.query(`
      SELECT * FROM users 
      WHERE user_name = $1;`, 
      [user_name]
    )

    if(existentUser.rows[0]) return { message: "O usuário já existe!", status: 400 } 
    
    let result = await db.query(`
      INSERT INTO users (name, user_name, passw, access_token, ddns) 
      VALUES ($1, $2, crypt($3, gen_salt('bf')), $4, $5);`, 
      [name, user_name, passw, access_token, ddns ]
    )

    return (result.rowCount > 0) ? 
      { message: "Sua conta foi criada com sucesso!", status: 200 } : 
      { message: "Erro ao criar o usuário", status: 400 }

  }
  catch(err){
    return err
  }
}

const readUser = async (user_name, passw) => {
  try {
    
    let user = await db.query(`
      SELECT * FROM users 
      WHERE user_name = $1 
      AND user_pass = crypt($2, passw);`, 
      [user_name, passw]
    )

    return (user.rowCount > 0) ? 
      { data: user.rows[0].user_name, status: 200 } : 
      { data: 'User not found', status: 400 }

  }
  catch (err) {
    return err
  }
}



module.exports = {
  createUser,
  readUser,
}