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

  .get(
    '/catalogs/anio',
    async () =>
      await querySqlServer(pool, {
        from: `Carpeta`,
        select: `distinct format(FechaInicio, 'yyyy')`,
      })
  )
  .get(
    '/catalogs/delito',
    async () =>
      await querySqlServer(pool, {
        from: 'AgrupacionDelito',
        select: 'distinct (Grupo)',
      })
  )
  .get(
    '/catalogs/fiscalia',
    async () =>
      await querySqlServer(pool, {
        from: 'cat.CatFiscalias',
        select: 'Nombre',
      })
  )
  .get(
    '/catalogs/municipio',
    async () =>
      await querySqlServer(pool, {
        from: 'cat.CatMunicipios',
        select: 'Nombre',
      })
  )

  .post('/auth', async () => {
    // todo: handle authentication
    if (!pool) return []
    const { recordset } = await pool.query(`select * from [EJERCICIOS2].[dbo].[UsuariosSITRA]`)
    return recordset
  })

  .post('/carpeta', async () => {
    // todo: form sql queries based on selected filters in the react app
    if (!pool) return []
    const { recordset } = await pool.query(
      `select * from Carpeta where Contar = 1 and year(FechaInicio) in ('2023', '2024') and DelitoAgrupado = 'Acoso Sexual'`
    )
    return recordset.length
  })
  .post('/imputado', () => ({ message: 'endpoint imputado' }))
  .post('/victima', () => ({ message: 'endpoint victima' }))

  .listen(PORT)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
console.log(`📄 Swagger docs at http://${app.server?.hostname}:${app.server?.port}/swagger`)
