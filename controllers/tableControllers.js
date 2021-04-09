const db = require('../databases/connection')

const getTables = async () => {
  try {

    const res = await db.query(`
      SELECT * FROM pg_catalog.pg_tables
      WHERE schemaname != 'pg_catalog' AND 
      schemaname != 'information_schema';
    `)

    const data = (res.rowCount > 0) ? 
      { data: res.rows, status: 200 } : 
      { data: "Erro ao criar o usuário", status: 400 }

    return data

  } catch (err) {
    return err
  }
}

module.exports = {
  getTables
}