import { ConnectionPool } from 'mssql'
export const querySqlServer = async (
  pool: ConnectionPool | undefined,
  select: string,
  from: string,
  where?: string,
  orderBy?: string
) => {
  if (!pool) return []
  const queryString = [`select ${select} as "data"`, `from ${from}`, `${where ? '' : ''}`, `${orderBy ? '' : ''}`]
  const { recordset } = await pool.query(queryString.join(' '))
  return recordset.map((el) => el.data).sort()
}
