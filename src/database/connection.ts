import sql from 'mssql'

const config: sql.config = {
  server: process.env.SERVER_IP_ADDRESS || '',
  port: 1433, // Standard SQL Server port
  authentication: {
    type: 'default', // Indicates Windows Authentication
    options: {
      userName: process.env.USERNAME,
      domain: 'FGE',
    },
  },
  database: 'EJERCICIOS2',
}

export async function connectToDatabase() {
  try {
    console.log('Connection attempt')
    const pool = await sql.connect(config)
    console.log('Connected to SQL Server!')
    return pool
  } catch (err) {
    console.error('Error connecting to SQL Server:', err)
  }
}

connectToDatabase()
