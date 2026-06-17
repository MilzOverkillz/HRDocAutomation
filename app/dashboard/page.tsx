'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Metrics {
  totalCandidates: number
  totalDocuments: number
  documentsSent: number
  pendingEmails: number
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [metrics, setMetrics] = useState<Metrics>({
    totalCandidates: 0,
    totalDocuments: 0,
    documentsSent: 0,
    pendingEmails: 0,
  })

  useEffect(() => {
    async function fetchMetrics() {
      const res = await fetch('/api/metrics')
      const data = await res.json()
      setMetrics(data)
    }
    fetchMetrics()
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">HR Document Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {session?.user?.name || session?.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Total Candidates</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalCandidates}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Documents Generated</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalDocuments}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Documents Sent</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.documentsSent}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Pending Emails</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.pendingEmails}</p>
          </div>
        </div>

        {/* Candidates Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Candidates</h3>
            <Link
              href="/dashboard/candidates/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              + Add Candidate
            </Link>
          </div>
          <Link
            href="/dashboard/candidates"
            className="text-blue-600 text-sm hover:underline"
          >
            View all candidates →
          </Link>
        </div>
      </main>
    </div>
  )
}