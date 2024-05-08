import sql from 'mssql'

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.SERVER_IP_ADDRESS || '',
  database: process.env.DB_NAME,
  connectionTimeout: 10000,
  options: {
    encrypt: false,
  },
  port: 1433, // Standard SQL Server port
  authentication: {
    type: 'default', // Indicates Windows Authentication
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PWD,
    },
  },
}

export async function connectToDatabase() {
  try {
    console.log('Connecting to SQL server')
    return await sql.connect(config)
  } catch (err) {
    console.error('Error connecting to SQL Server:', err)
  }
}
