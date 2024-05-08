import sql from 'mssql'
import { config } from './connConfig'

export async function connectToDatabase() {
  try {
    console.log('Connection attempt')
    const pool = await sql.connect(config)
    const res = await pool.query('select * from [EJERCICIOS2].[dbo].[UsuariosSITRA]')
    console.log(res)
    console.log('Connected to SQL Server!')
    return pool
  } catch (err) {
    console.error('Error connecting to SQL Server:', err)
  }
}

connectToDatabase()
