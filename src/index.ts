import cors from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'

// todo: fix sql server connection
// import { connectToDatabase } from "./database/connection";
// connectToDatabase();

const PORT = 3000
const app = new Elysia()
  .use(swagger())
  .use(cors())

  .get('/', () => ({ message: 'SITRA backend 💽' }))

  .get('/catalogs/anio', () => ({ message: 'endpoint anio' }))
  .get('/catalogs/delito', () => ({ message: 'endpoint delito' }))
  .get('/catalogs/fiscalia', () => ({ message: 'endpoint fiscalia' }))
  .get('/catalogs/municipio', () => ({ message: 'endpoint municipio' }))

  .post('/auth', () => ({ message: 'endpoint auth, request access' }))
  .post('/carpeta', () => ({ message: 'endpoint carpeta, request access' }))
  .post('/imputado', () => ({ message: 'endpoint imputado, request access' }))
  .post('/victima', () => ({ message: 'endpoint victima, request access' }))

  .listen(PORT)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
console.log(`📄 Swagger docs at http://${app.server?.hostname}:${app.server?.port}/swagger`)
