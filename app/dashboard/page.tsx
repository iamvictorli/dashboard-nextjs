import LogoutButton from './LogoutButton'

export default async function DashboardPage() {
  return (
    <>
      <header className="flex h-14 items-center justify-end px-6">
        <nav>
          <LogoutButton />
        </nav>
      </header>
      <main className="container">
        <div className="h-48" />
        <h1 className="text-center text-6xl font-bold">
          Dashboard
        </h1>
      </main>
    </>
  )
}
