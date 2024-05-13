export type SqlQueryParts = {
  select: string
  from: string
  where?: string[]
  groupBy?: string
  having?: string
  orderBy?: string
}
