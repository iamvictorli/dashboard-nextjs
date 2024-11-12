import { drizzle } from 'drizzle-orm/libsql'

import { users } from './schema/users'

export const db = drizzle({
  connection: {
    url: 'file:db/sqlite.db',
  },
  schema: {
    users,
  },
})
