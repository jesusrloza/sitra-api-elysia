import cors from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { delitos, fiscalias, municipios, years } from './constants'
import { connectToDatabase } from './database'
import { query } from './utils'

const pool = await connectToDatabase()
const PORT = 3000

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .get('/', () => ({ message: 'SITRA backend 💽' }))

  .get(
    '/catalogs/anio',
    () => years
    // async () =>
    //   await query.singleColumn(pool, {
    //     from: `Carpeta`,
    //     select: `distinct format(FechaInicio, 'yyyy')`,
    //   })
  )
  .get(
    '/catalogs/delito',
    // () => delitos
    async () =>
      await query.singleColumn(pool, {
        from: 'AgrupacionDelito',
        select: 'distinct (Grupo)',
        orderBy: 'Grupo',
      })
  )
  .get(
    '/catalogs/fiscalia',
    () => fiscalias
    // async () =>
    //   await query.singleColumn(pool, {
    //     from: 'cat.CatFiscalias',
    //     select: 'Nombre',
    //     orderBy: 'Nombre',
    //   })
  )
  .get(
    '/catalogs/municipio',
    () => municipios
    // async () =>
    //   await query.singleColumn(pool, {
    //     from: 'cat.CatMunicipios',
    //     select: 'Nombre',
    //     orderBy: 'Nombre',
    //   })
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
