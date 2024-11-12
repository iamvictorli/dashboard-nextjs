import type { JWTPayload } from 'jose'

import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'SESSION'

// TODO: process env
const secretKey = 'secret'
const secretKeyEncoder = new TextEncoder().encode(secretKey)

interface CookiePayload extends JWTPayload {
  userId: number
}

async function encrypt(payload: CookiePayload, expires: number | string | Date) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(secretKeyEncoder)
}

async function decrypt(input: string): Promise<CookiePayload> {
  const { payload } = await jwtVerify(input, secretKeyEncoder, {
    algorithms: ['HS256'],
  })
  return payload as CookiePayload
}

export async function createSession(userId: number) {
  const sessionToken = await encrypt({ userId }, '1h')
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 3600, // 1hour
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

async function getSession(): Promise<CookiePayload | null> {
  const cookieStore = await cookies()
  if (!cookieStore.has(SESSION_COOKIE_NAME)) {
    return null
  }

  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME).value
  return decrypt(sessionToken)
}

export async function isAuthenticated() {
  const session = await getSession()
  return session !== null
}
