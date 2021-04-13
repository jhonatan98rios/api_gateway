const db = require('../databases/connection')

const getColumns = async (table) => {

  try {

    const res = await db.query(`
      SELECT * FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name = $1;
    `, [table])

    const data = (res.rowCount > 0) ? 
      { data: res.rows, status: 200 } : 
      { data: `A tabela ${table} não foi encontrada`, status: 400 }

    return data

  } catch (err) {
    return err
  }
}

module.exports = {
  getColumns
}