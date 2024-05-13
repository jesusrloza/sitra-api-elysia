import cors from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { QueryReqBody } from '../types/schemas'
import { connectToDatabase, query } from './database'

const pool = await connectToDatabase()
const PORT = 3000
const alias = 'data'

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .get('/', () => ({ message: 'SITRA backend 💽' }))

  .get(
    '/catalogs/anio',
    // () => years
    async () => {
      const alias = 'anio'
      const payload = await query(pool, {
        from: 'Carpeta',
        select: `distinct format(FechaInicio, 'yyyy') as "${alias}"`,
        orderBy: alias,
      })
      return payload.map((el) => el[alias])
    }
  )
  .get(
    '/catalogs/delito',
    // () => delitos
    async () => {
      const payload = await query(pool, {
        from: 'AgrupacionDelito',
        select: `distinct (Grupo) as "${alias}"`,
        orderBy: alias,
      })
      return payload.map((el) => el[alias])
    }
  )
  .get(
    '/catalogs/fiscalia',
    // () => fiscalias
    async () => {
      const payload = await query(pool, {
        from: 'cat.CatFiscalias',
        select: `Nombre as "${alias}"`,
        orderBy: alias,
      })
      return payload.map((el) => el[alias])
    }
  )
  .get(
    '/catalogs/municipio',
    // () => municipios
    async () => {
      const payload = await query(pool, {
        from: 'cat.CatMunicipios',
        select: `Nombre as "${alias}"`,
        orderBy: alias,
      })
      return payload.map((el) => el[alias])
    }
  )

  .post('/carpeta', async ({ body, path }) => {
    try {
      const parsed = QueryReqBody.safeParse(body)
      if (!parsed.success) {
        console.error(parsed.error.stack)
        throw {
          name: parsed.error.name,
          location: path,
          issues: parsed.error.issues,
        }
      }

      const [yearScope, fiscalias, cities, crimes, requests] = parsed.data
      const payload = await query(pool, {
        from: 'Carpeta',
        select: `*`,
        where: [
          `Contar = 1`,
          `${yearScope.length ? `year(FechaInicio) in (${yearScope.join(', ')})` : ''}`,
          `${fiscalias.length ? `Fiscalia in ('${fiscalias.join("', '")}')` : ''}`,
          `${cities.length ? `Municipio in ('${cities.join("', '")}')` : ''}`,
          `${crimes.length ? `DelitoAgrupado in ('${crimes.join("', '")}')` : ''}`,
        ].filter(Boolean),
      })
      return payload
    } catch (error) {
      return error
    }
  })
  .post('/imputado', () => ({ message: 'endpoint imputado' }))
  .post('/victima', () => ({ message: 'endpoint victima' }))

  .post('/auth', async () => {
    // todo: handle authentication
    if (!pool) return []
    const { recordset } = await pool.query(`select * from [EJERCICIOS2].[dbo].[UsuariosSITRA]`)
    return recordset
  })

  .listen(PORT)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
console.log(`📄 Swagger docs at http://${app.server?.hostname}:${app.server?.port}/swagger`)
