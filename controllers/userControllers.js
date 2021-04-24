const db = require('../databases/connection')

const getUser = async (user_name, access_token) => {
  try {
    
    let user = await db.query(`
      SELECT * FROM users 
      WHERE user_name = $1 
      AND access_token = crypt($2, access_token);`, 
      [user_name, access_token]
    )

    console.log(user.rowCount)

    return (user.rowCount > 0) ? 
      { data: user.rows[0], status: 200 } : 
      { data: 'User not found', status: 400 }

  }
  catch (err) {
    return err
  }
}

module.exports = {
  getUser,
}