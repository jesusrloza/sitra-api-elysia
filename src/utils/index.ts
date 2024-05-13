import { ConnectionPool } from 'mssql'
import { SqlQueryParts } from '../../types'

export const queryDB = async (pool: ConnectionPool | undefined, query: SqlQueryParts): Promise<any[]> => {
  if (!pool) return []

  const { select, from, where, groupBy, having, orderBy } = query
  const q = [
    `select ${select}`,
    `from ${from}`,
    where ? `where ${where.join(' and ')}` : '',
    groupBy ? `group by ${groupBy}` : '',
    having ? `having ${having}` : '',
    orderBy ? `order by ${orderBy}` : '',
  ]

  console.log(q.join(' '))

  const { recordset } = await pool.query(q.join(' '))
  return recordset
}
