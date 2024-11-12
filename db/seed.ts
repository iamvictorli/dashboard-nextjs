import { db } from './index'
import { users } from './schema/users'

async function main() {
  const user: typeof users.$inferInsert = {
    username: 'username',
    password: 'password',
  }
  await db.insert(users).values(user)
}
main()
