'use client'

import { logout } from '@/app/actions/auth'
import { Button } from '@/components/Button'

export default function LogoutButton() {
  return (
    <Button onClick={() => logout()} variant="destructive">
      Logout
    </Button>
  )
}
