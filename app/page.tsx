import Link from 'next/link'

import { Button } from '@/components/Button'
import { isAuthenticated } from '@/lib/session'

export default async function Page() {
  const isAuth = await isAuthenticated()

  return (
    <>
      <header className="flex h-14 items-center justify-between px-6">
        <Link href="/">
          Home
        </Link>
        <nav>
          <Button asChild>
            {
              isAuth
                ? <Link href="/dashboard">Dashboard</Link>
                : <Link href="/login">Login</Link>
            }
          </Button>
        </nav>
      </header>
      <main className="container">
        <div className="h-48" />
        <h1 className="text-center text-6xl font-bold">
          Homepage
        </h1>
      </main>
    </>
  )
}
