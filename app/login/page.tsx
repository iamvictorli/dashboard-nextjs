import Link from 'next/link'
import { Suspense } from 'react'

import LoginForm from './LoginForm'

export default async function LoginPage() {
  return (
    <>
      <header className="flex h-14 items-center justify-between px-6">
        <Link href="/">
          Home
        </Link>
      </header>
      <div className="h-48" />
      <main className="container flex justify-center">
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>
    </>
  )
}
