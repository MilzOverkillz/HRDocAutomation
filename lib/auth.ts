import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
  console.log('LOGIN ATTEMPT:', credentials?.email)

  if (!credentials?.email || !credentials?.password) {
    console.log('Missing credentials')
    return null
  }

  const admin = await prisma.admin.findUnique({
    where: { email: credentials.email },
  })

  console.log('Admin found:', admin)

  if (!admin) {
    console.log('No admin found')
    return null
  }

  const isValid = await bcrypt.compare(credentials.password, admin.password)

  console.log('Password valid:', isValid)

  if (!isValid) {
    return null
  }

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
  }
        }
      }),
    ],
  }
