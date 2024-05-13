import { ConnectionPool } from 'mssql'
import { SqlQueryParts } from '../../types'

export const query = async (pool: ConnectionPool | undefined, query: SqlQueryParts) => {
  if (!pool) return []

  const { select, from, where, groupBy, having, orderBy } = query
  const q = [
    `select ${select}`,
    `from ${from}`,
    where ? `where ${where.join(' and ')}` : '',
    groupBy ? `group by ${groupBy}` : '',
    having ? `having ${having}` : '',
    orderBy ? `order by ${orderBy}` : '',
  ].join(' ')
  console.log(q)
  const { recordset } = await pool.query(q)
  return recordset
}
