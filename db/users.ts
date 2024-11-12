import { and, eq } from 'drizzle-orm'

import { db } from './index'
import { users } from './schema/users'

export async function getUser(username: string, password: string) {
  return await db.query.users.findFirst({
    where: and(
      eq(users.username, username),
      eq(users.password, password),
    ),
  })
}
