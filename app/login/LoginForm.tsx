'use client'

import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

import { login } from '@/app/actions/auth'
import { Alert, AlertDescription } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/Card'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { defaultRedirectUrl } from '@/lib/urls'

export default function LoginForm() {
  const [state, action, isPending] = useActionState(
    login,
    null,
  )

  const searchParams = useSearchParams()
  const redirectUrl
    = searchParams.get('redirectUrl')
    || state?.formFields?.redirectUrl
    || defaultRedirectUrl

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your username and password to access your account.</CardDescription>
      </CardHeader>
      <form action={action}>
        <input type="hidden" id="redirectUrl" name="redirectUrl" value={redirectUrl} />
        <CardContent className="space-y-4">
          {state?.message && (
            <Alert variant="destructive">
              <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
              defaultValue={state?.formFields?.username}
              required
            />
            {state?.errors?.username && <p className="text-sm text-red-500">{state.errors.username}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              defaultValue={state?.formFields?.password}
              required
            />
            {state?.errors?.password && <p className="text-sm text-red-500">{state.errors.password}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? 'Verifying...' : 'Log in'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
