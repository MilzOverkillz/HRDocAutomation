import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const [totalCandidates, totalDocuments, documentsSent, pendingEmails] =
      await Promise.all([
        prisma.candidate.count(),
        prisma.document.count(),
        prisma.emailLog.count({ where: { emailStatus: 'sent' } }),
        prisma.emailLog.count({ where: { emailStatus: 'pending' } }),
      ])

    return NextResponse.json({
      totalCandidates,
      totalDocuments,
      documentsSent,
      pendingEmails,
    })
  } catch (error) {
    console.error('Metrics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}