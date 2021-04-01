const db = require('../databases/connection')

/* Create a user for test */
const createUser = async (user_name, user_pass) => {
  try {

    let existentUser = await db.query(`
      SELECT * FROM users 
      WHERE user_name = $1;`, 
      [user_name]
    )

    if(existentUser.rows[0]) return false

    let result = await db.query(`
      INSERT INTO users (user_name, user_pass) 
      VALUES ($1, gen_salt('bf', 8));`, 
      [user_name, user_pass]
    )
    return result.rowCount

  }catch(err){

    return 'err'
  }
}

const readUser = async (user_name, user_pass) => {
  try {
    
    let user = await db.query(`
      SELECT * FROM users 
      WHERE user_name = $1 
      AND user_pass = $2;`, 
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

module.exports = {
  createUser,
  readUser
}