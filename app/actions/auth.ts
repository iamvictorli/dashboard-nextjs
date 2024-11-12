'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { getUser } from '@/db/users'
import { createSession, deleteSession } from '@/lib/session'
import { defaultRedirectUrl } from '@/lib/urls'

const LoginSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .trim(),
  // dashboard default redirect
  redirectUrl: z.string().optional().default(defaultRedirectUrl),
})

type FormState =
  | {
    errors?: {
      username?: string[]
      password?: string[]
    }
    message?: string
    formFields?: {
      username: string
      password: string
      redirectUrl: string
    }
  }
  | undefined

export async function login(state: FormState, formData: FormData) {
  const formFields = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
    redirectUrl: formData.get('redirectUrl') as string,
  }
  // Validate form fields
  const validatedFields = LoginSchema.safeParse(formFields)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formFields,
    }
  }

  const { username, password, redirectUrl } = validatedFields.data

  const user = await getUser(username, password)
  if (!user) {
    return {
      message: 'Invalid username or password.',
      formFields,
    }
  }

  await createSession(user.id)
  redirect(redirectUrl)
}

export async function logout() {
  await deleteSession()
  redirect('/')
}
