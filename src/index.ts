import cors from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { connectToDatabase } from './database/connection'
import { querySqlServer } from './utils'

const pool = await connectToDatabase()
const PORT = 3000

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .get('/', () => ({ message: 'SITRA backend 💽' }))

  .get('/catalogs/anio', async () => await querySqlServer(pool, `distinct format(FechaInicio, 'yyyy')`, `Carpeta`))
  .get('/catalogs/delito', async () => await querySqlServer(pool, `distinct (Grupo)`, `AgrupacionDelito`))
  .get('/catalogs/fiscalia', async () => await querySqlServer(pool, `Nombre`, `cat.CatFiscalias`))
  .get('/catalogs/municipio', async () => await querySqlServer(pool, `Nombre`, `cat.CatMunicipios`))

  .post('/auth', async () => {
    if (!pool) return []
    const { recordset } = await pool.query(`select * from [EJERCICIOS2].[dbo].[UsuariosSITRA]`)
    return recordset
  })

  .post('/carpeta', () => ({ message: 'endpoint carpeta' }))
  .post('/imputado', () => ({ message: 'endpoint imputado' }))
  .post('/victima', () => ({ message: 'endpoint victima' }))

  .listen(PORT)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
console.log(`📄 Swagger docs at http://${app.server?.hostname}:${app.server?.port}/swagger`)
