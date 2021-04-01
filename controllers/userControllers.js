const db = require('../databases/connection')

/* Create a user for test */
const createUser = async (user_name, user_pass) => {
  try {

    
    let existentUser = await db.query(`
      SELECT * FROM users 
      WHERE user_name = $1;`, 
      [user_name]
    )

    if(existentUser.rows[0]) {
      
      return { message: "O usuário já existe!" }
    } 
    
    console.log(user_name)
    
    let result = await db.query(`
      INSERT INTO users (user_name, user_pass) 
      VALUES ($1, crypt($2, gen_salt('bf')));`, 
      [user_name, user_pass]
    )

    return result.rowCount

  }catch(err){

    return err
  }
}

const readUser = async (user_name, user_pass) => {
  try {
    
    let user = await db.query(`
      SELECT * FROM users 
      WHERE user_name = $1 
      AND user_pass = crypt($2, user_pass);`, 
      [user_name, user_pass]
    )

    if(user.rowCount > 0){

      return {
        user: user.rows[0].user_name,
      } 
    
    }else {
      return {
        message: 'User not found'
      }
    }

  } catch (err) {
    return err
  }
}


const getTables = async () => {
  try {

    let res = await db.query(`
      SELECT * FROM pg_catalog.pg_tables
      WHERE schemaname != 'pg_catalog' AND 
      schemaname != 'information_schema';
    `)

    if(res) return res

  } catch (err) {
    return err
  }
}

module.exports = {
  createUser,
  readUser,
  getTables
}