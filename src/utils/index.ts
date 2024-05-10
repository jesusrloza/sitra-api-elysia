import { ConnectionPool } from 'mssql'
import { SqlQueryParts } from '../../types'

export const query = {
  singleColumn: async (pool: ConnectionPool | undefined, query: SqlQueryParts) => {
    if (!pool) return []

    const { select, from, where, groupBy, having, orderBy } = query
    const q = [
      `select ${select} as "data"`,
      `from ${from}`,
      where ? `where ${where}` : '',
      groupBy ? `group by ${groupBy}` : '',
      having ? `having ${having}` : '',
      orderBy ? `order by ${orderBy}` : '',
    ]

    const { recordset } = await pool.query(q.join(' '))
    return recordset.map((el) => el.data)
  },
}
