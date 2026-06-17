import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET single candidate
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: params.id },
      include: { documents: true, emailLogs: true },
    })

    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(candidate)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch candidate' },
      { status: 500 }
    )
  }
}

// PUT update candidate
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    const candidate = await prisma.candidate.update({
      where: { id: params.id },
      data: {
        ...body,
        salary: parseFloat(body.salary),
        startDate: new Date(body.startDate),
      },
    })

    return NextResponse.json(candidate)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update candidate' },
      { status: 500 }
    )
  }
}

// DELETE candidate
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.candidate.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete candidate' },
      { status: 500 }
    )
  }
}