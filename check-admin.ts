import 'dotenv/config'
import { prisma } from './lib/db'

async function main() {
  const admins = await prisma.admin.findMany()
  console.log(JSON.stringify(admins, null, 2))
}

main().finally(() => prisma.$disconnect())