import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET all candidates
export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(candidates)
  } catch (error) {
    console.error('GET candidates error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch candidates' },
      { status: 500 }
    )
  }
}

// POST create new candidate
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      fullName,
      email,
      phone,
      nic,
      position,
      department,
      employmentType,
      salary,
      startDate,
      companyRepName,
    } = body

    if (!fullName || !email || !phone || !nic || !position || !department || !employmentType || !salary || !startDate || !companyRepName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const candidate = await prisma.candidate.create({
      data: {
        fullName,
        email,
        phone,
        nic,
        position,
        department,
        employmentType,
        salary: parseFloat(salary),
        startDate: new Date(startDate),
        companyRepName,
      },
    })

    return NextResponse.json(candidate, { status: 201 })
  } catch (error) {
    console.error('POST candidate error:', error)
    return NextResponse.json(
      { error: 'Failed to create candidate' },
      { status: 500 }
    )
  }
}