
const getTables = async () => {
  try {

    let res = await db.query(`
      SELECT * FROM pg_catalog.pg_tables
      WHERE schemaname != 'pg_catalog' AND 
      schemaname != 'information_schema';
    `)

    return (result.rowCount > 0) ? 
      { data: res.rows, status: 200 } : 
      { error: "Erro ao criar o usuário", status: 400 }

  } catch (err) {
    return err
  }
}

module.exports = {
  getTables
}