import { z } from 'zod'

export const QueryReqBody = z.tuple([
  z.array(z.string()), // yearScope
  z.array(z.string()), // fiscalias
  z.array(z.string()), // cities
  z.array(z.string()), // crimes
  z.array(z.string()), // requests
])

export const AuthReqBody = z.tuple([
  z.string(), // username
  z.string(), // password
])
