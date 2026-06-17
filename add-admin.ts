import 'dotenv/config'
import { prisma } from './lib/db'
import bcrypt from 'bcryptjs'

const email = process.argv[2]
const password = process.argv[3]
const name = process.argv[4] || ''

if (!email || !password) {
  console.log('Usage: npx tsx add-admin.ts <email> <password> <name>')
  process.exit(1)
}

async function main() {
  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashedPassword, name },
    create: { email, password: hashedPassword, name },
  })

  console.log('Admin created/updated:', admin.email)
}

main().finally(() => prisma.$disconnect())